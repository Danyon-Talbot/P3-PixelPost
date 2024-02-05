import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      username
      email
    }
  }
`;

export const QUERY_IMAGES = gql`
  query getImages {
    images {
      _id
      filename
      contentType
      owner
      data
      createdAt
    }
  }
`;


export const QUERY_USER_GALLERY = gql`
  query getUserGallery {
    getUserGallery {
      _id
      username
      email
      gallery {
        _id
        filename
        contentType
        owner
        data
        createdAt
      }
    }
  }
`;