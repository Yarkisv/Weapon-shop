import { useSaved } from "../contexts/savedContext";

import trash from "../images/trash.svg";

export default function WishList() {
  const { saved, removeFromSaved, clearSaved } = useSaved();

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Обране</h1>

      <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md relative">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg text-gray-600">Ваш список вподобаного</p>
          <button
            onClick={clearSaved}
            className="text-red-600 hover:text-red-700 cursor-pointer transition"
            title="Очистити список"
          >
            <img src={trash} alt="Clear wishlist" className="w-5 h-5" />
          </button>
        </div>

        {saved.length > 0 ? (
          <div className="relative h-auto overflow-y-auto pr-2 space-y-4">
            {saved.map((product) => (
              <div
                key={product.product_id}
                className="flex items-center gap-4 border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <img
                  src={`data:image/jpg;base64,${product.image}`}
                  alt={product.name}
                  className="w-[100px] h-[80px] rounded object-contain"
                />

                <div className="flex-1">
                  <h4 className="text-base font-semibold text-gray-800">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Код:</span> {product.article}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Ціна:</span> {product.price} $
                  </p>
                </div>

                <button
                  onClick={() => removeFromSaved(product.product_id)}
                  className="text-red-500 hover:text-red-700 cursor-pointer transition"
                  title="Видалити товар"
                >
                  <img src={trash} alt="Remove item" className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[300px]">
            <div className="text-center text-gray-500 text-lg">
              Ви не додали жодного товару
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
