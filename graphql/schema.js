import { buildSchema } from 'graphql';

export default buildSchema(`
  type Job {
    id: ID!
    url: String!
    type: String!
    title: String!
    company: String!
    location: String!
    created_at: String!
    description: String!
		company_url: String!
		company_logo: String!
		how_to_apply: String!
  }

  type Query {
    jobs(page: Int, description: String, location: String, full_time: String): [Job!]!
    job(id: ID!): Job!
  }

  schema {
    query: Query
  }
`);
