import User from "../model/Users.js";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
export const Login = async (req, res) => {
  try {
    try {
      const userExit = await User.findOne({
        $or: [
          { username: { $regex: new RegExp(`^${req.body.username}$`, "i") } },
        ],
      });
      if (!userExit) return res.status(404).json({ error: "User not found" });

      if (req.body.expoPushToken && userExit) {
        await User.findOneAndUpdate(
          { username: req.body.username },
          {
            $set: {
              expoPushToken: req.body.expoPushToken,
            },
          },
          {
            new: true,
          }
        );
      }
      const validPassword = bcryptjs.compareSync(
        req.body.password,
        userExit.password
      );

      if (!validPassword)
        return res.status(403).json({ error: "Invalid password" });

      const token = jwt.sign({ id: userExit.id }, process.env.Token);
      const { password, updatedAt, ...user } = userExit._doc;

      res.status(200).json({ ...user, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const Register = async (req, res) => {
  try {
    try {
      const existingUser = await User.findOne({
        $or: [
          { username: { $regex: new RegExp(`^${req.body.username}$`, "i") } },
          { email: { $regex: new RegExp(`^${req.body.email}$`, "i") } },
        ],
      });

      if (existingUser) {
        return res.status(409).json("User already exists");
      }

      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = bcryptjs.hashSync(req.body.password, salt);

      const newUser = {
        ...req.body,
        password: hashedPassword,
      };

      await User.create(newUser);

      res.status(201).json("User created");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
