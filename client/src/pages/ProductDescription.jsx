import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

const ProductDes = () => {
  const [activeImg, setActiveImage] = useState("/uploads/products/default.png");
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(3); // Number of reviews to show initially
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  let params = useParams();

  useEffect(() => {
    const productId = params.productId;
    axios
      .get(`/public/products/${productId}`)
      .then((res) => {
        setProductData(res.data.product);
        setActiveImage(
          res.data.product?.images[0]?.image || "uploads/products/default.png"
        );
        setReviews(res.data.product?.reviews || []); // Assuming reviews are part of the product data
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.productId]);

  const addToCart = (productId) => {
    axios
      .post(`/client/cart/${productId}`)
      .then((res) => {
        alert(res.data.message);
        setIsAddedToCart(!isAddedToCart);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShowMore = () => {
    setShowMore(true);
    setReviewCount(reviews.length); // Show all reviews
  };

  const handleShowLess = () => {
    setShowMore(false);
    setReviewCount(3); // Show initial number of reviews
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="bg-pink-400 h-[80px]"></div>
      <div className="w-full lg:pt-16 md:pt-[15%] pt-[20%] pb-[5%] px-[5%] md:px-[9.895833333333333%] flex justify-center min-h-[100vh]">
        <div className="flex flex-col justify-between lg:flex-row gap-16 items-center max-w-7xl">
          <div className="flex flex-col gap-6 lg:w-2/4">
            <img
              src={import.meta.env.VITE_APP_API_URL + activeImg}
              alt={productData?.name}
              className="w-full h-full aspect-square object-cover rounded-xl object-center"
            />
            <div className="grid grid-cols-4 md:gap-4 gap-2 w-full">
              {/* {productData?.images?.map((img, index) => (
                <img
                  key={index}
                  src={import.meta.env.VITE_APP_API_URL + img.image}
                  alt={`Product Image ${index + 1}`}
                  className="w-full md:h-24 h-16 rounded-md cursor-pointer aspect-square object-cover object-center"
                  onClick={() => setActiveImage(img.image)}
                />
              ))} */}
            </div>
          </div>
          {/* Description */}
          <div className="flex flex-col gap-4 lg:w-2/4">
            <div>
              <span className="text-pink-400 font-semibold">
                Product code: {productData?.productCode}
              </span>
              <h1 className="text-3xl font-bold text-pink-600">
                {productData?.name}
              </h1>
            </div>
            <p className="text-gray-700">{productData?.description}</p>
            <h6 className="text-2xl font-semibold">
              Product Price{" "}
              <span className="text-pink-400">LKR {productData?.price}</span>
            </h6>
            <div className="flex flex-row items-center gap-12">
              <div className="flex gap-4 items-center">
                <button
                  type="button"
                  onClick={() => addToCart(productData?.productCode)}
                  className="bg-pink-400 text-white font-semibold py-3 px-8 rounded-xl h-full pl-8"
                >
                  {isAddedToCart ? "Remove from Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-8">
        <div className="w-full max-w-7xl mx-auto px-5">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <div>
            {reviews.slice(0, reviewCount).map((review, index) => (
              <div
                key={index}
                className="bg-white p-4 mb-4 rounded-lg shadow-md"
              >
                {/* review author */}
                <p className="font-medium">
                  {review.user.firstName} {review.user.lastName}
                </p>
                <div className="flex items-center mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500">
                      ★
                    </span>
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <span key={i} className="text-gray-300">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
            {reviews.length > 3 && !showMore && (
              <button
                className="bg-pink-400 text-white px-4 py-2 rounded-lg mt-4"
                onClick={handleShowMore}
              >
                Show More
              </button>
            )}
            {showMore && (
              <>
                <button
                  className="bg-pink-400 text-white px-4 py-2 rounded-lg mt-4"
                  onClick={handleShowLess}
                >
                  Show Less
                </button>
                {reviews.slice(reviewCount).map((review, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 mb-4 rounded-lg shadow-md"
                  >
                    <p className="font-medium">
                      {review.user.firstName} {review.user.lastName}
                    </p>
                    <div className="flex items-center mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-500">
                          ★
                        </span>
                      ))}
                      {[...Array(5 - review.rating)].map((_, i) => (
                        <span key={i} className="text-gray-300">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDes;
