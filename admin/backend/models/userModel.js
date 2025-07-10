import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        cartData: { type: Object, default: {}},
        phone: { type: String},
        address: { type: String},
        role: { type: String, default: "user" },
    },
    {
        minimize: false,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
export default User;
