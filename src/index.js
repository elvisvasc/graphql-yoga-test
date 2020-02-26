import { GraphQLServer } from 'graphql-yoga'

//Type definitions
const typeDefs = `
  type Query {
    greeting(name: String): String!
    addNumbers(a: Float!, b: Float!): Float!
    add(numbers: [Float!]): Float!
    grades: [Int!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

//Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello ${args.name}!`
      }

      return 'Hello'
    },

    addNumbers(parent, args, ctx, info) {
      return args.a + args.b
    },

    add(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0
      }

      return args.numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      })
    },

    grades() {
      return [7, 8, 9, 8, 10]
    },

    me() {
      return {
        id: 'abc123456',
        name: 'Elvis Cunha',
        email: 'elvisvasc2@gmail.com',
        age: 37
      }
    },

    post() {
      return {
        id: '85545ad',
        title: 'My GraphQL Test Application',
        body: 'This is my first test with GraphQL',
        published: true
      }
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('The server is up!')
})

console.log('Fim do script do server.')
