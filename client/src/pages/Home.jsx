import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // Import react-slick
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import ProductCard from "../components/cards/ProductsCard";
import axios from "axios";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";

// Helper function to display star rating
const renderStars = (rating) => {
  const totalStars = 5;
  return (
    <div className="flex justify-center mt-2">
      {[...Array(totalStars)].map((star, index) => (
        <span key={index} className="text-pink-500 text-xl">
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

const Home = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);

  const loadProducts = useCallback(async () => {
    axios
      .get("/public/products")
      .then((res) => {
        setProductData(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const loadReviews = useCallback(async () => {
    axios
      .get("/public/reviews")
      .then((res) => {
        setTestimonials(res.data.reviews);
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

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!formData.firstname.trim()) {
      errors.firstname = "First Name is required";
    }
    if (!formData.lastname.trim()) {
      errors.lastname = "Last Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      message: "",
    });
    setFormErrors({
      firstname: "",
      lastname: "",
      email: "",
      message: "",
    });

    console.log("Form submitted:", formData);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <HeroSection />

      {/* Who We Are Section */}
      <div className="flex flex-col items-center justify-center h-[100vh] bg-pink-700">
        <h1 className="text-4xl font-bold text-white">Who We Are?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1140px] m-8">
          <div>
            <img
              src="/assets/images/bg/bg.png"
              alt=""
              className="rounded-l-xl"
            />
          </div>
          <div>
            <p className="text-base text-pink-100 text-justify">
              At Unveil Your Unique Beauty, we believe that everyone deserves to
              feel elegant and confident. Our curated collection of artisanal
              beauty products is crafted with care and passion, ensuring each
              item is a perfect blend of quality and artistry. From luxurious
              skincare to exquisite makeup, our offerings are designed to
              enhance your natural beauty and bring a touch of sophistication to
              your daily routine. Join us in celebrating individuality and
              elegance with products that are as unique as you are. At Unveil
              Your Unique Beauty, we believe that everyone deserves to feel
              elegant and confident. Our curated collection of artisanal beauty
              products is crafted with care and passion, ensuring each item is a
              perfect blend of quality and artistry. From luxurious skincare to
              exquisite makeup, our offerings are designed to enhance your
              natural beauty and bring a touch of sophistication to your daily
              routine. Join us in celebrating individuality and elegance with
              products that are as unique as you are.
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <h1 className="text-4xl font-bold text-pink-500 py-16 text-center">
        Our Products
      </h1>
      <div>
        <ul className="max-w-[1835px] grid md:grid-cols-2 xl:grid-cols-4 gap-4 px-[5%] md:px-[10%] pb-[4%] pt-8">
          {productData.slice(0, 6).map((item, index) => (
            <li key={index}>
              <ProductCard
                name={item.name}
                cover_image={
                  item?.images?.length > 0
                    ? import.meta.env.VITE_APP_API_URL + item.images[0]?.image
                    : "uploads/products/default.png"
                }
                description={item.description}
                price={item.price}
                id={item.productCode}
                addToCart={addToCart}
              />
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-4">
          <Link
            to="/products"
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Show More Products
          </Link>
        </div>
      </div>

      {/* Testimonials Section */}
      {/* <h1 className="text-4xl font-bold text-pink-500 py-16 text-center">
        Customer Testimonials
      </h1>
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-8 text-center">
              <img
                src={"/assets/images/logo/logo.png"}
                alt={
                  testimonial.user?.firstName +
                  " " +
                  testimonial?.user?.lastName
                }
                className="mx-auto rounded-full w-24 h-24 object-cover"
              />
              <p className="mt-4 text-xl text-gray-700 italic">
                &ldquo;{testimonial.comment}&rdquo;
              </p>
              <p className="mt-2 text-pink-500 font-semibold">
                {testimonial.user?.firstName} {testimonial?.user?.lastName}
              </p>
              {renderStars(testimonial.rating)}
            </div>
          ))}
        </Slider>
      </div> */}

      {/* Contact Us Section */}
      <h1 className="text-4xl font-bold text-pink-500 py-8 mt-8 text-center">
        Contact Us
      </h1>
      <div className="pt-[5%] pb-[5%] px-[10%]">
        <div className="sm:mx-auto sm:w-full sm:max-w-8xl shadow-lg bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg p-8">
          <div className="w-full items-center grid lg:grid-cols-2 gap-16">
            <div className="">
              <div className="flex flex-row pb-8">
                <h1 className="text-pink-500 text-4xl font-semibold">
                  Getting in Touch With Us
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="w-full grid lg:grid-cols-2 gap-4 py-[2%]">
                  <input
                    className={`peer block w-full appearance-none rounded-lg border ${
                      formErrors.firstname
                        ? "border-red-500"
                        : "border-pink-400"
                    } bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0`}
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    placeholder="First Name"
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.firstname && (
                    <p className="text-red-500 text-sm">
                      {formErrors.firstname}
                    </p>
                  )}
                  <input
                    className={`peer block w-full appearance-none rounded-lg border ${
                      formErrors.lastname ? "border-red-500" : "border-pink-400"
                    } bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0`}
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    placeholder="Last Name"
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.lastname && (
                    <p className="text-red-500 text-sm">
                      {formErrors.lastname}
                    </p>
                  )}
                </div>
                <div className="py-[2%]">
                  <input
                    className={`peer block w-full appearance-none rounded-lg border ${
                      formErrors.email ? "border-red-500" : "border-pink-400"
                    } bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0`}
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">{formErrors.email}</p>
                  )}
                </div>
                <div className="py-[2%]">
                  <textarea
                    className={`peer block w-full appearance-none rounded-lg border ${
                      formErrors.message ? "border-red-500" : "border-pink-400"
                    } bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0`}
                    name="message"
                    value={formData.message}
                    placeholder="Message"
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.message && (
                    <p className="text-red-500 text-sm">{formErrors.message}</p>
                  )}
                  <button
                    type="submit"
                    className="mt-5 rounded-md bg-pink-500 px-10 py-2 text-white"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            <div className="w-full grid lg:grid-cols-2 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-pink-500 text-xl font-semibold py-4">
                  Kandy
                </h2>
                <p className="text-base text-gray-500">Rest of Address</p>
                <hr className="w-1/2 border-[#8EC2F2]" />
                <div className="w-full flex flex-row justify-start">
                  <p className="font-bold font-md text-gray-500 py-4">
                    Phone:{" "}
                  </p>
                  <p className="font-md text-gray-500 py-4 pl-4">
                    +94 55 123 4567
                  </p>
                </div>
                <div className="w-full flex flex-row justify-start">
                  <p className="font-bold font-md  text-gray-500 pb-4">
                    Email:
                  </p>
                  <p className="font-md text-gray-500 pb-4 pl-4">
                    kandy@ruby.com
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-pink-500 text-xl font-semibold py-4">
                  Colombo
                </h2>
                <p className="text-base text-gray-500">Rest of Address</p>
                <hr className="w-1/2 border-[#8EC2F2]" />
                <div className="w-full flex flex-row justify-start">
                  <p className="font-bold font-md text-gray-500 py-4">
                    Phone:{" "}
                  </p>
                  <p className="font-md text-gray-500 py-4 pl-4">
                    +94 55 123 4567
                  </p>
                </div>
                <div className="w-full flex flex-row justify-start">
                  <p className="font-bold font-md  text-gray-500 pb-4">
                    Email:
                  </p>
                  <p className="font-md text-gray-500 pb-4 pl-4">
                    colombo@ruby.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
      <Footer />
    </div>
  );
};

export default Home;
