/* eslint-disable */
// THIS FILE IS GENERATED; DO NOT EDIT
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type AddOrUpdateDiscountInput = {
  DF_price: Scalars['Float'];
  catalog_id: Scalars['ID'];
  price_list_id: Scalars['ID'];
  product_id: Scalars['ID'];
};

export type AddOrUpdateDiscountResponse = {
  __typename?: 'AddOrUpdateDiscountResponse';
  price_list_id: Scalars['ID'];
  product: Product;
};

export type AddProductInput = {
  DF_price: Scalars['Float'];
  customization_descriptions?: InputMaybe<Array<CustomizationDescriptionInput>>;
  name: Scalars['String'];
  tax_percent: Scalars['Float'];
};

export type AskResetPasswordUserInput = {
  email: Scalars['String'];
};

export type AskResetPasswordUserResponse = {
  __typename?: 'AskResetPasswordUserResponse';
  success: Scalars['Boolean'];
};

export type Catalog = {
  __typename?: 'Catalog';
  _id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  products: Array<Product>;
};

export type CreatePriceListInput = {
  name: Scalars['String'];
};

export type CreatePriceListResponse = {
  __typename?: 'CreatePriceListResponse';
  price_list: PriceList;
};

export type CreateUserInput = {
  address: Scalars['String'];
  city: Scalars['String'];
  company_name: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  siret?: InputMaybe<Scalars['String']>;
  zip: Scalars['String'];
};

export type Customization = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type CustomizationDescription = {
  __typename?: 'CustomizationDescription';
  max_length?: Maybe<Scalars['Int']>;
  min_length?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  type: CustomizationDescriptionType;
  values?: Maybe<Array<Scalars['String']>>;
};

export type CustomizationDescriptionInput = {
  max_length?: InputMaybe<Scalars['Int']>;
  min_length?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  type: CustomizationDescriptionType;
  values?: InputMaybe<Array<Scalars['String']>>;
};

export enum CustomizationDescriptionType {
  ChoiceList = 'CHOICE_LIST',
  FreeField = 'FREE_FIELD',
}

export type DeleteDiscountInput = {
  catalog_id: Scalars['ID'];
  price_list_id: Scalars['ID'];
  product_id: Scalars['ID'];
};

export type DeleteDiscountResponse = {
  __typename?: 'DeleteDiscountResponse';
  price_list_id: Scalars['ID'];
  product: Product;
};

export type DeletePriceListInput = {
  price_list_id: Scalars['ID'];
};

export type DeletePriceListResponse = {
  __typename?: 'DeletePriceListResponse';
  price_list_id: Scalars['ID'];
  success: Scalars['Boolean'];
};

export type DeleteProductInput = {
  _id: Scalars['ID'];
};

export type DeleteProductResponse = {
  __typename?: 'DeleteProductResponse';
  product: Product;
};

export type GenerateOrderFormInput = {
  buyer_address: Scalars['String'];
  buyer_city: Scalars['String'];
  buyer_company_name: Scalars['String'];
  buyer_country: Scalars['String'];
  buyer_email: Scalars['String'];
  buyer_phone: Scalars['String'];
  buyer_siret?: InputMaybe<Scalars['String']>;
  buyer_zip: Scalars['String'];
  catalog_id: Scalars['ID'];
  ordered_products: Array<OrderedProductInput>;
};

export type GenerateOrderFormResponse = {
  __typename?: 'GenerateOrderFormResponse';
  success: Scalars['Boolean'];
};

export type GetCatalogInput = {
  _id: Scalars['ID'];
  price_list_id?: InputMaybe<Scalars['ID']>;
};

export type GetCatalogResponse = {
  __typename?: 'GetCatalogResponse';
  catalog: Catalog;
  sellor_company_name: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String'];
  user: User;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addOrUpdateDiscount: AddOrUpdateDiscountResponse;
  addProduct: Product;
  askResetPasswordUser: AskResetPasswordUserResponse;
  createPriceList: CreatePriceListResponse;
  createUser: User;
  deleteDiscount: DeleteDiscountResponse;
  deletePriceList: DeletePriceListResponse;
  deleteProduct: DeleteProductResponse;
  generateOrderForm: GenerateOrderFormResponse;
  login: LoginResponse;
  order: OrderResponse;
  resetPasswordUser: User;
  updateOrder: UpdateOrderResponse;
  updateProduct: Product;
  updateUser: User;
  verifyEmail: VerifyEmailResponse;
  verifyNewEmail: User;
};

export type MutationAddOrUpdateDiscountArgs = {
  add_or_update_discount_input: AddOrUpdateDiscountInput;
};

export type MutationAddProductArgs = {
  add_product_input: AddProductInput;
};

export type MutationAskResetPasswordUserArgs = {
  ask_reset_password_user_input: AskResetPasswordUserInput;
};

export type MutationCreatePriceListArgs = {
  create_price_list_input: CreatePriceListInput;
};

export type MutationCreateUserArgs = {
  create_user_input: CreateUserInput;
};

export type MutationDeleteDiscountArgs = {
  delete_discount_input: DeleteDiscountInput;
};

export type MutationDeletePriceListArgs = {
  delete_price_list_input: DeletePriceListInput;
};

export type MutationDeleteProductArgs = {
  delete_product_input: DeleteProductInput;
};

export type MutationGenerateOrderFormArgs = {
  generate_order_form_input: GenerateOrderFormInput;
};

export type MutationLoginArgs = {
  login_user_input: LoginUserInput;
};

export type MutationOrderArgs = {
  order_input: OrderInput;
};

export type MutationResetPasswordUserArgs = {
  reset_password_user_input: ResetPasswordUserInput;
};

export type MutationUpdateOrderArgs = {
  update_order_input: UpdateOrderInput;
};

export type MutationUpdateProductArgs = {
  update_product_input: UpdateProductInput;
};

export type MutationUpdateUserArgs = {
  update_user_input: UpdateUserInput;
};

export type MutationVerifyEmailArgs = {
  verify_email_input: VerifyEmailInput;
};

export type MutationVerifyNewEmailArgs = {
  verify_new_email_input: VerifyNewEmailInput;
};

export type Order = {
  __typename?: 'Order';
  _id: Scalars['ID'];
  buyer_address: Scalars['String'];
  buyer_city: Scalars['String'];
  buyer_company_name: Scalars['String'];
  buyer_country: Scalars['String'];
  buyer_email: Scalars['String'];
  buyer_phone: Scalars['String'];
  buyer_siret?: Maybe<Scalars['String']>;
  buyer_zip: Scalars['String'];
  order_status: OrderStatus;
  ordered_date: Scalars['Date'];
  ordered_products: Array<OrderedProduct>;
  price_list_name?: Maybe<Scalars['String']>;
};

export type OrderInput = {
  buyer_address: Scalars['String'];
  buyer_city: Scalars['String'];
  buyer_company_name: Scalars['String'];
  buyer_country: Scalars['String'];
  buyer_email: Scalars['String'];
  buyer_phone: Scalars['String'];
  buyer_siret?: InputMaybe<Scalars['String']>;
  buyer_zip: Scalars['String'];
  catalog_id: Scalars['ID'];
  ordered_products: Array<OrderedProductInput>;
  price_list_id?: InputMaybe<Scalars['ID']>;
};

export type OrderResponse = {
  __typename?: 'OrderResponse';
  success: Scalars['Boolean'];
};

export enum OrderStatus {
  Done = 'DONE',
  Inprogress = 'INPROGRESS',
  Paid = 'PAID',
  Refused = 'REFUSED',
  Sent = 'SENT',
  Todo = 'TODO',
}

export type OrderedCustomization = {
  __typename?: 'OrderedCustomization';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type OrderedProduct = {
  __typename?: 'OrderedProduct';
  DF_price: Scalars['Float'];
  DF_price_discount?: Maybe<Scalars['Float']>;
  IT_price: Scalars['Float'];
  IT_price_discount?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  ordered_customizations: Array<OrderedCustomization>;
  quantity: Scalars['Int'];
  tax_percent: Scalars['Float'];
};

export type OrderedProductInput = {
  customizations: Array<Customization>;
  product_id: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type PriceList = {
  __typename?: 'PriceList';
  _id: Scalars['ID'];
  name: Scalars['String'];
  products: Array<Product>;
};

export type Product = {
  __typename?: 'Product';
  DF_price: Scalars['Float'];
  DF_price_discount?: Maybe<Scalars['Float']>;
  IT_price: Scalars['Float'];
  IT_price_discount?: Maybe<Scalars['Float']>;
  _id: Scalars['ID'];
  customization_descriptions: Array<CustomizationDescription>;
  name: Scalars['String'];
  tax_percent: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getCatalog: GetCatalogResponse;
  myUser: User;
};

export type QueryGetCatalogArgs = {
  get_catalog_input: GetCatalogInput;
};

export type ResetPasswordUserInput = {
  new_password: Scalars['String'];
  token: Scalars['String'];
  user_id: Scalars['ID'];
};

export type UpdateOrderInput = {
  _id: Scalars['ID'];
  order_status?: InputMaybe<OrderStatus>;
};

export type UpdateOrderResponse = {
  __typename?: 'UpdateOrderResponse';
  order: Order;
};

export type UpdateProductInput = {
  DF_price?: InputMaybe<Scalars['Float']>;
  _id: Scalars['ID'];
  customization_descriptions?: InputMaybe<Array<CustomizationDescriptionInput>>;
  name?: InputMaybe<Scalars['String']>;
  tax_percent?: InputMaybe<Scalars['Float']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  company_name?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  new_email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  siret?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  address: Scalars['String'];
  catalog: Catalog;
  city: Scalars['String'];
  company_name: Scalars['String'];
  country: Scalars['String'];
  days_countdown: Scalars['Int'];
  email: Scalars['String'];
  orders: Array<Order>;
  phone: Scalars['String'];
  price_lists: Array<PriceList>;
  siret?: Maybe<Scalars['String']>;
  subscriptionStatus?: Maybe<Scalars['String']>;
  zip: Scalars['String'];
};

export type VerifyEmailInput = {
  token: Scalars['String'];
  user_id: Scalars['ID'];
};

export type VerifyEmailResponse = {
  __typename?: 'VerifyEmailResponse';
  success: Scalars['Boolean'];
};

export type VerifyNewEmailInput = {
  token: Scalars['String'];
  user_id: Scalars['ID'];
};

export type GetPriceListsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPriceListsQuery = {
  __typename?: 'Query';
  myUser: {
    __typename?: 'User';
    _id: string;
    catalog: {
      __typename?: 'Catalog';
      _id: string;
      products: Array<{
        __typename?: 'Product';
        _id: string;
        name: string;
        DF_price: number;
      }>;
    };
    price_lists: Array<{
      __typename?: 'PriceList';
      _id: string;
      name: string;
      products: Array<{
        __typename?: 'Product';
        _id: string;
        name: string;
        DF_price: number;
        DF_price_discount?: number | null;
      }>;
    }>;
  };
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'LoginResponse';
    access_token: string;
    user: { __typename?: 'User'; _id: string };
  };
};

export type AskResetPasswordUserMutationVariables = Exact<{
  email: Scalars['String'];
}>;

export type AskResetPasswordUserMutation = {
  __typename?: 'Mutation';
  askResetPasswordUser: {
    __typename?: 'AskResetPasswordUserResponse';
    success: boolean;
  };
};

export type ResetPasswordMutationVariables = Exact<{
  user_id: Scalars['ID'];
  new_password: Scalars['String'];
  token: Scalars['String'];
}>;

export type ResetPasswordMutation = {
  __typename?: 'Mutation';
  resetPasswordUser: { __typename?: 'User'; _id: string };
};

export type CreateUserMutationVariables = Exact<{
  address: Scalars['String'];
  city: Scalars['String'];
  company_name: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  siret?: InputMaybe<Scalars['String']>;
  zip: Scalars['String'];
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: { __typename?: 'User'; email: string; _id: string };
};

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String'];
  user_id: Scalars['ID'];
}>;

export type VerifyEmailMutation = {
  __typename?: 'Mutation';
  verifyEmail: { __typename?: 'VerifyEmailResponse'; success: boolean };
};

export const GetPriceListsDocument = gql`
  query getPriceLists {
    myUser {
      _id
      catalog {
        _id
        products {
          _id
          name
          DF_price
        }
      }
      price_lists {
        _id
        name
        products {
          _id
          name
          DF_price
          DF_price_discount
        }
      }
    }
  }
`;

/**
 * __useGetPriceListsQuery__
 *
 * To run a query within a React component, call `useGetPriceListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPriceListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPriceListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPriceListsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetPriceListsQuery,
    GetPriceListsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPriceListsQuery, GetPriceListsQueryVariables>(
    GetPriceListsDocument,
    options
  );
}
export function useGetPriceListsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPriceListsQuery,
    GetPriceListsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPriceListsQuery, GetPriceListsQueryVariables>(
    GetPriceListsDocument,
    options
  );
}
export type GetPriceListsQueryHookResult = ReturnType<
  typeof useGetPriceListsQuery
>;
export type GetPriceListsLazyQueryHookResult = ReturnType<
  typeof useGetPriceListsLazyQuery
>;
export type GetPriceListsQueryResult = Apollo.QueryResult<
  GetPriceListsQuery,
  GetPriceListsQueryVariables
>;
export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(login_user_input: { email: $email, password: $password }) {
      user {
        _id
      }
      access_token
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const AskResetPasswordUserDocument = gql`
  mutation askResetPasswordUser($email: String!) {
    askResetPasswordUser(ask_reset_password_user_input: { email: $email }) {
      success
    }
  }
`;
export type AskResetPasswordUserMutationFn = Apollo.MutationFunction<
  AskResetPasswordUserMutation,
  AskResetPasswordUserMutationVariables
>;

/**
 * __useAskResetPasswordUserMutation__
 *
 * To run a mutation, you first call `useAskResetPasswordUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAskResetPasswordUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [askResetPasswordUserMutation, { data, loading, error }] = useAskResetPasswordUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAskResetPasswordUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AskResetPasswordUserMutation,
    AskResetPasswordUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AskResetPasswordUserMutation,
    AskResetPasswordUserMutationVariables
  >(AskResetPasswordUserDocument, options);
}
export type AskResetPasswordUserMutationHookResult = ReturnType<
  typeof useAskResetPasswordUserMutation
>;
export type AskResetPasswordUserMutationResult =
  Apollo.MutationResult<AskResetPasswordUserMutation>;
export type AskResetPasswordUserMutationOptions = Apollo.BaseMutationOptions<
  AskResetPasswordUserMutation,
  AskResetPasswordUserMutationVariables
>;
export const ResetPasswordDocument = gql`
  mutation resetPassword(
    $user_id: ID!
    $new_password: String!
    $token: String!
  ) {
    resetPasswordUser(
      reset_password_user_input: {
        user_id: $user_id
        new_password: $new_password
        token: $token
      }
    ) {
      _id
    }
  }
`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      new_password: // value for 'new_password'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(ResetPasswordDocument, options);
}
export type ResetPasswordMutationHookResult = ReturnType<
  typeof useResetPasswordMutation
>;
export type ResetPasswordMutationResult =
  Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;
export const CreateUserDocument = gql`
  mutation createUser(
    $address: String!
    $city: String!
    $company_name: String!
    $country: String!
    $email: String!
    $password: String!
    $phone: String!
    $siret: String
    $zip: String!
  ) {
    createUser(
      create_user_input: {
        address: $address
        city: $city
        company_name: $company_name
        country: $country
        email: $email
        password: $password
        phone: $phone
        siret: $siret
        zip: $zip
      }
    ) {
      email
      _id
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      address: // value for 'address'
 *      city: // value for 'city'
 *      company_name: // value for 'company_name'
 *      country: // value for 'country'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      phone: // value for 'phone'
 *      siret: // value for 'siret'
 *      zip: // value for 'zip'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const VerifyEmailDocument = gql`
  mutation verifyEmail($token: String!, $user_id: ID!) {
    verifyEmail(verify_email_input: { token: $token, user_id: $user_id }) {
      success
    }
  }
`;
export type VerifyEmailMutationFn = Apollo.MutationFunction<
  VerifyEmailMutation,
  VerifyEmailMutationVariables
>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useVerifyEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(
    VerifyEmailDocument,
    options
  );
}
export type VerifyEmailMutationHookResult = ReturnType<
  typeof useVerifyEmailMutation
>;
export type VerifyEmailMutationResult =
  Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<
  VerifyEmailMutation,
  VerifyEmailMutationVariables
>;
