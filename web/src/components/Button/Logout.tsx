import React from "react";
import { Button, Spinner } from "@chakra-ui/core";
import { useLogoutMutation } from "../../generated/graphql";
import { useRouter } from "next/router";

interface LogoutProps {}

const Logout: React.FC<LogoutProps> = ({}) => {
  const [result, logout] = useLogoutMutation();
  const router = useRouter();
  if (result.error) {
    return <p>Error...</p>;
  }

  if (result.fetching) {
    return <Spinner />;
  }

  if (result.data) {
    router.push("/login");
  }

  return <Button onClick={() => logout()}>Logout</Button>;
};

export default Logout;
