import { IOrder } from "gifts-store/interfaces";
import mongoose, { Schema, model, Model } from "mongoose";

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        title: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
        slug: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    numberOfItems: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    gender: { type: String, required: false },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: String },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> =
  mongoose.models.Order || model("Order", orderSchema);

export default Order;
