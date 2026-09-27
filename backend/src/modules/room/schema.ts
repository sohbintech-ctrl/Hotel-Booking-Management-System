import { Schema, model } from "mongoose";

const roomSchema = new Schema(
  {
    roomName: {
      type: String,
      required: true,
      trim: true,
    },

    roomType: {
      type: String,
      required: true,
      enum: ["standard", "deluxe", "suite"],
    },

    branch: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

images: [
  {
    url: {
      type: String,
      default: "",
    },
    publicId: {
      type: String,
      default: "",
    },
  },
],
  },
  {
    timestamps: true,
  }
);

export const Room = model("Room", roomSchema);