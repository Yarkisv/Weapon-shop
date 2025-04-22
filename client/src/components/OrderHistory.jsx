import React from "react";

export default function OrderHistory() {
  const orders = [
    {
      id: 1,
      item: "Пистолет Glock 17",
      quantity: 1,
      price: 500,
      status: "Доставлено",
      date: "2025-04-18",
      image: "kartinka",
    },
    {
      id: 7,
      item: "Пистолет Glock 17",
      quantity: 1,
      price: 500,
      status: "Доставлено",
      date: "2025-04-18",
      image: "kartinka",
    },
    {
      id: 2,
      item: "Автомат АК-47",
      quantity: 2,
      price: 1500,
      status: "В обробці",
      date: "2025-04-15",
      image: "kartinka",
    },
    {
      id: 3,
      item: "Снайперская винтовка Barrett M82",
      quantity: 1,
      price: 3000,
      status: "Доставлено",
      date: "2025-04-10",
      image: "kartinka",
    },
    {
      id: 8,
      item: "Снайперская винтовка Barrett M82",
      quantity: 1,
      price: 3000,
      status: "Доставлено",
      date: "2025-04-10",
      image: "kartinka",
    },
  ];

  return (
    <div>
      <h2 className="text-xl ml-[19px] font-semibold mb-4">
        Історія замовлень
      </h2>
      <div className="ml-[19px] mt-[19px] w-full max-w-[1015px] max-h-[660px] border border-[#585858] bg-white rounded-lg p-4">
        {/* Контейнер с прокруткой */}
        <div className="space-y-4 overflow-y-auto max-h-[540px] pr-2 scrollbar-thin scrollbar-thumb-gray-500">
          {orders.map((order, index) => (
            <div
              key={`${order.id}-${index}`}
              className="flex justify-between items-center border-b border-[#e0e0e0] py-3"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={order.image}
                  alt={order.item}
                  className="w-[100px] h-[100px] rounded object-contain bg-gray-200"
                />
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{order.item}</p>
                  <p className="text-sm text-gray-500">
                    Кількість: {order.quantity}
                  </p>
                  <p className="text-sm text-gray-500">Дата: {order.date}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold">{order.price} ₴</p>
                <p
                  className={`text-sm ${
                    order.status === "Доставлено"
                      ? "text-green-500"
                      : order.status === "В обробці"
                      ? "text-orange-500"
                      : "text-red-500"
                  }`}
                >
                  {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
