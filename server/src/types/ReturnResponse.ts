import { ObjectType, Field } from "type-graphql";
import SuccessResponse from "./SuccessResponse";
import ErrorResponse from "./ErrorResponse";

@ObjectType()
export default class ReturnResponse {
  @Field(() => SuccessResponse, { nullable: true })
  success?: SuccessResponse;
  @Field(() => ErrorResponse, { nullable: true })
  error?: ErrorResponse;
}
