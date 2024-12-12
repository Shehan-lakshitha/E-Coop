import User from "../models/userModel.js";

//add items to the cart
const addToCart = async (req, res) => {
  try {
    let userData = await User.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.productId]) {
      cartData[req.body.productId] = 1;
    } else {
      cartData[req.body.productId] += 1;
    }
    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res
      .status(200)
      .json({
        success: true,
        message: "Added to cart successfully.",
        cartData,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error,Failed to add to cart." });
  }
};

//remove from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await User.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.productId]) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found in cart." });
    }
    if (cartData[req.body.productId] > 0) {
      cartData[req.body.productId] -= 1;
      if (cartData[req.body.productId] === 0) {
        delete cartData[req.body.productId];
      }
    }
    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res
      .status(200)
      .json({
        success: true,
        message: "Removed from cart successfully.",
        cartData,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error,Failed to remove from cart.",
      });
  }
};

//fetch user cart
const getCart = async (req, res) => {
  try {
    let userData = await User.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error,Failed to get cart." });
  }
};

export { addToCart, removeFromCart, getCart };
