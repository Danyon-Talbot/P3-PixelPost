const typeDefs = `
  scalar Upload

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    gallery: [Gallery]
  }

  type Gallery {
    images: [Image]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    user(username: String!): User
    getUserGallery(username: String!): Gallery
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    saveToGallery(file: Upload!): Image
  }

  type Image {
    _id: ID!
    name: String
    desc: String
    img: ImageData
  }
  
  type ImageData {
    data: String
    contentType: String
  }

`;

module.exports = typeDefs;
