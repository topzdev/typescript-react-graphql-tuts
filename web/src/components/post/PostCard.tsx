import { Box, Heading, Text } from "@chakra-ui/core";
import dayjs from "dayjs";
import React from "react";
import { Post } from "../../generated/graphql";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({
  post: { textSnippet, title, createdAt },
}) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="xl">{title}</Heading>
      <p>{dayjs(createdAt).format("MMMM DD YYYY h:m")}</p>
      <Text mt={4}>{textSnippet}</Text>
    </Box>
  );
};

export default PostCard;
