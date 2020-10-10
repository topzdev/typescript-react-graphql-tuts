import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResorver {
  @Query(() => String)
  hello() {
    return "Hello, World!";
  }
}
