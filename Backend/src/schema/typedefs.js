import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    user(query: UserProps): User
    users: [User]
    todos(query: ID!): [Todo!]!
  }

  type Mutation {
    addTodo(data: TodoInput!): Todo
    deleteTodo(id: ID!): Todo
    updateTodoCheck(id: ID!): Todo
  }

  type Subscription {
    todo: TodoSubscriptionPayload!
  }

  enum MutationType {
    CREATED
    DELETED
  }

  type TodoSubscriptionPayload {
    mutation: MutationType!
    name: String!
    data: Todo!
  }

  type User {
    id: ID
    username: String
    email: String
    password: String
  }

  input UserProps {
      username: String!
      password: String!
  }

  input TodoInput {
      name: String!
      completed: Boolean!
      owner: ID!
  } 

  type Todo {
      id: ID!
      name: String!
      completed: Boolean!
      owner: ID!
  }

`;

export default typeDefs;