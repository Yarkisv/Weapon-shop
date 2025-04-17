import React from "react";
import { useSaved } from "../contexts/savedContext";

import trash from "../images/trash.svg";
import sponge from "../images/sponge.svg";

export default function WishList() {
  const { saved, removeFromSaved, clearSaved } = useSaved();

  return (
    <div className="ml-5 mt-5 w-[1015px] border border-[#585858] p-4 relative">
      {/* Кнопка очистки */}
      <button
        className="ml-auto block w-fit mb-2 pr-2 pt-1"
        onClick={clearSaved}
      >
        <img
          className="w-[24px] h-[24px] hover:scale-110 active:scale-95 transition-transform"
          src={trash}
          alt="Clear wishlist"
        />
      </button>

      {saved.length > 0 ? (
        <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2">
          {saved.map((savedProduct) => (
            <div
              key={savedProduct.product_id}
              className="flex items-center gap-3 border border-gray-300 p-2 rounded-md"
            >
              <img
                src={`data:image/jpg;base64,${savedProduct.image}`}
                alt={savedProduct.name}
                className="w-[120px] h-[90px] rounded object-contain"
              />

              <button
                className="bg-transparent border-none"
                onClick={() => removeFromSaved(savedProduct.product_id)}
              >
                <img
                  className="w-[20px] h-[20px] hover:scale-110 active:scale-95 transition-transform"
                  src={trash}
                  alt="Remove item"
                />
              </button>

              <div className="flex-1">
                <h4 className="text-[14px] font-['M_PLUS_2'] text-[#9b181a] m-0">
                  {savedProduct.name}
                </h4>
                <p className="text-[13px] font-['M_PLUS_2'] text-black m-0 pt-1">
                  <span className="font-semibold">Code:</span>{" "}
                  {savedProduct.article}
                </p>
                <p className="text-[13px] font-['M_PLUS_2'] text-black m-0 pt-1">
                  <span className="font-semibold">Price:</span>{" "}
                  {savedProduct.price} $
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 border-2 border-[#9b181a] rounded-md p-4 shadow-md">
          <img src={sponge} className="w-[200px] h-[300px]" alt="Порожньо" />
          <p className="text-[#9b181a] text-xl font-sans text-center">
            Ви не додали жодного товару
          </p>
        </div>
      )}
    </div>
  );
}
