import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      username
      email
      # Include any other fields you want to retrieve
    }
  }
`;
