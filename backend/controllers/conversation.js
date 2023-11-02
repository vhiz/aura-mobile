import Conversation from "../model/Conversation.js";

export const NewConversation = async (req, res) => {
  try {
    const {
      body: { receiverId },
    } = req;

    const conversation = await Conversation.findOne({
      members: { $all: [req.params.id, receiverId] },
    });

    if (conversation) {
      res.status(200).json("conversation already exist");
    } else {
      const senderId = req.params.id;
      const newConversation = new Conversation({
        members: [senderId, receiverId],
      });

      await newConversation.save();
      res.status(201).json(newConversation);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const GetConversations = async (req, res) => {
  try {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.id] },
      });

      res.status(200).json(conversation);
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const GetConversation = async (req, res) => {
  try {
    const {
      params: { secondId, id },
    } = req;

    try {
      const conversation = await Conversation.findOne({
        members: { $all: [id, secondId] },
      });

      res.status(200).json(conversation);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
