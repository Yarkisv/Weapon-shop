import React from "react";
import { useSaved } from "../contexts/savedContext";

import trash from "../images/trash.svg";

export default function WishList() {
  const { saved, removeFromSaved, clearSaved } = useSaved();

  return (
    <div className="Wishlist">
      <button className="ml-auto pr-2 pt-1 cursor-pointer" onClick={clearSaved}>
        <img
          className="w-[30px] h-[30px] hover:scale-110 active:scale-95"
          src={trash}
          alt="Clear basket"
        />
      </button>
      {saved.length > 0 ? (
        <div>
          {saved.map((savedProduct) => (
            <div>
              <img
                src={`data:image/jpg;base64,${savedProduct.image}`}
                className="basket-page-item-image"
              />
              <button
                className="bg-transparent border-none cursor-pointer"
                onClick={() => removeFromSaved(savedProduct.product_id)}
              >
                <img
                  className="w-[30px] h-[30px] hover:scale-110 active:scale-95"
                  src={trash}
                  alt="Remove item"
                />
              </button>

              <div className="">
                <h4 className="">{savedProduct.name}</h4>
                <p className="">
                  <p>Code:</p> {savedProduct.article}
                </p>
                <p className="">
                  <p>Price:</p> {savedProduct.price} $
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>Ви не додали жодного товару</p>
        </div>
      )}
    </div>
  );
}
