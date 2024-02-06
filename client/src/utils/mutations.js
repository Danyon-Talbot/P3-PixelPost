import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
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
        email
      }
    }
  }
`;

export const SAVE_TO_GALLERY_MUTATION = gql`
  mutation saveImage($base64Image: String!, $filename: String!, $contentType: String!, $owner: String!) {
    saveImage(base64Image: $base64Image, filename: $filename, contentType: $contentType, owner: $owner) {
      success
      message
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($username: String, $email: String, $password: String) {
    updateUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      password 
    }
  }
`;


export const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser {
      success
      message
    }
  }
`;