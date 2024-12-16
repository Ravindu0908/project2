import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { resetUserValue } from "../../state/user-slice";

export default function ProfileSidebar() {
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
        className={`fixed top-0 bottom-0 left-0 z-40 flex w-72 flex-col border-r border-r-slate-200 bg-pink-600 transition-transform xl:translate-x-0 ${
          isSideNavOpen ? "translate-x-0" : " -translate-x-full"
        }`}
      >
        <div className="bg-pink-900 rounded-b- flex flex-col items-center gap-4 p-6">
          <div className="shrink-0">
            <a
              href="#"
              className="relative flex h-12 w-12 items-center justify-center rounded-full text-white"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZiZTbJRQ0f6nlMCZATPCcNBmd-fRA0UhhPw&s"
                alt="user name"
                title="user name"
                width="48"
                height="48"
                className="max-w-full rounded-full"
              />
            </a>
          </div>
          <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0 text-center">
            <h4 className="w-full truncate text-lg text-slate-100 font-medium">
              {user?.firstName + " " + user?.lastName}
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
                  href="/beautician"
                  className="flex items-center gap-3 rounded p-3 text-slate-200 transition-colors hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 aria-[current=page]:bg-pink-50 aria-[current=page]:text-pink-500 "
                >
                  <div className="flex items-center self-center text-3xl">
                    <Icon icon="mdi:chart-line" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Dashboard
                  </div>
                </a>
              </li>
              <li className="px-3">
                <a
                  href="/beautician/details"
                  className="flex items-center gap-3 rounded p-3 text-slate-200 transition-colors hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 aria-[current=page]:bg-pink-50 aria-[current=page]:text-pink-500 "
                >
                  <div className="flex items-center self-center text-3xl">
                    <Icon icon="clarity:details-line" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Your Details
                  </div>
                </a>
              </li>
              <li className="px-3">
                <a
                  href="/beautician/appointments"
                  className="flex items-center gap-3 rounded p-3 text-slate-200 transition-colors hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 aria-[current=page]:bg-pink-50 aria-[current=page]:text-pink-500 "
                >
                  <div className="flex items-center self-center text-3xl">
                    <Icon icon="teenyicons:appointments-outline" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Appointments
                  </div>
                </a>
              </li>
              <li className="px-3">
                <a
                  href="/beautician/qr"
                  className="flex items-center gap-3 rounded p-3 text-slate-200 transition-colors hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 aria-[current=page]:bg-pink-50 aria-[current=page]:text-pink-500 "
                >
                  <div className="flex items-center self-center text-3xl">
                    <Icon icon="ic:baseline-qrcode" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    QR Code
                  </div>
                </a>
              </li>
              <li className="px-3">
                <a
                  href="/beautician/leaves"
                  className="flex items-center gap-3 rounded p-3 text-slate-200 transition-colors hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 aria-[current=page]:bg-pink-50 aria-[current=page]:text-pink-500 "
                >
                  <div className="flex items-center self-center text-3xl">
                    <Icon icon="lsicon:user-leave-outline" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Apply Leave
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div className="p-3 text-white">
            <div className="flex items-center gap-3 rounded p-3 text-slate-200 transition-colors hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 aria-[current=page]:bg-pink-50 aria-[current=page]:text-pink-500">
              <div className="flex items-center text-3xl">
                <Icon icon="pajamas:status-closed" />
              </div>
              <span className=""> Account Status</span>
            </div>
            <p className="p-3 mx-10 text-green-200 font-bold rounded-2xl">
              {user?.beautician?.isApproved.replaceAll("_", " ")}
            </p>
            <a href="/beautician/update-password">
              <div className="flex items-center gap-3 rounded p-3 text-slate-200 transition-colors hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 aria-[current=page]:bg-pink-50 aria-[current=page]:text-pink-500">
                <div className="flex items-center text-3xl">
                  <Icon icon="ph:password-fill" />
                </div>
                <span className=""> Password Reset</span>
              </div>
            </a>
          </div>
        </nav>

        <footer className="bg-pink-900 p-3 rounded-t-2xl flex ">
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
          <a
            href="/"
            className="flex items-center gap-3 rounded p-3 text-slate-100 transition-colors hover:text-pink-300 "
          >
            <div className="flex items-center self-center text-3xl">
              <Icon icon="material-symbols:home" />
            </div>
            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm font-medium ">
              Home
            </div>
          </a>
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
