import React from "react";
import Layout from "../components/Layout";
import Wrapper from "../components/Wrapper";
import { Formik, Form } from "formik";
import login from "./login";
import { toErrorMap } from "../utils/toErrorMap";
import { Heading, Button } from "@chakra-ui/core";
import InputField from "../components/InputField";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useForgotPasswordMutation } from "../generated/graphql";
import Alert from "../components/Alert";

interface forgotPasswordProps {}

const forgotPassword: React.FC<forgotPasswordProps> = ({}) => {
  const [response, forgotPassword] = useForgotPasswordMutation();

  const { data, error } = response;

  let alert = null;

  if (data) {
    const { success, error } = data.forgotPassword;

    alert = (
      <Alert
        status={success ? "success" : "error"}
        message={success ? success.message : error ? error.message : ""}
        title="Forgot Password"
      ></Alert>
    );
  }

  return (
    <Layout title="Forgot Password">
      {alert}
      <Wrapper variant="small">
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={async (values) => {
            await forgotPassword(values);
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Heading mb={5}>Reset Password</Heading>
              <InputField
                name="email"
                placeholder="enter your email"
                label="Email Address"
                type="email"
                value={values.email}
              />

              <Button
                type="submit"
                isLoading={isSubmitting}
                mt={4}
                variantColor="green"
              >
                Reset my password
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(forgotPassword);
