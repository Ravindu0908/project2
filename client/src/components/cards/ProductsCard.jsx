/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const ProductCard = (props) => {
  const [inCart, setInCart] = useState(false);

  const handleAddToCart = () => {
    props.addToCart(props.id);
    setInCart(true);
  };

  const handleRemoveFromCart = () => {
    props.addToCart(props.id);
    setInCart(false);
  };

  useEffect(() => {
    if (props.cartIds?.includes(props.id)) {
      setInCart(true);
    }
  }, [props.cartIds, props.id]);

  return (
    <div className="bg-white drop-shadow-md rounded-xl transform hover:scale-105 duration-300 hover:shadow-lg">
      <div>
        <img
          className="h-72 md:h-48 w-full object-cover object-center rounded-lg"
          src={props.cover_image}
          alt="Product Image"
        />
        <div className="p-4">
          <h2 className="mb-2 text-lg font-medium text-gray-900">
            {props.name.length > 20
              ? `${props.name.substring(0, 19)}...`
              : props.name}
          </h2>
          <p className="mb-2 text-base text-gray-700">
            {props.description.length > 29
              ? `${props.description.substring(0, 25)}...`
              : props.description}
          </p>
          <div className="flex items-center">
            <p className="text-base font-medium text-gray-500">
              LKR {props.price}
            </p>
            <a
              href={"products/" + props.id}
              className="ml-auto text-base font-medium text-pink-600"
            >
              View Product
            </a>
          </div>
          {inCart ? (
            <button
              onClick={handleRemoveFromCart}
              className="mt-2 w-full bg-red-600 text-white rounded-lg px-4 py-2"
            >
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="mt-2 w-full bg-pink-600 text-white rounded-lg px-4 py-2"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
