import Message from "../model/Message.js";

export const GetMessage = async (req, res) => {
  try {
    const {
      params: { conversationId },
    } = req;
    const message = await Message.find({
      conversationId: conversationId,
    }).sort({ createdAt: -1 });

    res.status(200).send(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const AddMessage = async (req, res) => {
  try {
    const senderId = req.params.id;
    const newMessage = new Message({
      ...req.body,
      sender: senderId,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const Read = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const message = await Message.findByIdAndUpdate(id, {
      $set: { reciverRead: true },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
