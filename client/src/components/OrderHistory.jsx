import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  const API = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${API}/orders`, {
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
    <div className=" mx-auto mt-12 px-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Історія замовлень
      </h2>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
        {orders.length > 0 ? (
          <div className="space-y-8 h-auto overflow-y-auto pr-2">
            {orders.map((order) => (
              <div
                key={order.order_id}
                className="border-b border-gray-200 pb-6"
              >
                <div className="mb-4">
                  <p className="text-xl font-semibold text-gray-800">
                    Номер замовлення №{order.order_id}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Дата:</span>{" "}
                    {order.order_date}
                  </p>
                  <p className="text-sm text-gray-500">
                    Спосіб оплати: {order.payment_method}
                  </p>
                  <p className="text-lg font-bold text-green-700 mt-2">
                    Сума замовлення: {order.total_price} ₴
                  </p>
                </div>
                {order.items.map((item) => (
                  <div
                    key={item.order_item_id}
                    className="flex flex-col md:flex-row justify-between items-center border border-gray-300 rounded-xl p-4 bg-gray-50 mb-4 "
                  >
                    <div className="flex items-center gap-6">
                      <img
                        src={`data:image/jpg;base64,${item.product_image}`}
                        alt={item.product_name}
                        className="w-[120px] h-[100px] rounded-lg object-contain bg-gray-200"
                      />
                      <div>
                        <p className="text-lg font-semibold text-gray-900">
                          {item.product_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Кількість:</span>{" "}
                          {item.product_quantity}
                        </p>
                      </div>
                    </div>

                    <div className="text-right mt-4 md:mt-0">
                      <p className="text-xl font-bold text-green-600">
                        {item.product_price} ₴
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[300px]">
            <div className="text-center text-gray-400 text-xl">
              У вас ще немає замовлень
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
