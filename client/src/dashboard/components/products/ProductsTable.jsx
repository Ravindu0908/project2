import { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import UpdateProduct from "./UpdateProduct";

export default function ProductTable({ products, getProducts }) {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const deleteProduct = async () => {
    if (productToDelete) {
      axios
        .delete(`/admin/products/${productToDelete}`)
        .then(() => {
          getProducts();
          setShowDeleteConfirmation(false);
          setProductToDelete(null);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const openUpdatePopup = (product) => {
    setSelectedProduct(product);
    setShowUpdatePopup(true);
  };

  const closeUpdatePopup = () => {
    setShowUpdatePopup(false);
    setSelectedProduct(null);
  };

  const confirmDeleteProduct = (productCode) => {
    setProductToDelete(productCode);
    setShowDeleteConfirmation(true);
  };

  return (
    <>
      {/*<!-- Component: Responsive Table --> */}
      <table
        className="w-full text-left border border-separate rounded border-slate-200"
        cellSpacing="0"
      >
        <tbody>
          <tr>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              Product Code
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              Name
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              Description
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              Price
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              Quantity
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              Actions
            </th>
          </tr>
          {products?.map((product, index) => (
            <tr
              key={index}
              className="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none"
            >
              <td
                data-th="product_code"
                className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "
              >
                {product?.productCode}
              </td>
              <td
                data-th="name"
                className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "
              >
                {product?.name}
              </td>
              <td
                data-th="description"
                className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "
              >
                {product?.description}
              </td>
              <td
                data-th="price"
                className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "
              >
                {product?.price}
              </td>
              <td
                data-th="quantity"
                className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "
              >
                {product?.stock}
              </td>
              <td
                data-th="actions"
                className="before w-[201px] before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-xl transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 justify-between"
              >
                <button
                  onClick={() => openUpdatePopup(product)}
                  className="bg-pink-600 text-red-100 px-2 py-2 rounded-lg mx-1"
                >
                  <Icon icon="dashicons:update" />
                </button>
                <button
                  onClick={() => confirmDeleteProduct(product?.productCode)}
                  className="bg-red-500 text-red-100 px-2 py-2 rounded-lg mx-1"
                >
                  <Icon icon="material-symbols:delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*<!-- End Responsive Table --> */}
      {showUpdatePopup && (
        <div className="absolute sm:mx-auto sm:w-full sm:max-w-8xl max-h-screen bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg flex justify-center">
          <UpdateProduct
            product={selectedProduct}
            closeUpdateProduct={closeUpdatePopup}
            getProducts={getProducts}
          />
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this product?
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={deleteProduct}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
