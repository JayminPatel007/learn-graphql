const users= [
    {
        id: "1",
        name: "Jaymin Patel",
        email: "jaymin.futurew365@gmail.com",
        age: 22
    },
    {
        id: "2",
        name: "Arzoo",
        email: "arzoo@gmail.com"
    },
    {
        id: "3",
        name: "Brijesh",
        email: "brijesh@gmail.com",
        age: 21
    }
]

const posts= [
    {
        id: "1",
        title: "CS is the best",
        body: "Learning Computer technologies is graet",
        published: true,
        author: "1"
    },
    {
        id: "2",
        title: "MBBS is vary vary vary vary boring",
        body: "Degree for mental students",
        published: true,
        author: "2"
    },
    {
        id: "3",
        title: "MR is very tiring Job",
        body: "I feel like I should leave my job and start business.",
        published: false,
        author: "3"
    }

]

const comments = [
    {
        id: "1",
        text: "Good Luck",
        author: "2",
        post: "1"
    },
    {
        id: "2",
        text: "You feel like it because you are not studying!!",
        author: "1",
        post: "2"
    },
    {
        id: "3",
        text: "Good luck for your new Venture",
        author: "1",
        post: "3"
    },
    {
        id: "4",
        text: ":)",
        author: "2",
        post: "3"
    }
]

const db = {
    users,
    posts,
    comments
}

export {db as default};