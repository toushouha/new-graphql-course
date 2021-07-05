import { GraphQLServer } from 'graphql-yoga'

// posts
const posts = [{
    id: '1',
    title: 'Graphql-basic 101',
    body: '',
    published: false
}, {
    id: '2',
    title: 'Graphql-basic 201',
    body: '22222201',
    published: true
}, {
    id: '3',
    title: 'Graphql-basic 301',
    body: '',
    published: false
}]


// Type definition(schema)
const typeDefs = `
    type Query {
       greeting(name: String): String!
       me: User!
       posts(query: String): [Post!]!
       add(numbers: [Float!]!): Float!
    }

    type User{
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

// Resolvers
const resolvers = {
    Query: {
        // greeting(parent,args,ctx,info){
        //     console.log(args)
        //     return 'Hello ${args.name}'
        // },
        add(parent, args, ctx, inf) {
            return args.numbers.reduce(function (prev, cur) {
                return prev + cur;
            }, 0);
        },

        greeting(parent, args, ctx, inf) {
            if (args.name) {
                return `Hello, ${args.name}!`
            } else {
                return 'Hello!'
            }
        },

        me() {
            return {
                id: '1234abc',
                name: 'Deng',
                email: 'deng@example.com',
                age: 100
            }
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }

            return posts.filter(post => {
                return post.title.toLowerCase().includes(args.query.toLowerCase()) ||
                    post.body.toLowerCase().includes(args.query.toLowerCase())
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("The server is up!")
})