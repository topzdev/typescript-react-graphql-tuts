import { ObjectType, Field } from "type-graphql";

@ObjectType()
export default class ErrorResponse {
  @Field()
  message!: string;
}
