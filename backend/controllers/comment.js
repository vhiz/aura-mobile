import Comments from "../model/Comments.js";
import User from "../model/Users.js";

export const GetAllComments = async (req, res) => {
  try {
    const comments = await Comments.find({ postId: req.query.postId });
    res.status(200).send(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const CreateComment = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const newComment = new Comments({
      userId: user._id,
      desc: req.body.desc,
      postId: req.body.postId,
    });

    const savedcomment = await newComment.save();

    return res.status(201).send("comment has been created");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
