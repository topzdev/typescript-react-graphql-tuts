import React, { ReactNode } from "react";
import { Flex, Heading, Box, Spinner, Button, Link } from "@chakra-ui/core";
import Head from "next/head";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";
import Navbar from "./Navbar";

interface LayoutProps {
  children?: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = "LiReddit" }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <Navbar />
      </header>
      {children}
      <footer>Footer here</footer>
    </div>
  );
};

export default Layout;
