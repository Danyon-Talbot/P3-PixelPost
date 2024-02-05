const typeDefs = `
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
    owner: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input SaveImageInput {
    base64Image: String!
    filename: String!
    contentType: String!
    owner: String!
  }
  
  type ImageResponse {
    success: Boolean!
    message: String
  }


  type Query {
    user(username: String!): User
    getUserGallery: User
    images(username: String!): [Image]
    image(username: String!): Image
    userAll: [User]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    saveImage(input: SaveImageInput!): ImageResponse
  }
`;

module.exports = typeDefs;
