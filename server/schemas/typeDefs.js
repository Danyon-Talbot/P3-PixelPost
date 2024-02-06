const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    gallery: [Image]!
  }

  type Image {
    _id: ID!
    filename: String!
    contentType: String!
    owner: String!
    data: String!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    userAll: [User]
    user(username: String!): User
    allImages: [Image]!
    userImages: [Image]!
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    saveImage(base64Image: String!, filename: String!, contentType: String!, owner: String!): ImageResponse
    updateUser(username: String, email: String, password: String): User
    deleteUser: ImageResponse # Add this mutation
  }

  type ImageResponse {
    success: Boolean!
    message: String
  }
`;

module.exports = typeDefs;
