import React from "react";
import { backend_url } from "../../server";

const ListTourX = (data: any) => {
  const items = data.data;
  return (
    <div className="main-footer-list mb-12 m-10 flex-3">
      {items.map((item: any, index: any) => {
        return (
          <div key={index} className="main-footer-item">
            <a
              href="/search/{{slug}}"
              style={{
                backgroundImage: `url("${backend_url}${item.images[0]}")`,
              }}
              className="main-item-img"
            ></a>

            <div className="main-item-content">
              <div className="main-item-header text-capitalize">{item.destination}</div>
              <div className="main-item-text " style={{textTransform: "capitalize"}}>{item.description} </div>
            </div>

            <a
              href="/search/{{slug}}"
              style={{ backgroundColor: item.color }}
              className="main-item-price"
            >
              <div className="main-price-number">{item.price} $</div>
              <div className="main-price-detail d-flex justify-content-center">DETAILS</div>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default ListTourX;
