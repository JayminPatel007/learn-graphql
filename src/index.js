import {GraphQLServer} from 'graphql-yoga'

const typeDefs = `
    type Query{
        hello: String!
    }
`

const resolvers = {
    Query: {
        hello(){
            return "This is my first string!"
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(()=>{
    console.log("Server is up")
})