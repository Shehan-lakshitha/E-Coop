import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.ObjectId, ref:"User", required: true },
        items: { type: Array, required: true },
        amount: { type: Number, required: true },
        address: { type: Object },
        status: { type: String, default: "processing", enum : ["processing", "shipped", "done", "ready to pickup"] },
        payment: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;