import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_TO_GALLERY_MUTATION = gql`
  mutation saveToGallery($file: Upload!) {
    saveToGallery(file: $file) {
      _id
      name
      desc
      img {
        data
        contentType
      }
    }
  }
`;
