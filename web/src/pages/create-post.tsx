import { Button, Heading } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import Alert from "../components/Alert";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import Wrapper from "../components/Wrapper";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import useCheckLogin from "../utils/useCheckLogin";

interface createPostProps {}

const CreatePost: React.FC<createPostProps> = ({}) => {
  const router = useRouter();

  useCheckLogin("/login");

  const [response, createPost] = useCreatePostMutation();

  const { data, error, fetching } = response;
  let AlertPost = null;

  if (data) {
    AlertPost = (
      <Alert
        status="success"
        title="Create Post"
        message="Succesfully Posted"
      />
    );
  }

  if (error) {
    console.log(error);
    AlertPost = (
      <Alert
        status="error"
        title="Error on Posting"
        message="Not Authenticated"
      />
    );
  }

  return (
    <Layout>
      {AlertPost}
      <Wrapper variant="small">
        <Formik
          initialValues={{
            title: "",
            text: "",
          }}
          onSubmit={async (values, { setErrors, resetForm }) => {
            await createPost({ postInput: values });
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Heading mb={5}>Create Post</Heading>
              <InputField
                name="title"
                placeholder="Title here"
                label="Title"
                value={values.title}
              />
              <br />
              <InputField
                name="text"
                placeholder="body..."
                label="Body"
                textarea
                value={values.text}
              />

              <Button
                type="submit"
                isLoading={isSubmitting}
                mt={4}
                variantColor="green"
              >
                Post
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
