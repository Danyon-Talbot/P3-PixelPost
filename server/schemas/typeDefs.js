const typeDefs = `
  scalar Upload
  extend type Mutation {
    imageUploader(file: Upload!): String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    gallery: [Image]
  }

  type Image {
    _id: ID!
    filename: String!
    contentType: String!
    path: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    user(username: String!): User
    getUserGallery(username: String!): [Image]
    userAll: [User]
  }
  type Mutation {
    createUser(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    saveToGallery(file: Upload!): Image
  }
`;

module.exports = typeDefs;
