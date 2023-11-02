import Posts from "../model/Posts.js";

export const Like = async (req, res) => {
  try {
    const userId = req.query.id;
    const postId = req.params.postId;

    const post = await Posts.findById(postId);
    
    if (!post.likes.includes(userId)) {
        await post.updateOne({ $push: { likes: userId } });
        res.status(200).send("post has been liked");
        console.log('like');
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).send("post has been unliked");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
