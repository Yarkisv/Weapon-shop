import React, { useEffect } from "react";
import cancel from "../images/cancel.svg";
import trash from "../images/trash.svg";
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
    <>
      <div
        className="fixed inset-0 bg-black/40 z-[9998]"
        onClick={handleCloseWindow}
      />

      <div className="fixed flex flex-col overflow-hidden z-[9999] right-0 top-0 bg-white text-black rounded-l-lg w-[380px] h-full shadow-lg border-l border-gray-300">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-300">
          <img
            src={cancel}
            alt="Close saved"
            className="w-[28px] h-[28px] cursor-pointer filter contrast-0 brightness-0 hover:opacity-70 text-black"
            onClick={handleCloseWindow}
          />
          <button
            className="text-sm text-red-600 font-medium hover:underline cursor-pointer"
            onClick={clearSaved}
          >
            Очистити
          </button>
        </div>

        {saved.length > 0 ? (
          <div className="flex flex-col gap-4 px-3 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-thumb-rounded">
            {saved.map((savedProduct) => (
              <div
                key={savedProduct.id}
                className="flex items-start gap-3 border border-gray-200 bg-gray-50 p-2 rounded-lg shadow-sm"
              >
                <img
                  src={`data:image/jpg;base64,${savedProduct.image}`}
                  className="w-[75px] h-[75px] rounded object-contain border border-gray-300"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-[#9b181a] text-base font-bold leading-4">
                      {savedProduct.name}
                    </h4>
                    <button
                      className="p-1"
                      onClick={() => removeFromSaved(savedProduct.product_id)}
                    >
                      <img
                        className="w-5 h-5 hover:scale-110 cursor-pointer"
                        src={trash}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>Код:</strong> {savedProduct.article}
                  </p>
                  <p className="text-sm text-gray-800 font-semibold">
                    <strong>Ціна:</strong> {savedProduct.price} ₴
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full text-gray-500 text-base">
            Ви не додали жодного товару
          </div>
        )}
      </div>
    </>
  );
}
