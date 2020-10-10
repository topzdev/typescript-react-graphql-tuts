import argon2 from "argon2";
import ms from "ms";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { v4 } from "uuid";
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from "../constants";
import { User } from "../entities/User";
import { MyContext } from "../types";
import ResetInput from "../types/ResetInput";
import ReturnResponse from "../types/ReturnResponse";
import { UsernamePasswordInput } from "../types/UsernamePasswordInput";
import { UserResponse } from "../types/UserResponse";
import { sendEmail } from "../utils/sendEmail";
import validateRegister from "../utils/validateRegister";

@Resolver()
export class UserResolver {
  @Mutation(() => ReturnResponse)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ): Promise<ReturnResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) return { error: { message: "User not found" } };

    const token = v4();

    await redis.set(FORGOT_PASSWORD_PREFIX + token, user.id, "ex", ms("3d"));

    sendEmail(
      email,
      `<a href="http://localhost:3000/reset-password/${token}">reset your password</a>`
    );

    console.log("forgot password token: ", token);

    return {
      success: {
        sucess: true,
        message: `Reset password request successfully sent to your email: ${email}`,
      },
    };
  }

  @Mutation(() => ReturnResponse)
  async resetPassword(
    @Arg("resetInput") { newPassword, confirmPassword, token }: ResetInput,
    @Ctx() { redis }: MyContext
  ): Promise<ReturnResponse> {
    // validate password

    if (newPassword !== confirmPassword)
      return {
        error: { message: "New password and confirm password doesn't match " },
      };

    try {
      const key = FORGOT_PASSWORD_PREFIX + token;
      const id = await redis.get(key);

      if (!id) {
        return { error: { message: "Token expired" } };
      }

      const user = await User.findOne(parseInt(id));

      if (!user) {
        return { error: { message: "User doesn't exist" } };
      }

      const hashedPassword = await argon2.hash(confirmPassword);

      await User.update({ id: parseInt(id) }, { password: hashedPassword });

      await redis.del(key);

      return {
        success: {
          sucess: true,
          message: "Account password succesfully changed.",
        },
      };
    } catch (error) {
      console.log(error);
      return {
        error: { message: "Password reset request has been expired" },
      };
    }
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) return null;
    return User.findOne(req.session.userId);
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const isExist = (await User.count({ username: options.username }))
      ? true
      : false;

    const errors = validateRegister(options, isExist);

    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    const user = await User.create({
      ...options,
      password: hashedPassword,
    }).save();

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "the username or email doesn't exist",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return {
        errors: [{ field: "password", message: "password doens't match" }],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);

        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        return resolve(true);
      })
    );
  }
}
