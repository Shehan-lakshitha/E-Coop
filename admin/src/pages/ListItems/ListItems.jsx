import React from "react";
import "./ListItems.css";
import { assets } from "../../assets/assets.js";

const ListItems = () => {
  return (
    <div className="list_Items">
      <h3 className="list_title">All List Items</h3>

      <table className="list_table">
        <thead className="table_header">
          <tr className="header_row">
            <th scope="col" className="header_name">
              Image
            </th>
            <th scope="col" className="header_name">
              Name
            </th>
            <th scope="col" className="header_name">
              Category
            </th>
            <th scope="col" className="header_name">
              Description
            </th>
            <th scope="col" className="header_name">
              Price
            </th>
            <th scope="col" className="header_name">
              Delete
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="body_row">
            <td>
              <img src={assets.parcel_icon} alt="" />
            </td>
            <td>
              Nestamolt
            </td>
            <td>
            Nestamolt
            </td>
            <td>
            Nestamolt
            </td>
            <td>
            Nestamolt
            </td>
            <td>
            Nestamolt
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListItems;
