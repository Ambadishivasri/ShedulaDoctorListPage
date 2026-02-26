"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
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

  const handleVerify = () => {
    const storedOtp = localStorage.getItem("generatedOtp");

    if (otp === storedOtp) {
      alert("OTP verified successfully");
      router.push("/dashboard");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="otp-wrapper">
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

      <p className="resend-text">
        Resend code in <span>{timer}</span> s
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
      <div className="keypad">
   ...
</div>

<div className="otp-footer-space"></div>
    </div>
  );
}