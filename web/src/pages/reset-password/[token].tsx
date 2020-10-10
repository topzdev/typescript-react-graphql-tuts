import { Button, Heading } from "@chakra-ui/core";
import { Form, Formik, FormikHelpers } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import Alert from "../../components/Alert";
import InputField from "../../components/InputField";
import Layout from "../../components/Layout";
import Wrapper from "../../components/Wrapper";
import { useResetPasswordMutation } from "../../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { type } from "os";

const ResetPassword: NextPage = () => {
  const [response, resetPassword] = useResetPasswordMutation();
  const router = useRouter();
  const { data, error } = response;

  let alert = null;

  if (data) {
    console.log("Showing Dialog");

    const { success, error } = data.resetPassword;

    alert = (
      <Alert
        status={success ? "success" : "error"}
        message={success ? success.message : error ? error.message : ""}
        title="Forgot Password"
      ></Alert>
    );

    console.log("Go to login");

    if (success?.sucess) {
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }

  return (
    <Layout>
      {alert}
      <Wrapper variant="small">
        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          onSubmit={async (values, { setErrors }) => {
            await resetPassword({
              resetInput: {
                ...values,
                token:
                  typeof router.query.token === "string"
                    ? router.query.token
                    : "",
              },
            });
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Heading mb={5}>Reset Password</Heading>

              <InputField
                name="newPassword"
                placeholder="New Password"
                label="New Password"
                type="password"
                value={values.newPassword}
              />
              <br />
              <InputField
                name="confirmPassword"
                placeholder="Confirm Password"
                label="Confirm Password"
                type="password"
                value={values.confirmPassword}
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

export default withUrqlClient(createUrqlClient)(ResetPassword);
