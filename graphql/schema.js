import { buildSchema } from 'graphql';

export default buildSchema(`
  type Job {
    id: ID!
    title: String!
    type: String!
    company: String!
    description: String!
    url: String!
    location: String!
    created_at: String!
  }

  type Query {
    jobs:[Job!]
    job(id: ID!): Job!
  }

  schema {
    query: Query
  }
`);
