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

  type Query {
    getUser(_id: ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
