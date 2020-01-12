import uuidv4 from 'uuid/v4';
const Mutation= {
    createUser(parent, args, {db}, info){
        const emailTaken = db.users.some(user=> user.email === args.data.email)
        if (emailTaken){
            throw new Error("This email is taken!");
        }

        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user)
        return user
    },
    updateUser(parent, args, {db}, info){
        const {id, data} = args
        const user = db.users.find(user=>user.id === id)

        if (!user) {
            throw new Error("Use not found");
        }
        if (typeof data.email === "string"){
            const emailTaken = db.users.some(user => user.email === data.email)
            if (emailTaken){
                throw new Error("Email taken")
            }
            user.email = data.email
        }
        if (typeof data.name === 'string'){
            user.name = data.name;
        }
        if (typeof data.age !== 'undefined'){
            user.age = data.age
        }

        return user
    },
    deleteUser(parent, args, {db}, info){
        const userindex = db.users.findIndex(user=>user.id===args.id)
        if (userindex === -1){
            throw new Error("User does not Exists!")
        }
        const deletedusers = db.users.splice(userindex, 1)
        db.posts = db.posts.filter(cpost=>{
            const postToDelete = cpost.author ===args.id
            if (postToDelete){
                db.comments=db.comments.filter(comment=>{
                    return comment.post !== cpost.id
                })
            }
            return !postToDelete
        })

        db.comments = db.comments.filter(comment =>{
            return comment.author !== args.id
        })
        return deletedusers[0]
    },
    createPost(parent, args, {db}, info){
        const userexist = db.users.some(user=>user.id===args.data.author)
        if (!userexist){
            throw new Error("User does not exists")
        }
        const post = {
            id: uuidv4(),
            ...args.data
        }

        db.posts.push(post)

        return post;
    },
    deletePost(parent, args, {db}, info){
        const postindex = db.posts.findIndex(cpost=>cpost.id===args.id)
        if (postindex === -1){
            throw new Error("Post does not exists")
        }
        const deletedPost = db.posts.splice(postindex, 1)
        console.log(deletedPost)

        db.comments = db.comments.filter(ccomment=>ccomment.post !==args.id)

        return deletedPost[0]
    },
    createComment(parent, args, {db}, info){
        const userexist = db.users.some(user=>user.id === args.data.author)
        const postexist = db.posts.some(post=>post.id === args.data.post)
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

        db.comments.push(comment)

        return comment
    },
    deleteComment(parent, args, {db}, info){
        const commentindex = db.comments.findIndex(ccomment=>ccomment.id === args.id)
        if (commentindex === -1){
            throw new Error("Comment Does not exist")
        }
        const deletedComment = db.comments.splice(commentindex, 1)
        return deletedComment[0]
    }
}

export {Mutation as default}