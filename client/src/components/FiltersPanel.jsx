export default function FiltersPanel({
  isTank,
  isGun,
  isAircraft,
  firstSortPrice,
  secondSortPrice,
  handlePriceConfirmationClicked,
  setFirstSortPrice,
  setSecondSortPrice,
  handleArmorTypeChange,
  handleArmorThicknessChange,
}) {
  return (
    <div className="space-y-4 ">
      <div>
        <span className="text-gray-700 block mb-1 text-sm">Ціна (₴):</span>
        <div className="flex flex-wrap gap-2 items-center mb-2">
          <input
            type="text"
            placeholder="від"
            value={firstSortPrice}
            onChange={(e) => setFirstSortPrice(e.target.value)}
            className="min-w-[80px] max-w-[120px] w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="до"
            value={secondSortPrice}
            onChange={(e) => setSecondSortPrice(e.target.value)}
            className="min-w-[80px] max-w-[120px] w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            className="bg-[#3b5b88] text-white cursor-pointer text-sm px-3 py-1 rounded hover:bg-[#2e486c] transition"
            onClick={handlePriceConfirmationClicked}
          >
            OK
          </button>
        </div>
      </div>

      {isTank && (
        <aside className="space-y-6 mt-6">
          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">Тип броні</p>
            <div className="space-y-1">
              {["композитна", "гомогенна", "реактивна"].map((val) => (
                <label
                  key={val}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={val}
                    className="accent-blue-600"
                    onChange={handleArmorTypeChange}
                  />
                  <span>{val}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Товщина броні
            </p>
            <div className="space-y-1">
              {[
                { label: "до 50 мм", value: "50" },
                { label: "до 100 мм", value: "100" },
                { label: "від 100 мм", value: "101" },
              ].map((range) => (
                <label
                  key={range.value}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={range.value}
                    className="accent-blue-600"
                    onChange={handleArmorThicknessChange}
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Екіпаж (осіб)
            </p>
            <div className="space-y-1">
              {[2, 3, 4].map((val) => (
                <label
                  key={val}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input type="checkbox" className="accent-blue-600" />
                  <span>{val}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Потужність двигуна (к.с.)
            </p>
            <div className="space-y-1">
              {["до 700", "701-1000", "понад 1000"].map((label, i) => (
                <label
                  key={i}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input type="checkbox" className="accent-blue-600" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Вага (тонн)
            </p>
            <div className="space-y-1">
              {["до 40", "41-60", "більше 60"].map((label, i) => (
                <label
                  key={i}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input type="checkbox" className="accent-blue-600" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Калібр гармати (мм)
            </p>
            <div className="space-y-1">
              {["до 100", "101-120", "більше 120"].map((label, i) => (
                <label
                  key={i}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input type="checkbox" className="accent-blue-600" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Обертання башти (град/сек)
            </p>
            <div className="space-y-1">
              {["до 20", "21-25", "більше 25"].map((label, i) => (
                <label
                  key={i}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input type="checkbox" className="accent-blue-600" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Тип трансмісії
            </p>
            <div className="space-y-1">
              {["механічна", "автоматична"].map((val) => (
                <label
                  key={val}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={val}
                    className="accent-blue-600"
                  />
                  <span>{val}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>
      )}

      {isGun && (
        <aside className="space-y-6 mt-6">
          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">Калібр</p>
            <div className="space-y-1">
              {[1, 2, 3, 4].map((val) => (
                <label
                  key={val}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={val}
                    className="accent-blue-600"
                  />
                  <span>{val} Калібр</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Наявність (stock)
            </p>
            <div className="space-y-1">
              {["stock1", "stock2"].map((val) => (
                <label
                  key={val}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="kbType"
                    value={val}
                    className="accent-blue-600"
                  />
                  <span>{val}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Тип прикладу (stock type)
            </p>
            <div className="space-y-1">
              {["Тип A", "Тип B"].map((val, idx) => (
                <label
                  key={idx}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="connectionType"
                    value={val}
                    className="accent-blue-600"
                  />
                  <span>{val}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">Вага (кг)</p>
            <div className="space-y-1">
              {["до 1 кг", "1-3 кг", "більше 3 кг"].map((label, i) => (
                <label
                  key={i}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input type="checkbox" className="accent-blue-600" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Довжина (см)
            </p>
            <div className="space-y-1">
              {["до 30 см", "31-40 см", "більше 40 см"].map((label, i) => (
                <label
                  key={i}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input type="checkbox" className="accent-blue-600" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">Колір</p>
            <div className="space-y-1">
              {["Black", "FDE", "Coyote", "Wood"].map((color) => (
                <label
                  key={color}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input type="checkbox" className="accent-blue-600" />
                  <span>{color}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Тип магазину
            </p>
            <div className="space-y-1">
              {[
                "Вбудований",
                "Знімний магазин",
                "Коробчатий магазин",
                "Барабанний магазин",
                "Однорядний магазин",
                "Дворядний магазин",
                "Касетний магазин",
              ].map((type) => (
                <label
                  key={type}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input type="checkbox" className="accent-blue-600" />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>
      )}

      {isAircraft && (
        <aside className="space-y-6 mt-6">
          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Тип двигуна
            </p>
            <div className="space-y-1">
              {[
                "поршневий",
                "реактивний",
                "турбореактивний",
                "турбовентиляторний",
              ].map((type) => (
                <label
                  key={type}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input type="checkbox" className="accent-blue-600" />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Кількість двигунів
            </p>
            <div className="space-y-1">
              {[1, 2, 3, 4].map((val) => (
                <label
                  key={val}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input type="checkbox" className="accent-blue-600" />
                  <span>{val}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Максимальна швидкість (км/год)
            </p>
            <div className="space-y-1">
              {["до 800", "801-1500", "понад 1500"].map((label, idx) => (
                <label
                  key={idx}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input type="checkbox" className="accent-blue-600" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Дальність польоту (км)
            </p>
            <div className="space-y-1">
              {["до 1000", "1001-2000", "понад 2000"].map((label, idx) => (
                <label
                  key={idx}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input type="checkbox" className="accent-blue-600" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Максимальна висота (м)
            </p>
            <div className="space-y-1">
              {["до 12000", "12001-16000", "понад 16000"].map((label, idx) => (
                <label
                  key={idx}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input type="checkbox" className="accent-blue-600" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Швидкість набору висоти (м/сек)
            </p>
            <div className="space-y-1">
              {["до 50", "51-100", "понад 100"].map((label, idx) => (
                <label
                  key={idx}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input type="checkbox" className="accent-blue-600" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Радіус дії радара (км)
            </p>
            <div className="space-y-1">
              {["до 100", "101-150", "понад 150"].map((label, idx) => (
                <label
                  key={idx}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input type="checkbox" className="accent-blue-600" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Розмах крил (м)
            </p>
            <div className="space-y-1">
              {["до 10", "10-15", "понад 15"].map((label, idx) => (
                <label
                  key={idx}
                  className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                >
                  <input type="checkbox" className="accent-blue-600" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
