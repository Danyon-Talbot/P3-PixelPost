const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    gallery: [Gallery]
  }

  type Gallery {
    fileName: String!
    filePath: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    user(username: String!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }

`;

module.exports = typeDefs;
