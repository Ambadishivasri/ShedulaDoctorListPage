"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // popup state
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // role state
  const [role, setRole] = useState<"patient" | "doctor" | "admin" | "">("");

  const [bubbles, setBubbles] = useState<
    { left: string; size: string; duration: string }[]
  >([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 15 }).map(() => ({
      left: `${Math.random() * 100}%`,
      size: `${30 + Math.random() * 50}px`,
      duration: `${10 + Math.random() * 10}s`,
    }));
    setBubbles(newBubbles);
  }, []);

  const openPopup = (message: string) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  const handleLogin = () => {
    // field-level validation
    if (!email) {
      openPopup("Please fill the email or phone field.");
      return;
    }
    if (!password) {
      openPopup("Please fill the password field.");
      return;
    }
    if (!role) {
      openPopup("Please select your role (Patient, Doctor, or Admin).");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const userExists = users.find(
      (u: any) =>
        (u.email === email || u.phone === email) && u.password === password
    );

    if (!userExists) {
      openPopup(
        "No account found with these login details. Please register or sign up to continue."
      );
      return;
    }

    // ✅ store name
    localStorage.setItem("userName", userExists.fullName);
    localStorage.setItem("userLoginValue", email);

    // ✅ generate and store OTP (static for now)
    const generatedOtp = "1234";
    localStorage.setItem("generatedOtp", generatedOtp);

    // ✅ store selected role so OTP page can use it later
    localStorage.setItem("userRole", role);

    // ✅ redirect to OTP page
    window.location.href = "/otp";
  };

  const handleRegister = () => {
    // field-level validation for signup
    if (!fullName) {
      openPopup("Please fill the full name field.");
      return;
    }
    if (!email) {
      openPopup("Please fill the email field.");
      return;
    }
    if (!phone) {
      openPopup("Please fill the phone number field.");
      return;
    }
    if (!password) {
      openPopup("Please fill the password field.");
      return;
    }
    if (!role) {
      openPopup("Please select your role (Patient, Doctor, or Admin).");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const alreadyExists = users.find(
      (u: any) => u.email === email || u.phone === phone
    );

    if (alreadyExists) {
      openPopup(
        "An account already exists with this email or phone. Please log in."
      );
      return;
    }

    users.push({ fullName, email, phone, password, role });
    localStorage.setItem("users", JSON.stringify(users));

    openPopup("Registration successful. Please log in.");
    setIsLogin(true);
  };

  return (
    <main className="page enhanced-page">
      <div className="bubble-container">
        {bubbles.map((b, i) => (
          <span
            key={i}
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              animationDuration: b.duration,
            }}
          />
        ))}
      </div>

      <div className="auth-wrapper">
        <div className="card card-soft">
          <div className="logo">
            <img src="logo.png" alt="Shedula" />
            <h1>Shedula</h1>
            <span>
              <strong>PearlThoughts</strong>
            </span>
            <p className="tagline">
              Make your appointments seamless with Shedula.
            </p>
          </div>

          {/* POPUP */}
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

          {/* role selection shared for login + signup */}
          <div className="role-select">
            <span className="role-label">Login / Sign up as:</span>
            <div className="role-options">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="patient"
                  checked={role === "patient"}
                  onChange={() => setRole("patient")}
                />
                Patient
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={role === "doctor"}
                  onChange={() => setRole("doctor")}
                />
                Doctor
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                />
                Admin
              </label>
            </div>
          </div>

          {isLogin ? (
            <div key="login" className="form-section">
              <input
                type="text"
                placeholder="Email or Phone"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value || "")}
                style={{ caretColor: "#000" }}
              />

              <div className="password-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password || ""}
                  onChange={(e) => setPassword(e.target.value || "")}
                  style={{ caretColor: "#000" }}
                />
                <span
                  className="toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              <div className="options">
                <div className="remember">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </div>
                <a>Forgot password?</a>
              </div>

              <button onClick={handleLogin}>Sign In</button>

              <div className="or-separator">
                <span>or</span>
              </div>

              <div className="google">Sign in with Google</div>

              <div className="switch">
                Don’t have an account?{" "}
                <a onClick={() => setIsLogin(false)}>Sign Up</a>
              </div>
            </div>
          ) : (
            <div key="signup" className="form-section">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ caretColor: "#000" }}
              />

              <input
                type="email"
                placeholder="Email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value || "")}
                style={{ caretColor: "#000" }}
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone || ""}
                onChange={(e) => setPhone(e.target.value || "")}
                style={{ caretColor: "#000" }}
              />

              <div className="password-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Password"
                  value={password || ""}
                  onChange={(e) => setPassword(e.target.value || "")}
                  style={{ caretColor: "#000" }}
                />
                <span
                  className="toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              <button onClick={handleRegister}>Register</button>

              <div className="switch">
                Already have an account?{" "}
                <a onClick={() => setIsLogin(true)}>Sign In</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
