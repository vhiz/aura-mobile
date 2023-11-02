import Posts from "../model/Posts.js";
import User from "../model/Users.js";

export const CreatePost = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const newPost = new Posts({
      userId: user._id,
      desc: req.body.desc,
    });

    await newPost.save();

    return res.status(201).send("post has been created");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const GetAllPosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);

    const userPosts = await Posts.find({ userId: currentUser._id });

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Posts.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const GetUserPost = async (req, res) => {
  try {
    const {
      params: { userId },
    } = req;
    const currentUser = await User.findById(userId);
    const userPosts = await Posts.find({ userId: currentUser._id });

    res.status(200).json(userPosts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
