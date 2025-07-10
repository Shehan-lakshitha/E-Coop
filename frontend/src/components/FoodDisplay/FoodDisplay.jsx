import { useContext } from "react";
import PropTypes from "prop-types";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, categoryList } = useContext(StoreContext);

  const getCategoryName = (id) => {
    const found = categoryList.find((cat) => cat._id === id);
    return found ? found.name : "";
  };

  return (
    <div className="food-display" id="food-display">
      <h2>{category === "All" ? "All" : `${category}`} Products</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          const itemCategoryName = getCategoryName(item.category);
          if (category === "All" || category === itemCategoryName) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.imageURL}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

FoodDisplay.propTypes = {
  category: PropTypes.string.isRequired,
};

export default FoodDisplay;
