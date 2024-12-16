import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/cards/ProductsCard";
import axios from "axios";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    axios
      .get("/public/products")
      .then((res) => {
        setProductData(res.data.products);
        setCartData(res.data.cart);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const addToCart = async (productId) => {
    await axios
      .post(`/client/cart/${productId}`)
      .then(async (res) => {
        toast.success(res.data.message);
        await loadProducts();
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error(
            "An error occurred while adding the product to the cart."
          );
        }
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <PageHeader title="We have collected for you the Most popular and Effective Beauty Products" />
      <div>
        <div>
          <ul className="max-w-[1835px] grid md:grid-cols-2 xl:grid-cols-4 gap-4 px-[5%] md:px-[10%] pb-[4%] pt-8">
            {productData.map((item, index) => (
              <li key={index}>
                <ProductCard
                  cartIds={cartData}
                  name={item.name}
                  cover_image={
                    import.meta.env.VITE_APP_API_URL + item.images[0]?.image ||
                    "uploads/products/default.png"
                  }
                  description={item.description}
                  price={item.price}
                  id={item.productCode}
                  addToCart={addToCart}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Product;
