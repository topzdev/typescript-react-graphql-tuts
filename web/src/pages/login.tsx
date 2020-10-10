import React from "react";
import Wrapper from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { Formik, Form } from "formik";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import InputField from "../components/InputField";
import { Button, Heading, Link } from "@chakra-ui/core";
import Layout from "../components/Layout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NLink from "next/link";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Layout>
      <Wrapper variant="small">
        <Formik
          initialValues={{
            usernameOrEmail: "",
            password: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const result = await login(values);

            if (result.data?.login.errors) {
              setErrors(toErrorMap(result.data.login.errors));
            } else if (result.data?.login.user) {
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                router.push("/");
              }
            }
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Heading mb={5}>Login</Heading>
              <InputField
                name="usernameOrEmail"
                placeholder="username or email"
                label="Username or Email"
                value={values.usernameOrEmail}
              />
              <br />
              <InputField
                name="password"
                placeholder="password here"
                label="Password"
                type="password"
                value={values.password}
              />
              <NLink href="/forgot-password">
                <Link mb="2" mt="1" display="block">
                  Forgot my password.
                </Link>
              </NLink>

              <Button
                type="submit"
                isLoading={isSubmitting}
                mt={4}
                variantColor="green"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
