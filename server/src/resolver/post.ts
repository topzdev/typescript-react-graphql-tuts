import {
  Query,
  Resolver,
  Ctx,
  Arg,
  Int,
  Mutation,
  InputType,
  Field,
  UseMiddleware,
  FieldResolver,
  Root,
  ObjectType,
} from "type-graphql";
import { Post } from "../entities/Post";
import { MyContext } from "src/types";
import { isAuth } from "../middleware/isAuth";
import { getConnection, LessThan, MoreThan, MoreThanOrEqual } from "typeorm";

@InputType()
class PostInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];

  @Field()
  hasMore: boolean;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() root: Post) {
    return root.text.slice(0, 50);
  }

  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int) limit: number = 5,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedPosts> {
    const realLimit = limit;
    const realLimitPlusOne = realLimit + 1;

    let where: any = {};

    if (cursor) where.createdAt = LessThan(new Date(parseInt(cursor)));

    const posts = await Post.find({
      where,
      order: {
        createdAt: "DESC",
      },
      take: realLimitPlusOne,
    });

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
    };
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("postInput") postInput: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    return await Post.create({
      ...postInput,
      creatorId: req.session.userId,
    }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", { nullable: true }) title: string
  ): Promise<Post | null> {
    const post = await Post.findOne(id);

    console.log(post);

    if (!post) return null;

    if (title === "undefined") return null;

    await Post.update({ id }, { title });

    return { ...post, title } as Post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number): Promise<Boolean> {
    const post = await Post.findOne(id);

    if (!post) return false;

    await Post.delete({ id });

    return true;
  }
}
