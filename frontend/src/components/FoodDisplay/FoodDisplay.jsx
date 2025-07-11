import { useContext, useState } from "react";
import PropTypes from "prop-types";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, categoryList } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState("");

  const getCategoryName = (id) => {
    const found = categoryList.find((cat) => cat._id === id);
    return found ? found.name : "";
  };

  // Filter based on both category and search term
  const filteredItems = food_list.filter((item) => {
    const itemCategoryName = getCategoryName(item.category);
    const matchesCategory = category === "All" || category === itemCategoryName;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="food-display" id="food-display">
      <h2>{category === "All" ? "All Products" : `${category}`}</h2>

      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search products..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            className="clear-search-btn"
            onClick={() => setSearchTerm("")}
          >
            &times;
          </button>
        )}
      </div>

      <div className="food-display-list">
        {filteredItems.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.imageURL}
          />
        ))}
      </div>
    </div>
  );
};

FoodDisplay.propTypes = {
  category: PropTypes.string.isRequired,
};

export default FoodDisplay;
