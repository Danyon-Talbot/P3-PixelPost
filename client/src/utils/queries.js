import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      username
      email
    }
  }
`;

export const QUERY_USER_GALLERY = gql`
  query getUserGallery($username: String!) {
    getUserGallery(username: $username) {
      gallery {
        images {
          name
          desc
          img {
            data
            contentType
          }
        }
      }
    }
  }
`