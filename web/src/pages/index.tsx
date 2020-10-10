import Layout from "../components/Layout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import Wrapper from "../components/Wrapper";
import { Link, Button, Spinner } from "@chakra-ui/core";
import NextLink from "next/link";
import PostStack from "../components/post/PostStack";
const Index = () => {
  const [meData] = useMeQuery();

  return (
    <Layout title="Home">
      {meData.data?.me && <h1>Welcome!, {meData.data?.me?.username}</h1>}

      <Wrapper variant="regular">
        <NextLink href="/create-post">
          <Button mb={5} variantColor="blue">
            Create Post
          </Button>
        </NextLink>
        <PostStack />
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
