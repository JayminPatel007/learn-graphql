const Query = {
    comments(parent, args, {db}, info){
        return db.comments
    },
    users(parent, args, {db}, info){
        return db.users
    },
    posts(parent, args, {db}, info){
        return db.posts
    },
    greeting(parent, args, {db}, info){
        return `Hi, ${args.name}`
    }
}

export {Query as default}