import Header from "../components/Header/Header";
import Footer from "../components/Footer";

export default function PaymentPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-green-900 mb-6">
          Оплата замовлення
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-green-800">
          <p className="text-lg text-gray-800 mb-6">
            Введіть дані своєї картки для завершення оплати:
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Номер картки
              </label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Термін дії
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  CVV
                </label>
                <input
                  type="password"
                  placeholder="***"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Ім'я власника картки
              </label>
              <input
                type="text"
                placeholder="піпа"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-green-700 hover:bg-green-800 cursor-pointer text-white py-3 rounded-md text-lg font-semibold transition"
            >
              Оплатити зараз
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
