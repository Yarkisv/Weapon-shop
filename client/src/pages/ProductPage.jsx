import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  NavLink,
  Routes,
  Route,
} from "react-router-dom";
import Header from "../components/Header";
import AboutProductContainer from "../components/AboutProductContainer";
import ProductCharacteristics from "../components/ProductCharacteristics";
import ReviewContainer from "../components/ReviewsContainer";
import axios from "axios";
import Breadcrumbs from "../components/BreadCrumbs";
import Footer from "../components/Footer";

export default function ProductPage() {
  const [product, setProduct] = useState({});
  const [ setErrorMessage] = useState("");
  const { name, category } = useParams();
  const decodedName = decodeURIComponent(name);

  const API = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchProductByName = async () => {
      try {
        const response = await axios.get(
          `${API}/catalog/${category}/${decodedName}`
        );
        if (response.status === 200) {
          setProduct(response.data.product[0]);
        }
        if (response.status === 404) {
          setErrorMessage("Product not found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductByName();
  }, [category, name]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="w-full max-w-[1440px] px-4 mx-auto flex flex-col">
        <Breadcrumbs />

        <div className="flex flex-wrap gap-4 font-[Liberation_Sans] text-[18px] mt-2 pb-1">
          <NavLink
            to={`/catalog/${category}/${name}`}
            end
            className={({ isActive }) =>
              isActive
                ? "text-black font-bold border-b-2 border-black cursor-default"
                : "text-gray-500 hover:text-black"
            }
          >
            Про товар
          </NavLink>
          <NavLink
            to={`/catalog/${category}/${name}/characteristics`}
            className={({ isActive }) =>
              isActive
                ? "text-black font-bold border-b-2 border-black cursor-default"
                : "text-gray-500 hover:text-black"
            }
          >
            Характеристики
          </NavLink>
          <NavLink
            to={`/catalog/${category}/${name}/reviews`}
            className={({ isActive }) =>
              isActive
                ? "text-black font-bold border-b-2 border-black cursor-default"
                : "text-gray-500 hover:text-black"
            }
          >
            Відгуки
          </NavLink>
        </div>

        <div className="product-page-main transition-opacity">
          <Routes>
            <Route
              path="/"
              element={<AboutProductContainer product={product} />}
            />
            <Route
              path="characteristics"
              element={<ProductCharacteristics product={product} />}
            />
            <Route
              path="reviews"
              element={<ReviewContainer product={product} />}
            />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}
