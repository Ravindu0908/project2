import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUserValue, setUserValue } from "../state/user-slice";

const Navbar = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const loadUser = useCallback(async () => {
    if (user !== null) {
      return;
    }
    if (!user) {
      axios
        .get("/user/me")
        .then(async ({ data }) => {
          dispatch(setUserValue(data.user));
        })
        .catch(() => {
          dispatch(resetUserValue());
        });
    }
  }, [dispatch, user]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Helper function to check if the user role is beautician or admin
  const isRestrictedRole = () => {
    return user?.role === "BEAUTICIAN" || user?.role === "ADMIN";
  };

  return (
    <nav>
      {/* Navbar with CTA */}
      <header
        className={`border-b-1 fixed z-20 w-full text-pink-200 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden ${
          scrollPosition > 100
            ? "text-slate-400 border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5"
            : ""
        }`}
      >
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-[1140px] 2xl:max-w-[1440px]">
          <nav
            aria-label="main navigation"
            className="flex h-[5rem] items-stretch justify-between font-medium"
            role="navigation"
          >
            {/* Brand logo */}
            <div className="shrink-0">
              <a
                href="/"
                className="relative flex h-12 w-12 items-center justify-center rounded-full text-white"
              >
                <img
                  src="/assets/images/logo/logo.png"
                  alt="Ruby Beauty Palor"
                  title="Ruby Beauty Palor"
                  width="40"
                  height="40"
                  className="max-w-full rounded-full pt-8"
                />
              </a>
            </div>
            {/* Mobile trigger */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden ${
                isToggleOpen
                  ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                  : ""
              }`}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>
            {/* Navigation links */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0 lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0 lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-pink-500 focus:text-pink-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="/services"
                >
                  <span>Packages</span>
                </a>
              </li>
              {!isRestrictedRole() && (
                <>
                  <li role="none" className="flex items-stretch">
                    <a
                      role="menuitem"
                      aria-haspopup="false"
                      className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-pink-500 focus:text-pink-600 focus:outline-none focus-visible:outline-none lg:px-8"
                      href="/products"
                    >
                      <span>Products</span>
                    </a>
                  </li>
                  <li role="none" className="flex items-stretch">
                    <a
                      role="menuitem"
                      aria-haspopup="false"
                      className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-pink-500 focus:text-pink-600 focus:outline-none focus-visible:outline-none lg:px-8"
                      href="/beauticians"
                    >
                      <span>Beauticians</span>
                    </a>
                  </li>
                  <li role="none" className="flex items-stretch">
                    <a
                      role="menuitem"
                      aria-haspopup="false"
                      className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-pink-500 focus:text-pink-600 focus:outline-none focus-visible:outline-none lg:px-8"
                      href="/cart"
                    >
                      <span>Cart</span>
                    </a>
                  </li>
                </>
              )}
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-current="page"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-pink-500 focus:text-pink-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="/about-us"
                >
                  <span>About Us</span>
                </a>
              </li>
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-pink-500 focus:text-pink-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="/contact-us"
                >
                  <span>Contact Us</span>
                </a>
              </li>
            </ul>
            <div className="flex">
              <div className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0 mr-4">
                {user ? (
                  <a href={`/${user?.role?.toLowerCase()}`}>
                    <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0 text-center">
                      <h4 className="truncate text-xl flex justify-center items-center text-slate-100 w-10 h-10 rounded-full font-medium bg-pink-600">
                        {user.firstName?.charAt(0).toUpperCase() +
                          user.lastName?.charAt(0).toUpperCase()}
                      </h4>
                    </div>
                  </a>
                ) : (
                  <a href="/login">
                    <button
                      className={`inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-pink-600 px-4 text-base font-medium text-white transition-colors duration-300 hover:bg-pink-500 focus:outline-none ${
                        scrollPosition > 100
                          ? "shadow-md shadow-slate-900/10"
                          : ""
                      }`}
                    >
                      Sign In
                    </button>
                  </a>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>
      {/* End Navbar with CTA */}
    </nav>
  );
};

export default Navbar;
