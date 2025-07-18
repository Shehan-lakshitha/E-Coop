import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import PropTypes from "prop-types";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt={name} />
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">Rs. {price}</p>

        <div className="food-item-action-container">
          {!cartItems[id] ? (
            <img
              className="food-icon-add"
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              alt="Add"
            />
          ) : (
            <div className="food-item-counter-aligned">
              <img
                className="food-icon"
                onClick={() => removeFromCart(id)}
                src={assets.remove_icon_red}
                alt="Remove"
              />
              <p>{cartItems[id]}</p>
              <img
                className="food-icon"
                onClick={() => addToCart(id)}
                src={assets.add_icon_green}
                alt="Add More"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

FoodItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default FoodItem;
