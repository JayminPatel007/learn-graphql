import {GraphQLServer} from 'graphql-yoga'

const typeDefs = `
    type Query{
        me: User!
        post: Post!
    }
    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
    }
    type Post{
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

const resolvers = {
    Query: {
        me(){
            return {
                id: "abc123",
                name: "Jaymin Patel",
                email: "jaymin.future365@gmail.com",
                age: 22
            }
        },

        post(){
            return{
                id: "abc",
                "title": "test",
                "body": "GrapgQL is awsome!",
                "published": true
            }
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