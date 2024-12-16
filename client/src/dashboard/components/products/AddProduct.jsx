/* eslint-disable react/prop-types */
import { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { transferZodErrors } from "../../../utils/transfer-zod-errors";

const AddProduct = ({ closeAddProduct, getProducts }) => {
  const [formData, setFormData] = useState({
    productCode: "",
    name: "",
    description: "",
    stock: "",
    price: "",
    products: [],
  });
  const [dragActive, setDragActive] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file-upload") {
      setFormData({ ...formData, products: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, products: Array.from(e.dataTransfer.files) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("productCode", formData.productCode);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("stock", formData.stock);
    data.append("price", formData.price);
    // Append all files to the form data
    formData.products.forEach((file) => {
      data.append("product", file, file.name);
    });

    axios
      .post("/admin/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert(res.data.message);
        getProducts();
        closeAddProduct();
      })
      .catch((err) => {
        if (err?.response?.data.error) alert(err?.response?.data.error);
        if (err?.response?.data.errors)
          setValidationErrors(
            transferZodErrors(err?.response?.data.errors).error
          );
      });
  };

  return (
    <div className="absolute z-10 top-5 bottom-5 overflow-auto bg-white p-16 sm:mx-auto sm:w-full sm:max-w-4xl shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          {/* Product Code */}
          <div>
            <label
              htmlFor="productCode"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Product Code
            </label>
            <div className="mt-2">
              <input
                id="productCode"
                name="productCode"
                type="text"
                autoComplete="productCode"
                required
                value={formData.productCode}
                onChange={handleChange}
                className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
              />
            </div>
            {/* errors */}
            {validationErrors.productCode && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.productCode}
              </p>
            )}
          </div>
          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Product Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
              />
            </div>
            {/* errors */}
            {validationErrors.name && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.name}
              </p>
            )}
          </div>
          {/* Product Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Product Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                rows={4}
                autoComplete="description"
                required
                value={formData.description}
                onChange={handleChange}
                className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
              />
            </div>
            {/* errors */}
            {validationErrors.description && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.description}
              </p>
            )}
          </div>
          {/* Product Quantity */}
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Product Quantity
            </label>
            <div className="mt-2">
              <input
                id="stock"
                name="stock"
                type="number"
                autoComplete="stock"
                required
                min={0}
                value={formData.stock}
                onChange={handleChange}
                className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
              />
            </div>
            {/* error */}
            {validationErrors.stock && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.stock}
              </p>
            )}
          </div>
          {/* Product Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Product Price
            </label>
            <div className="mt-2">
              <input
                id="price"
                name="price"
                type="text"
                autoComplete="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
              />
            </div>
            {/* error */}
            {validationErrors.price && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.price}
              </p>
            )}
          </div>
          {/* Product Images */}
          <div>
            <label
              htmlFor="product"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Product Images
            </label>
            <div
              className={`mt-2 relative my-6 ${
                dragActive ? "border-pink-600" : "border-pink-300"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                id="id-dropzone01"
                name="file-upload"
                type="file"
                multiple
                accept="image/*"
                max={4}
                className="hidden"
                onChange={handleChange}
              />
              <label
                htmlFor="id-dropzone01"
                className="relative flex cursor-pointer flex-col items-center gap-4 rounded border border-dashed px-3 py-6 text-center text-sm font-medium transition-colors"
              >
                <span className="inline-flex h-12 items-center justify-center self-center rounded-full bg-pink-100/70 px-3 text-slate-400">
                  <Icon icon="ep:upload-filled" className="w-6 h-6" />
                </span>
                <span className="text-slate-500">
                  Drag & drop or
                  <span className="text-pink-500"> upload files</span>
                </span>
              </label>
            </div>
            {formData.products.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Files:</h4>
                <ul className="mt-2 space-y-1">
                  {formData.products.map((file, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4 pt-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg left-2"
            type="submit"
          >
            Add Product
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg left-2"
            onClick={closeAddProduct}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
