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


export const QUERY_USER = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      _id
      email
      gallery {
        _id
        filename
        contentType
        data
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;

export const GET_ALL_IMAGES = gql`
  query {
    allImages {
      _id
      filename
      contentType
      owner
      data
      createdAt
    }
  }
`;


export const GET_USER_IMAGES = gql`
  query {
    userImages {
      _id
      filename
      contentType
      owner
      data
      createdAt
    }
  }
`
