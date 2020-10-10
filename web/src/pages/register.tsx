import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { Formik, Form } from "formik";
import { Box, Button, Heading } from "@chakra-ui/core";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <Layout>
      <Wrapper variant="small">
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({ options: values });

            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              router.push("/");
            }
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Heading mb={5}>Register</Heading>
              <InputField
                name="username"
                placeholder="username here"
                label="Username"
                value={values.username}
              />
              <br />
              <InputField
                name="email"
                placeholder="email here"
                label="Email"
                value={values.email}
              />
              <br />
              <InputField
                name="password"
                placeholder="password here"
                label="Password"
                type="password"
                value={values.password}
              />

              <Button
                type="submit"
                isLoading={isSubmitting}
                mt={4}
                variantColor="green"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
