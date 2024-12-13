import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.ObjectId, ref:"User", required: true },
        items: { type: Array, required: true },
        amount: { type: Number, required: true },
        address: { type: Object },
        phone: { type: String, required: true },
        status: { type: String, default: "processing", enum : ["processing", "shipped", "done", "ready for pickup"] },
        payment: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;