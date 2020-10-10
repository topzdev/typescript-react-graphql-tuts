import { ObjectType, Field } from "type-graphql";

@ObjectType()
export default class SuccessResponse {
  @Field({ defaultValue: true })
  sucess?: Boolean;
  @Field()
  message!: string;
}
