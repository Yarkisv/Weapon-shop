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

  console.log(orders);

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Історія замовлень
      </h2>

      <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md">
        {orders.length > 0 ? (
          <div className="space-y-4 h-auto overflow-y-auto pr-2">
            {orders.map((order) => (
              <div key={order.order_id}>
                <p>Номер замовлення №{order.order_id}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Дата:</span> {order.order_date}
                </p>
                <p>Спосіб оплати: {order.payment_method}</p>
                <p>Сума замовлення: {order.total_price} ₴</p>
                {order.items.map((item) => (
                  <div
                    key={item.order_item_id}
                    className="flex justify-between items-center border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={`data:image/jpg;base64,${item.product_image}`}
                        className="w-[100px] h-[80px] rounded object-contain bg-gray-200"
                      />
                      <div>
                        <p className="text-base font-semibold text-gray-800">
                          {item.product_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Кількість:</span>{" "}
                          {item.product_quantity}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-base font-bold text-green-700">
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
            <div className="text-center text-gray-500 text-lg">
              У вас ще немає замовлень
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
