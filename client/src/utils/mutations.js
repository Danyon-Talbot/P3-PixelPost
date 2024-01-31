import { gql } from '@apollo/client';

const createUserMutation = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export default createUserMutation;