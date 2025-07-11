import "react";
import "./Header.css";
import { assets } from "../../assets/assets";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order Your Daily Essentials</h2>
        <p>
          E-Coop is your go-to retail shop for all your daily needs. We offer a
          wide selection of groceries, household items, fresh produce, and more
          — all under one roof. Committed to quality and affordability, eCoop
          ensures a convenient and satisfying shopping experience for every
          customer. Whether you are stocking up on essentials or looking for
          something special, we are here to serve your community with care and
          value.
        </p>
        <button
          onClick={() => {
            const productsSection = document.getElementById("explore-menu");
            if (productsSection) {
              productsSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          View Products
        </button>
      </div>

      <div className="images">
        <img src={assets.header_img} alt="" />
      </div>
    </div>
  );
};

export default Header;
