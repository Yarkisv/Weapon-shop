import React, { useEffect } from "react";
import cancel from "../images/cancel.svg";
import trash from "../images/trash.svg";
import sponge from "../images/sponge.svg";
import { useSaved } from "../contexts/savedContext";
import { useModal } from "../contexts/modalContext";

export default function SavedWindow() {
  const { isSavedWindowOpen, setSavedWindowOpen } = useModal();
  const { saved, clearSaved, removeFromSaved } = useSaved();

  const handleCloseWindow = () => {
    setSavedWindowOpen(false);
  };

  useEffect(() => {
    console.log(localStorage.getItem("saved"));
  }, []);

  return (
    <div className="fixed flex flex-col overflow-hidden z-[9999] right-0 top-0 bg-gray-300 rounded-l-md w-[500px] h-full">
      <div className="flex items-center justify-between mt-1 mb-2">
        <img
          src={cancel}
          alt="Close saved"
          className="w-[35px] h-[35px] pl-2 pt-1 cursor-pointer hover:opacity-70 invert"
          onClick={handleCloseWindow}
        />
        <button
          className="ml-auto pr-2 pt-1 cursor-pointer"
          onClick={clearSaved}
        >
          <img
            className="w-[30px] h-[30px] hover:scale-110 active:scale-95"
            src={trash}
            alt="Clear saved"
          />
        </button>
      </div>

      {saved.length > 0 ? (
        <div className="flex flex-col gap-[15px] max-h-[90vh] overflow-y-auto pr-[10px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded">
          {saved.map((savedProduct) => (
            <div
              key={savedProduct.id}
              className="flex items-center gap-[15px] border border-black/30 bg-gray-200 p-2 ml-2 rounded-md"
            >
              <img
                src={`data:image/jpg;base64,${savedProduct.image}`}
                alt={savedProduct.name}
                className="w-[100px] h-[100px] rounded object-contain"
              />
              <button
                className="bg-transparent border-none cursor-pointer"
                onClick={() => removeFromSaved(savedProduct.product_id)}
              >
                <img
                  className="w-[30px] h-[30px] hover:scale-110 active:scale-95"
                  src={trash}
                  alt="Remove saved"
                />
              </button>
              <div className="flex-1">
                <h4 className="text-[#9b181a] text-lg font-['M_PLUS_2'] m-0">
                  {savedProduct.name}
                </h4>
                <p className="text-black text-base font-['M_PLUS_2'] m-0 pt-1">
                  <strong>Caliber:</strong> {savedProduct.caliber}
                </p>
                <p className="text-black text-base font-['M_PLUS_2'] m-0 pt-1">
                  <strong>Code:</strong> {savedProduct.code}
                </p>
                <p className="text-black text-base font-['M_PLUS_2'] m-0 pt-1">
                  <strong>Price:</strong> {savedProduct.price} $
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 justify-center items-center">
          <div className="flex flex-col items-center gap-4 border-2 border-black rounded-md p-4 shadow-md">
            <p className="text-black text-xl font-sans text-center">
              Ви не додали жодного товару
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
