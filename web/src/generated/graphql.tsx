import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  me?: Maybe<User>;
};

export type QueryPostsArgs = {
  cursor?: Maybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type QueryPostArgs = {
  id: Scalars["Int"];
};

export type PaginatedPosts = {
  __typename?: "PaginatedPosts";
  posts: Array<Post>;
  hasMore: Scalars["Boolean"];
};

export type Post = {
  __typename?: "Post";
  id: Scalars["Int"];
  creatorId: Scalars["Float"];
  points: Scalars["Float"];
  title: Scalars["String"];
  text: Scalars["String"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  textSnippet: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["Int"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  username: Scalars["String"];
  email: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars["Boolean"];
  forgotPassword: ReturnResponse;
  resetPassword: ReturnResponse;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars["Boolean"];
};

export type MutationCreatePostArgs = {
  postInput: PostInput;
};

export type MutationUpdatePostArgs = {
  title?: Maybe<Scalars["String"]>;
  id: Scalars["Float"];
};

export type MutationDeletePostArgs = {
  id: Scalars["Float"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationResetPasswordArgs = {
  resetInput: ResetInput;
};

export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  usernameOrEmail: Scalars["String"];
};

export type PostInput = {
  title: Scalars["String"];
  text: Scalars["String"];
};

export type ReturnResponse = {
  __typename?: "ReturnResponse";
  success?: Maybe<SuccessResponse>;
  error?: Maybe<ErrorResponse>;
};

export type SuccessResponse = {
  __typename?: "SuccessResponse";
  sucess?: Maybe<Scalars["Boolean"]>;
  message: Scalars["String"];
};

export type ErrorResponse = {
  __typename?: "ErrorResponse";
  message: Scalars["String"];
};

export type ResetInput = {
  token: Scalars["String"];
  newPassword: Scalars["String"];
  confirmPassword: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type UsernamePasswordInput = {
  username: Scalars["String"];
  password: Scalars["String"];
  email: Scalars["String"];
};

export type UserFieldFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "username" | "createdAt"
>;

export type CreatePostMutationVariables = Exact<{
  postInput: PostInput;
}>;

export type CreatePostMutation = { __typename?: "Mutation" } & {
  createPost: { __typename?: "Post" } & Pick<
    Post,
    "id" | "createdAt" | "updatedAt" | "title" | "text" | "points" | "creatorId"
  >;
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type ForgotPasswordMutation = { __typename?: "Mutation" } & {
  forgotPassword: { __typename?: "ReturnResponse" } & {
    success?: Maybe<
      { __typename?: "SuccessResponse" } & Pick<
        SuccessResponse,
        "sucess" | "message"
      >
    >;
    error?: Maybe<
      { __typename?: "ErrorResponse" } & Pick<ErrorResponse, "message">
    >;
  };
};

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "UserResponse" } & {
    user?: Maybe<{ __typename?: "User" } & UserFieldFragment>;
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type PostsQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: Maybe<Scalars["String"]>;
}>;

export type PostsQuery = { __typename?: "Query" } & {
  posts: { __typename?: "PaginatedPosts" } & Pick<PaginatedPosts, "hasMore"> & {
      posts: Array<
        { __typename?: "Post" } & Pick<
          Post,
          "id" | "createdAt" | "updatedAt" | "title" | "textSnippet"
        >
      >;
    };
};

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserResponse" } & {
    user?: Maybe<
      { __typename?: "User" } & Pick<
        User,
        "id" | "username" | "createdAt" | "updatedAt"
      >
    >;
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >;
  };
};

export type ResetPasswordMutationVariables = Exact<{
  resetInput: ResetInput;
}>;

export type ResetPasswordMutation = { __typename?: "Mutation" } & {
  resetPassword: { __typename?: "ReturnResponse" } & {
    success?: Maybe<
      { __typename?: "SuccessResponse" } & Pick<
        SuccessResponse,
        "sucess" | "message"
      >
    >;
    error?: Maybe<
      { __typename?: "ErrorResponse" } & Pick<ErrorResponse, "message">
    >;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & UserFieldFragment>;
};

export const UserFieldFragmentDoc = gql`
  fragment UserField on User {
    id
    username
    createdAt
  }
`;
export const CreatePostDocument = gql`
  mutation CreatePost($postInput: PostInput!) {
    createPost(postInput: $postInput) {
      id
      createdAt
      updatedAt
      title
      text
      points
      creatorId
    }
  }
`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument
  );
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      success {
        sucess
        message
      }
      error {
        message
      }
    }
  }
`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument);
}
export const LoginDocument = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      user {
        ...UserField
      }
      errors {
        field
        message
      }
    }
  }
  ${UserFieldFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );
}
export const PostsDocument = gql`
  query Posts($limit: Int!, $cursor: String) {
    posts(limit: $limit, cursor: $cursor) {
      hasMore
      posts {
        id
        createdAt
        updatedAt
        title
        textSnippet
      }
    }
  }
`;

export function usePostsQuery(
  options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
}
export const RegisterDocument = gql`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      user {
        id
        username
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const ResetPasswordDocument = gql`
  mutation ResetPassword($resetInput: ResetInput!) {
    resetPassword(resetInput: $resetInput) {
      success {
        sucess
        message
      }
      error {
        message
      }
    }
  }
`;

export function useResetPasswordMutation() {
  return Urql.useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(ResetPasswordDocument);
}
export const MeDocument = gql`
  query Me {
    me {
      ...UserField
    }
  }
  ${UserFieldFragmentDoc}
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
