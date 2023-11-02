import User from "../model/Users.js";

export const GetUser = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const user = await User.findById(id);

    const { password, ...other } = user._doc;
    res.status(200).send(other);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const EditUser = async (req, res) => {
  try {
    if (req.body.expoPushToken && userExit) {
      await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            expoPushToken: req.body.expoPushToken,
          },
        },
        {
          new: true,
        }
      );
      return;
    }
    return;
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
