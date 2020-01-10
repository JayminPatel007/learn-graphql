import {GraphQLServer} from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

const users = [
    {
        id: '1',
        name: "Jaymin Patel",
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
        id: '2',
        title: "MBBS",
        body: "MBBS is great",
        published: true,
        author: '2'
    },
    {
        id: '3',
        title: "Pharmacy",
        body: "Pharmasy is OK",
        published: false,
        author: '3'
    }
]

const comments = [
    {
        id: '1',
        text: "Yep",
        author: '2',
        post: '1'
    },
    {
        id: '2',
        text: "Good Luck",
        author: '1',
        post: '2'
    },
    {
        id: '3',
        text: "God Bless",
        author: '3',
        post: '2'
    },
    {
        id: '4',
        text: ":)",
        author: '1',
        post: '3'
    }
]

const typeDefs = `
    type Query{
        users: [User!]
        greeting(name: String): String!
        posts: [Post!]!
        comments: [Comment!]!
    }
    type Mutation{
        createUser(data: createUserInput): User!
        createPost(data: createPostInput): Post!
        createComment(data: createCommentInput): Comment!
    }

    input createUserInput{
        name: String!
        email: String!
        age: Int
    }

    input createPostInput{
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }

    input createCommentInput{
        text: String!
        author: ID!
        post: ID!
    }

    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }
    type Post{
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }
    type Comment{
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

const resolvers = {
    Query: {
        comments(){
            return comments
        },
        users(){
            return users
        },
        posts(parent, args, ctx, info){
            return posts
        },
        greeting(parent, args, ctx, info){
            return `Hi, ${args.name}`
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info){
            const emailTaken = users.some(user=> user.email === args.data.email)
            if (emailTaken){
                throw new Error("This email is taken!");
            }

            const user = {
                id: uuidv4(),
                ...args.data
            }

            users.push(user)
            return user
        },
        createPost(parent, args, ctx, info){
            const userexist = users.some(user=>user.id===args.data.author)
            if (!userexist){
                throw new Error("User does not exists")
            }
            const post = {
                id: uuidv4(),
                ...args.data
            }

            posts.push(post)

            return post;
        },
        createComment(parent, args, ctx, info){
            const userexist = users.some(user=>user.id === args.data.author)
            const postexist = posts.some(post=>post.id === args.data.post)
            if(!userexist){
                throw new Error("User does not exists")
            }
            if(!postexist){
                throw new Error("Post does not exists")
            }
            const comment = {
                id: uuidv4(),
                ...args.data
            }

            comments.push(comment)

            return comment
        }
    },
    Post: {
        author(parent, args, ctx, info){
            return users.find(user=>{
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info){
            return comments.filter(comment=>{
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info){
            return posts.filter(post=>{
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info){
            return comments.filter(comment=>{
                return comment.author === parent.id
            })
        }
    },
    Comment:{
        author(parent, args, ctx, info){
            return users.find(user=>{
                return user.id === parent.author
            })
        },

        post(parent, args, ctx, info){
            return posts.find(post=>{
                return post.id === parent.post
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