"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = (message: string) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  const [timer, setTimer] = useState(55);
  const [maskedValue, setMaskedValue] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const loginValue = localStorage.getItem("userLoginValue");

    if (loginValue) {
      if (loginValue.includes("@")) {
        // Mask Email
        const parts = loginValue.split("@");
        const namePart = parts[0];
        const domain = parts[1];

        const masked =
          namePart.substring(0, 2) +
          "******@" +
          domain;

        setMaskedValue(masked);
      } else {
        // Mask Phone
        const masked =
          "+91 " +
          loginValue.substring(0, 3) +
          " ******" +
          loginValue.substring(loginValue.length - 2);

        setMaskedValue(masked);
      }
    }

    return () => clearInterval(interval);
  }, []);

  const handleClick = (num: string) => {
    if (otp.length < 4) {
      setOtp(otp + num);
    }
  };

  const handleDelete = () => {
    setOtp(otp.slice(0, -1));
  };

  // NEW: handle resend click (you can later add real resend logic)
  const handleResendOtp = () => {
    if (timer > 0) {
      openPopup("Please wait until the timer finishes before resending the code.");
      return;
    }
    // Example behavior: reset timer and show message
    setTimer(55);
    openPopup("A new OTP has been sent.");
  };

  const handleVerify = () => {
  const storedOtp = localStorage.getItem("generatedOtp");

  if (!otp || otp.length < 4) {
    openPopup("Please enter the full 4-digit OTP.");
    return;
  }

  if (otp === storedOtp) {
    openPopup("OTP verified successfully");

    const role = localStorage.getItem("userRole");

    // Give a small delay so user sees the success popup
    setTimeout(() => {
      if (role === "patient") {
        window.location.href = "http://localhost:3000/dashboard";
      } else if (role === "doctor") {
        window.location.href = "http://localhost:3001/dashboard";
      } else if (role === "admin") {
        window.location.href = "http://localhost:3002/dashboard";
      } else {
        // fallback: if no role found, send to default dashboard
        window.location.href = "http://localhost:3000/dashboard";
      }
    }, 800);
  } else {
    openPopup("Invalid OTP");
  }
};


  return (
    <div className="otp-wrapper">
      {/* POPUP – same style as login, appears on top */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div
            className="popup-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-header">
              <span className="popup-title">Notice</span>
              <span className="popup-close" onClick={closePopup}>
                ×
              </span>
            </div>
            <p className="popup-message">{popupMessage}</p>
            <button className="popup-button" onClick={closePopup}>
              OK
            </button>
          </div>
        </div>
      )}

      <div className="otp-header">
        <span className="back-arrow" onClick={() => router.back()}>
          ←
        </span>
        <h2>OTP Code Verification</h2>
      </div>

      <p className="otp-text">
        Code has been sent to {maskedValue}
      </p>

      <div className="otp-box-container">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`otp-box ${otp.length === index ? "active" : ""}`}
          >
            {otp[index] || ""}
          </div>
        ))}
      </div>

      {/* UPDATED resend text with clickable "Resend" in theme color */}
      <p className="resend-text">
        Didn’t receive OTP?
      </p>
      <p className="resend-text">
        <span
          className="resend-link"
          onClick={handleResendOtp}
        >
          Resend
        </span>{" "}
        code in {timer}s
      </p>

      <button className="verify-btn" onClick={handleVerify}>
        Verify
      </button>

      <div className="keypad">
        {[1,2,3,4,5,6,7,8,9,"*",0,"⌫"].map((key, i) => (
          <button
            key={i}
            className="key"
            onClick={() =>
              key === "⌫"
                ? handleDelete()
                : key !== "*"
                ? handleClick(key.toString())
                : null
            }
          >
            {key}
          </button>
        ))}
      </div>

      {/* your existing extra keypad / content here if needed */}
      <div className="keypad">
        ...
      </div>

      <div className="otp-footer-space"></div>
    </div>
  );
}
