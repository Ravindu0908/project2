import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { resetUserValue } from "../../state/user-slice";

export default function AdminSidebar() {
  const { user } = useSelector((state) => state.user);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    axios.post("/user/logout").then(() => {
      dispatch(resetUserValue());
      navigate("/login");
    });
  };

  return (
    <>
      {/*  <!-- Component: Side navigation menu with user profile and alert message --> */}
      {/*  <!-- Mobile trigger --> */}
      <button
        title="Side navigation"
        type="button"
        className={`visible fixed left-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 xl:hidden ${
          isSideNavOpen
            ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
            : ""
        }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideNavOpen ? " true" : "false"}
        aria-controls="nav-menu-4"
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-200 transition-all duration-300"
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

      {/*  <!-- Side Navigation --> */}
      <aside
        id="nav-menu-4"
        aria-label="Side navigation"
        className={`fixed top-0 bottom-0 left-0 z-40 flex w-72 flex-col border-r border-r-slate-200 bg-pink-500 transition-transform xl:translate-x-0 ${
          isSideNavOpen ? "translate-x-0" : " -translate-x-full"
        }`}
      >
        <div className="bg-pink-300 rounded-b- flex flex-col items-center gap-4 p-6 rounded-b-xl">
          <div className="shrink-0">
            <a
              href="/"
              className="relative flex h-12 w-12 items-center justify-center rounded-full text-white"
            >
              <img
                src="/assets/images/logo/logo.png"
                alt="Ruby Beauty Palor"
                title="Ruby Beauty Palor"
                width="48"
                height="48"
                className="max-w-full rounded-full"
              />
            </a>
          </div>
          <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0 text-center">
            <h4 className="w-full truncate text-lg text-slate-100 font-medium">
              Ruby Beauty Parlour
            </h4>
            <p className="w-full truncate text-xs font-medium text-white">
              {user?.role}
            </p>
          </div>
        </div>
        <nav aria-label="side navigation" className="flex-1 overflow-auto">
          <div>
            <ul className="flex bg-pink-500 flex-1 flex-col gap-1 py-3">
              <li className="px-3">
                <a
                  href="/admin"
                  className="flex items-center gap-3 rounded p-3 text-slate-200 transition-colors hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 aria-[current=page]:bg-pink-50 aria-[current=page]:text-pink-500 "
                >
                  <div className="flex items-center self-center text-3xl">
                    <Icon icon="akar-icons:statistic-up" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Statistic
                  </div>
                </a>
              </li>
              <li className="px-3">
                <a
                  href="/admin/products"
                  className="flex items-center gap-3 rounded p-3 text-slate-200 transition-colors hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 aria-[current=page]:bg-pink-50 aria-[current=page]:text-pink-500 "
                >
                  <div className="flex items-center self-center text-3xl">
                    <Icon icon="icon-park-outline:ad-product" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Product Management
                  </div>
                </a>
              </li>
              <li className="px-3">
                <a
                  href="/admin/services"
                  className="flex items-center gap-3 rounded p-3 text-slate-200 transition-colors hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 aria-[current=page]:bg-pink-50 aria-[current=page]:text-pink-500 "
                >
                  <div className="flex items-center self-center text-3xl">
                    <Icon icon="material-symbols:health-and-beauty-outline" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Services Management
                  </div>
                </a>
              </li>
              <li className="px-3">
                <a
                  href="/admin/packages"
                  className="flex items-center gap-3 rounded p-3 text-slate-200 transition-colors hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 aria-[current=page]:bg-pink-50 aria-[current=page]:text-pink-500 "
                >
                  <div className="flex items-center self-center text-3xl">
                    <Icon icon="ph:package" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Packages Management
                  </div>
                </a>
              </li>
              <li className="px-3">
                <a
                  href="/admin/appointments"
                  className="flex items-center gap-3 rounded p-3 text-slate-200 transition-colors hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 aria-[current=page]:bg-pink-50 aria-[current=page]:text-pink-500 "
                >
                  <div className="flex items-center self-center text-3xl">
                  <Icon icon="teenyicons:appointments-outline" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Appointment Management
                  </div>
                </a>
              </li>
              <li className="px-3">
                <a
                  href="/admin/users"
                  className="flex items-center gap-3 rounded p-3 text-slate-200 transition-colors hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 aria-[current=page]:bg-pink-50 aria-[current=page]:text-pink-500 "
                >
                  <div className="flex items-center self-center text-3xl">
                    <Icon icon="mdi:users" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    User Management
                  </div>
                </a>
              </li>
              <li className="px-3">
                <a
                  href="/admin/orders"
                  className="flex items-center gap-3 rounded p-3 text-slate-200 transition-colors hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 aria-[current=page]:bg-pink-50 aria-[current=page]:text-pink-500 "
                >
                  <div className="flex items-center self-center text-3xl">
                    <Icon icon="material-symbols:payments-outline-rounded" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Order Management
                  </div>
                </a>
              </li>
              <li className="px-3">
                <a
                  href="/admin/request"
                  className="flex items-center gap-3 rounded p-3 text-slate-200 transition-colors hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 aria-[current=page]:bg-pink-50 aria-[current=page]:text-pink-500 "
                >
                  <div className="flex items-center self-center text-3xl">
                    <Icon icon="carbon:intent-request-active" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    New Job Requests
                  </div>
                </a>
              </li>
              <li className="px-3">
                <a
                  href="/admin/leaves"
                  className="flex items-center gap-3 rounded p-3 text-slate-200 transition-colors hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 aria-[current=page]:bg-pink-50 aria-[current=page]:text-pink-500 "
                >
                  <div className="flex items-center self-center text-3xl">
                    <Icon icon="fluent-mdl2:leave-user" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Leaves Management
                  </div>
                </a>
              </li>
              <li className="px-3">
                <a
                  href="/admin/attendence"
                  className="flex items-center gap-3 rounded p-3 text-slate-200 transition-colors hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 aria-[current=page]:bg-pink-50 aria-[current=page]:text-pink-500 "
                >
                  <div className="flex items-center self-center text-3xl">
                    <Icon icon="bx:qr" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Attendence Management
                  </div>
                </a>
              </li>
              <li className="px-3">
                <a
                  href="/admin/salary"
                  className="flex items-center gap-3 rounded p-3 text-slate-200 transition-colors hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 aria-[current=page]:bg-pink-50 aria-[current=page]:text-pink-500 "
                >
                  <div className="flex items-center self-center text-3xl">
                    <Icon icon="mdi:cash" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Salary Management
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div className="p-3 text-white">
            {/* <div className="flex items-center gap-3 rounded p-3 text-slate-200 transition-colors hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 aria-[current=page]:bg-pink-50 aria-[current=page]:text-pink-500">
              <div className="flex items-center text-3xl">
                <Icon icon="pajamas:status-closed" />
              </div>
              <span className=""> Account Status</span>
            </div> */}
            {/* <p className="p-3 mx-10 text-green-200 font-bold rounded-2xl">
              {user?.beautician?.isApproved.replaceAll("_", " ")}
            </p> */}
          </div>
        </nav>

        <footer className="bg-pink-900 p-3 rounded-t-2xl">
          <button
            onClick={logout}
            className="flex items-center gap-3 rounded p-3 text-slate-100 transition-colors hover:text-pink-300 "
          >
            <div className="flex items-center self-center text-3xl">
              <Icon icon="majesticons:logout-half-circle-line" />
            </div>
            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm font-medium ">
              Logout
            </div>
          </button>
        </footer>
      </aside>

      {/*  <!-- Backdrop --> */}
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${
          isSideNavOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      ></div>
      {/*  <!-- End Side navigation menu with user profile and alert message --> */}
    </>
  );
}
