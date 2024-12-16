/* eslint-disable react/prop-types */
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductCardInCart = (props) => {
  // Function to handle adding/removing a product from the cart
  const addToCart = (productId) => {
    axios
      .post(`/client/cart/${productId}`) // API call to remove the product from the cart
      .then((res) => {
        // Show success message on successful removal
        toast.success(res.data.message);
        return props?.getCart(); // Refresh cart items to reflect changes
      })
      .catch((error) => {
        console.log(error);
        // Show error message if there's an issue with the removal
        toast.error("Failed to remove the product from the cart.");
      });
  };

  return (
    <div className="bg-white drop-shadow-md rounded-xl transform hover:scale-105 duration-300 hover:shadow-lg">
      <div>
        <img
          className="h-72 md:h-48 w-full object-cover object-center rounded-lg"
          src={
            import.meta.env.VITE_APP_API_URL + props.imageUrl || // Use the provided image URL or default image
            "uploads/products/default.png"
          }
          alt="Product Image"
        />
        <div className="p-4">
          <h2 className="mb-2 text-lg font-medium text-gray-900">
            {/* Display product name, truncate if too long */}
            {props.name.length > 20
              ? `${props.name.substring(0, 19)}...`
              : props.name}
          </h2>
          <p className="mb-2 text-base text-gray-700">
            {/* Display product description, truncate if too long */}
            {props.description.length > 29
              ? `${props.description.substring(0, 25)}...`
              : props.description}
          </p>
          <div className="flex items-center">
            <p className="text-base font-medium text-gray-500">
              LKR {props.price} {/* Display product price */}
            </p>
            <Link
              to={"/products/" + props.productId} // Link to product details page
              className="ml-auto text-base font-medium text-pink-600"
            >
              View Product
            </Link>
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={props.quantity} // Display current quantity
              onChange={(e) =>
                props.handleQuantityChange(props.id, parseInt(e.target.value))
              }
              className="mt-1 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              checked={props.selected} // Track if the product is selected
              onChange={(e) =>
                props.handleSelectProduct(props.id, e.target.checked)
              }
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">
              Select for Order
            </label>
          </div>
          <button
            onClick={() => addToCart(props?.productId)} // Call function to remove product from cart
            className="mt-2 w-full bg-pink-600 text-white rounded-lg px-4 py-2"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardInCart;
