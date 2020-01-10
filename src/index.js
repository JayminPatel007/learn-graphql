import {GraphQLServer} from 'graphql-yoga'

const users = [
    {
        id: '1',
        name: "jaymin Patel",
        email: "jaymin.future365@gmail.com",
        age: 22
    },
    {
        id: '2',
        name: "Arzoo",
        email: "arzoo@gmail.com"
    },
    {
        id: '3',
        name: "Brijesh",
        email: "brijesh@gmail.com",
        age: 20
    }
]

const posts = [
    {
        id: '1',
        title: "CS",
        body: "CS is awsome",
        published: true,
        author: '1'
    },
    {
        id: '1',
        title: "MBBS",
        body: "MBBS is great",
        published: true,
        author: '1'
    },
    {
        id: '1',
        title: "Pharmacy",
        body: "Pharmasy is OK",
        published: false,
        author: '3'
    }
]

const typeDefs = `
    type Query{
        users: [User!]
        greeting(name: String): String!
        me: User!
        post: Post!
        posts: [Post!]!
    }
    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }
    type Post{
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
`

const resolvers = {
    Query: {
        users(){
            return users
        },
        posts(parent, args, ctx, info){
            return posts
        },
        greeting(parent, args, ctx, info){
            return `Hi, ${args.name}`
        },
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
    },
    Post: {
        author(parent, args, ctx, info){
            return users.find(user=>{
                return user.id === parent.author
            })
        }
    },
    User: {
        posts(parent, args, ctx, info){
            return posts.filter(post=>{
                return post.author === parent.id
            })
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