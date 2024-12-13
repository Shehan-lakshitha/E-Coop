import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      phone: req.body.phone,
    });
    await newOrder.save();
    await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => {
      return {
        price_data: {
          currency: "lkr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Server error, Failed to place the order." });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Server error, Failed to get the orders." });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.body.userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Server error, Failed to get the orders." });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      res.status(200).json({ success: true, message: "Paid." });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.status(200).json({ success: true, message: "Payment failed." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error, Failed to verify the payment.",
    });
  }
};

const statusUpdate = async (req, res) => {
  const { orderId, status } = req.body;
  const allowedStatuses = ["processing", "shipped", "done", "ready for pickup"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `${status} is not a valid status. Allowed statuses are: ${allowedStatuses.join(
        ", "
      )}`,
    });
  }

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated.",
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({
      success: false,
      message: "Server error, failed to update the status.",
    });
  }
};

export { placeOrder, getOrders, getUserOrders, verifyOrder, statusUpdate };
