export default function Partners() {
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-semibold mb-4">Співпраця з нами</h1>
        <p className="text-gray-700 mb-6">
          Ми відкриті до партнерств! Якщо ви — бренд, постачальник або маєте
          цікаву ідею, зв’яжіться з нами.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Переваги партнерства:</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Збільшення впізнаваності бренду</li>
              <li>Спільні маркетингові кампанії</li>
              <li>Доступ до нашої клієнтської бази</li>
              <li>Гнучкі умови співпраці</li>
            </ul>
          </div>

          <div className="border rounded-xl p-4 shadow-sm bg-gray-50">
            <h2 className="text-lg font-medium mb-3">Залишити заявку</h2>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Ваше ім’я"
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-md"
              />
              <textarea
                placeholder="Коротко про вашу пропозицію"
                className="w-full px-3 py-2 border rounded-md"
                rows={4}
              />
              <button
                type="submit"
                className="w-full bg-black hover:bg-neutral-800 text-white py-2 rounded-md"
              >
                Надіслати
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
