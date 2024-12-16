import { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import AdminSidebar from "./components/AdminSidebar";
import ProductTable from "./components/products/ProductsTable";
import AddProduct from "./components/products/AddProduct";
import axios from "axios";

const ProductManagement = () => {
  const [isaddProduct, setAddProduct] = useState(false);
  // Initial product data
  const [products, setProducts] = useState([]);

  // get product data
  const getProducts = useCallback(async () => {
    // get product data
    axios
      .get("/public/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  const addProduct = () => {
    setAddProduct(!isaddProduct);
  };
  const closeAddProduct = () => {
    setAddProduct(false);
  };
  return (
    <div>
      <AdminSidebar />
      <div
        className="xl:ml-[287px]"
        style={{
          backgroundImage: "url(/assets/images/bg/bg-2.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="px-8 min-h-screen">
          <div className="flex flex-col items-center min-h-screen">
            <div className="flex justify-end w-full">
              <button
                onClick={addProduct}
                className="flex items-center gap-4 px-4 py-2 bg-white rounded shadow-md my-4 text-pink-900 font-bold"
              >
                <Icon icon="material-symbols:add" />
                Add Product
              </button>
            </div>

            {isaddProduct && (
              <AddProduct
                closeAddProduct={closeAddProduct}
                getProducts={getProducts}
              />
            )}

            <div className="sm:mx-auto sm:w-full sm:max-w-8xl max-h-screen bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg flex justify-center">
              <ProductTable products={products} getProducts={getProducts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
