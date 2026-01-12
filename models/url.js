import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },

  redirectURL: {
    type: String,
    required: true,
  },

  totalClicks: {
    type: Number,
    default: 0,
  },

  createdDate: {
    type: String, // YYYY-MM-DD
    required: true,
  },
});

export default mongoose.model("url", urlSchema);
