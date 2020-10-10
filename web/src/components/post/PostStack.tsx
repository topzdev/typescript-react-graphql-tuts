import { Button, Flex, Spinner, Stack } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { usePostsQuery } from "../../generated/graphql";
import PostCard from "./PostCard";

interface PostStackProps {}

const PostStack: React.FC<PostStackProps> = ({}) => {
  const [variables, setVariables] = useState({
    limit: 5,
    cursor: null as null | string,
  });

  const [{ data, error, fetching }, fetchPost] = usePostsQuery({
    variables,
  });

  // useEffect(() => {
  //   fetchPost({});
  //   console.log("Fetching...");
  // }, [variables]);

  if (data) console.log(data);

  if (fetching) {
    console.log("fetching: ", fetching);
    return <Spinner></Spinner>;
  }

  if (error) {
    console.log("error: ", error);
    return <p>Having trouble on fetching data...</p>;
  }

  return (
    <>
      <Stack spacing={8}>
        {data &&
          data?.posts.posts.map((item) => (
            <PostCard key={item.id} post={item as any} />
          ))}
      </Stack>
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            isLoading={fetching}
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
            m="auto"
            my={8}
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </>
  );
};

export default PostStack;
