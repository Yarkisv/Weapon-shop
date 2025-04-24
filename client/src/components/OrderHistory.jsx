import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3000/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.log("Error: " + error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Історія замовлень
      </h2>

      <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md">
        {orders.length > 0 ? (
          <div className="space-y-4 h-auto overflow-y-auto pr-2">
            {orders.map((order) => (
              <div
                key={order.order_item_id}
                className="flex justify-between items-center border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`data:image/jpg;base64,${order.product_image}`}
                    alt={order.product_name}
                    className="w-[100px] h-[80px] rounded object-contain bg-gray-200"
                  />
                  <div>
                    <p className="text-base font-semibold text-gray-800">
                      {order.product_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Кількість:</span>{" "}
                      {order.product_quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Дата:</span>{" "}
                      {order.order_date}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-base font-bold text-green-700">
                    {order.product_price} ₴
                  </p>
                  <p
                    className={`text-sm font-semibold mt-1 ${
                      order.status === "Доставлено"
                        ? "text-green-600"
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
        ) : (
          <div className="flex justify-center items-center h-[300px]">
            <div className="text-center text-gray-500 text-lg">
              У вас ще немає замовлень
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
