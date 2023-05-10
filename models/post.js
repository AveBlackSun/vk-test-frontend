const Post = {
  creator: {
    tipe: String,
    required: true,
  },
  text: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  image: {
    type: String,
  },

}



export default Post;