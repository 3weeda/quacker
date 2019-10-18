let db = {
    users: [
        {
            userId: '',
            email: '',
            handle: '',
            createdDate: '',
            imageUrl: '',
            bio: '',
            website: '',
            location: ''
        }
    ],
    screams: [
        {
            userHandle: 'user',
            body: 'scream body',
            createdDate: "2019-10-11T16:14:10.991Z",
            likeCount: 5,
            commentCount: 2
        }
    ],
    comments: [
        {
            userHandle: '',
            body: '',
            createdData: '',
            screamId: '',
        }
    ],
    notifications: [
        {
            recipient: '',
            sender: '',
            read: true | false,
            screamId: '',
            type: likes | comments,
            createdDate: '',
        }
    ]
}
const userDetails = {
    // Redux data
    credentials: {
        userId: '',
        email: '',
        handle: '',
        createdDate: '',
        imageUrl: '',
        bio: '',
        website: '',
        location: '',
    },
    likes: [
        {
            userHandle: 'user1',
            screamId: ''
        },
        {
            userHandle: 'user2',
            screamId: ''
        }
    ]
}