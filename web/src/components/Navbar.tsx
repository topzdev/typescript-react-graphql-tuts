import React from "react";
import { Flex, Heading, Box, Spinner, Button, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";
import Logout from "./Button/Logout";
import { isServer } from "../utils/isServer";
interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data, fetching, error }, reExecuteQuery] = useMeQuery({
    pause: isServer,
  });

  let body = null;

  if (data?.me) {
    body = (
      <>
        <Flex>
          <Heading mr="5">{data.me.username}</Heading>
          <Logout></Logout>
        </Flex>
      </>
    );
  } else {
    body = (
      <>
        <NextLink href="/login">
          <Link>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  }
  return (
    <nav>
      <Flex p={4} background="tomato">
        <Heading>LiReddit</Heading>

        <Box ml="auto">{body}</Box>
      </Flex>
    </nav>
  );
};

export default Navbar;
