import { Field, InputType } from "type-graphql";

@InputType()
export default class ResetInput {
  @Field()
  token: string;
  @Field()
  newPassword: string;
  @Field()
  confirmPassword: string;
}
