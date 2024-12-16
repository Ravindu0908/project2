import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import ProductCardInCart from "../components/cards/ProductsCardInCart";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCart = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch cart items from the server
  const getCart = () => {
    setLoading(true);
    axios
      .get(`/client/cart`)
      .then((res) => {
        setProducts(res.data.cart);
        const initialSelection = res.data.cart.reduce((acc, product) => {
          acc[product.product.id] = {
            quantity: 1,
            selected: false,
          };
          return acc;
        }, {});
        setSelectedProducts(initialSelection);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to fetch cart items.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCart();
  }, []);

  // Handle selection of a product
  const handleSelectProduct = (productId, selected) => {
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [productId]: {
        ...prevSelectedProducts[productId],
        selected,
      },
    }));
  };

  // Handle quantity change for a product
  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [productId]: {
        ...prevSelectedProducts[productId],
        quantity,
      },
    }));
  };

  // Handle placing the order
  const handlePlaceOrder = () => {
    const orderProducts = Object.keys(selectedProducts)
      .filter((productId) => selectedProducts[productId].selected)
      .map((productId) => ({
        productId,
        quantity: selectedProducts[productId].quantity,
      }));
    if (orderProducts.length > 0) {
      // Pass selected products to the delivery info page
      navigate("/delivery-info", { state: { products: orderProducts } });
    } else {
      toast.error("Please select at least one product to place an order");
    }
  };

  // Check if the cart is empty
  const isCartEmpty = products.length === 0;

  return (
    <>
      <Navbar />
      <PageHeader title="Product Cart" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {loading && <div className="text-center">Loading...</div>}
        {isCartEmpty ? (
          <div className="text-center text-lg font-semibold text-red-500 min-h-[30vh] w-screen">
            Your cart is empty.
          </div>
        ) : (
          products.map((product) => (
            <ProductCardInCart
              key={product.id}
              id={product.product.id}
              productId={product?.product?.productCode}
              name={product?.product?.name}
              description={product?.product?.description}
              price={product?.product?.price}
              imageUrl={product?.product?.images[0]?.image}
              quantity={selectedProducts[product.product.id]?.quantity || 1}
              selected={selectedProducts[product.product.id]?.selected || false}
              handleSelectProduct={handleSelectProduct}
              handleQuantityChange={handleQuantityChange}
              getCart={getCart}
            />
          ))
        )}
      </div>
      {!isCartEmpty && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePlaceOrder}
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
          >
            Place Order
          </button>
        </div>
      )}
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
    </>
  );
};

export default ProductCart;
