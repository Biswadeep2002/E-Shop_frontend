import React from "react";
import { FiAlertCircle, FiX, FiZap } from "react-icons/fi";
import { useServerStatus } from "../../context/ServerStatusContext";

const ServerWakeupBanner = () => {
  const {
    serverStatus,
    bannerClosed,
    closeBanner,
    openBanner,
  } = useServerStatus();

  // Remove both banner and floating button once server is ready.
  if (serverStatus === "ready" || serverStatus === "checking") {
    return null;
  }

  // User closed the popup.
  if (bannerClosed) {
    return (
      <button
        onClick={openBanner}
        title="Show server status"
        className="
          fixed
          right-5
          bottom-5
          z-[9999]
          bg-slate-800
          text-white
          w-14
          h-14
          rounded-full
          shadow-xl
          flex
          items-center
          justify-center
          hover:bg-slate-700
          hover:scale-105
          transition-all
          duration-300
        "
      >
        <FiZap className="text-2xl" />
      </button>
    );
  }

  // Server is waking and popup is open.
  return (
    <div
      className="
        fixed
        top-6
        left-1/2
        -translate-x-1/2
        z-[9999]
        w-[92%]
        max-w-2xl
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-2xl
      "
    >
      {/* Close button */}
      <button
        onClick={closeBanner}
        title="Close"
        className="
          absolute
          right-4
          top-4
          text-slate-500
          hover:text-slate-900
          transition-colors
        "
      >
        <FiX className="text-2xl" />
      </button>

      <div className="flex items-start gap-5 p-7 pr-14">

        {/* Icon */}
        <div
          className="
            flex-shrink-0
            w-14
            h-14
            rounded-full
            bg-slate-100
            flex
            items-center
            justify-center
          "
        >
          <FiAlertCircle className="text-3xl text-slate-700" />
        </div>

        {/* Message */}
        <div className="pt-1">
          <h3 className="font-semibold text-slate-800 text-xl">
            Server may be waking up
          </h3>

          <p className="text-base text-slate-600 mt-2 leading-relaxed">
            This Project is hosted on Render's free tier, so the first
            request after inactivity may take a little longer.
            Please wait for a moment, some requests may take a little longer while the application becomes ready.".
          </p>
        </div>

      </div>
    </div>
  );
};

export default ServerWakeupBanner;