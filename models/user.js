const User = {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    born: {
      type: Date,
    },
    city: {
      type: String,
    },
    university: {
      type: String,
    },
    photo: {
      type: String,
    },
    friends: [String],
    friendsto: [String],
    friendsfrom: [String],
    posts: [
      {
        text: String,
        image: String,
      },
    ],
  }

  export default User;