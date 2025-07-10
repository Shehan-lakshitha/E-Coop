import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./ExploreMenu.css";
import { StoreContext } from "../../context/StoreContext"; // Adjust path as needed

const ExploreMenu = ({ category, setCategory }) => {
  const { categoryList } = useContext(StoreContext);
  console.log(categoryList);
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our products</h1>
      <p className="explore-menu-text">
        Choose from a wide range of everyday essentials and fresh groceries. Our
        mission is to make your shopping easier, more affordable, and always
        within reach.
      </p>
      <div className="explore-menu-list">
        {categoryList.map((item) => (
          <div
            key={item._id}
            className={`explore-menu-list-item-box ${
              category === item.name ? "active" : ""
            }`}
            onClick={() =>
              setCategory((prev) => (prev === item.name ? "All" : item.name))
            }
          >
            {item.name}
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

ExploreMenu.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default ExploreMenu;
