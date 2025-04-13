import React from "react";
import shipment from "../../images/shipment.svg";
import novaPost from "../../images/novaPost.svg";
import buy from "../../images/buy.svg";
import likeOrder from "../../images/likeOrder.svg";
import { useCart } from "../../contexts/cartContext";

export default function AboutProductContainer({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="relative w-full border-t border-black">
      <div className="flex w-[637px] pt-[15px] box-border">
        {product.image ? (
          <img
            className="w-[541px] h-[375px] object-contain border-2 border-gray-300"
            src={`data:image/jpg;base64,${product.image}`}
            alt="product"
          />
        ) : (
          <p>Зображення недоступне</p>
        )}

        <div className="ml-[30px] w-[774px]">
          <div className="w-[774px] cursor-default">
            <p className="text-[25px] text-black m-0 font-sans">
              {product.name}
            </p>
            <p className="text-[20px] text-right pr-[19px] m-0 font-sans">
              Артикль:{product.manufacturer_id}
            </p>
          </div>

          <div className="flex w-full border-t border-black pt-[20px] mr-[5px]">
            <div className="flex flex-col">
              <p className="w-[196px] h-[30px] bg-[#5ECB6B] text-white flex items-center justify-center text-[18px] mt-[5px] m-0 rounded font-sans">
                В наявності
              </p>
              <p className="text-[35px] mt-[17px] text-left font-serif m-0">
                {product.price}$
              </p>
            </div>

            <div className="ml-[20px] text-[18px] font-sans">
              <p className="m-0">Доставка</p>
              <div className="w-[280px] h-[80px] border border-black rounded mt-[5px] box-border">
                <p className="flex items-center gap-[6px] ml-[13px] mt-[10px] m-0">
                  <img src={shipment} /> Самовиіз
                </p>
                <p className="flex items-center gap-[6px] ml-[13px] mt-[10px] m-0">
                  <img src={novaPost} /> Нова пошта
                </p>
              </div>
            </div>

            <div className="flex flex-col w-[217px] ml-[15px] justify-end">
              <button
                onClick={() => addToCart(product)}
                className="bg-[#68e568] text-white text-[25px] font-sans w-[217px] h-[44px] rounded flex items-center justify-center gap-[5px] cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-md"
              >
                <img src={buy} /> В кошик
              </button>

              <div className="flex gap-[10px] mt-[10px]">
                <button className="w-[159px] h-[44px] border border-black rounded flex items-center justify-center text-[20px] font-sans bg-white cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-md">
                  В 1 клік
                </button>
                <button className="w-[48px] h-[44px] border border-black rounded flex items-center justify-center bg-white cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-md">
                  <img src={likeOrder} />
                </button>
              </div>
            </div>
          </div>

          {/* Купують разом */}
          <div className="mt-[10px]">
            <h2 className="text-[22px] font-sans mb-[15px]">Купують разом</h2>
            <div className="flex gap-[20px]">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-[320px] border border-gray-300 rounded p-[10px] flex"
                >
                  <img className="w-[70px] h-[70px] object-contain mr-[10px]" />
                  <div className="flex flex-col justify-between flex-1">
                    <p className="text-[16px] font-sans mb-[5px]">
                      Назва товару
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-[18px] font-serif">100$</p>
                      <button className="bg-[#68e568] text-white text-[14px] px-[10px] py-[6px] rounded transition-transform duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-md">
                        Купити
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Опис і характеристики */}
      <div className="mt-[10px] w-full">
        <h2 className="text-[32px]  font-sans mb-[10px]">Опис товару</h2>
        <p className="text-[16px] font-sans mb-[20px]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam et
          sunt mollitia debitis vero officia modi, maiores, minima unde
          voluptate placeat voluptatum porro rem fugiat earum? Iure sequi nam
          deleniti!
        </p>

        <h3 className="text-[32px] font-sans mb-[10px]">Характеристики</h3>
        <ul className="list-disc list-inside text-[16px] font-sans space-y-[8px]">
          <li className="py-2.5 list-none border-b border-gray-200">
            <strong className="text-gray-800">Калібр:</strong> {product.caliber}
          </li>
          <li className="py-2.5 list-none border-b border-gray-200">
            <strong className="text-gray-800">Вага:</strong> {product.weight} кг
          </li>
          <li className="py-2.5 list-none border-b border-gray-200">
            <strong className="text-gray-800">Довжина:</strong> {product.length}{" "}
            см
          </li>
        </ul>
      </div>
    </div>
  );
}
