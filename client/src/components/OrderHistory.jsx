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
    <div>
      <h2 className="text-xl ml-[19px] font-semibold mb-4">
        Історія замовлень
      </h2>
      <div className="ml-[19px] mt-[19px] w-full max-w-[1015px] max-h-[660px] border border-[#585858] bg-white rounded-lg p-4">
        <div className="space-y-4 overflow-y-auto max-h-[540px] pr-2 scrollbar-thin scrollbar-thumb-gray-500">
          {orders.map((order) => (
            <div
              key={order.order_item_id}
              className="flex justify-between items-center border-b border-[#e0e0e0] py-3"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`data:image/jpg;base64,${order.product_image}`}
                  className="w-[100px] h-[100px] rounded object-contain bg-gray-200"
                />
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{order.product_name}</p>
                  <p className="text-sm text-gray-500">
                    Кількість: {order.product_quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    Дата: {order.order_date}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold">{order.product_price} ₴</p>
                <p
                  className={`text-sm ${
                    order.status === "Доставлено"
                      ? "text-green-500"
                      : order.status === "В обробці"
                      ? "text-orange-500"
                      : "text-red-500"
                  }`}
                ></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
