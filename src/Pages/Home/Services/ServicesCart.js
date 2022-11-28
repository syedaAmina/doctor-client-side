import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link } from "react-router-dom";

const ServicesCart = ({ service }) => {
  const { title, img, price, description, _id } = service;
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <PhotoProvider>
        <PhotoView src="/1.jpg">
          <img src={img} alt="" />
        </PhotoView>
      </PhotoProvider>
      <div className="card-body">
        <h2 className="card-title text-2xl font-serif">{title}</h2>
        <p className="text-xl text-orange-600 font-semibold">Charge Fee: ${price}</p>
        <div className="card-actions text-lg">
          {description.length > 100 ? (
            <p>
              {description.slice(0, 100) + "..."}{" "}
              <Link to={`/checkout/${_id}`}>
                <button class="btn rounded-sm mx-2 bg-slate-200 text-slate-900">view details</button>
              </Link>
            </p>
          ) : (
            <p>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesCart;
