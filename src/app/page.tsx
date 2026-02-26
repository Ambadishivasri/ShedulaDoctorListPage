"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const userExists = users.find(
      (u: any) =>
        (u.email === email || u.phone === email) &&
        u.password === password
    );

    if (!userExists) {
      alert("Invalid credentials");
      return;
    }

    // ✅ store name
    localStorage.setItem("userName", userExists.fullName);
    localStorage.setItem("userLoginValue", email);

    // ✅ generate and store OTP (static for now)
    const generatedOtp = "1234";
    localStorage.setItem("generatedOtp", generatedOtp);

    // ✅ redirect to OTP page instead of dashboard
    window.location.href = "/otp";
  };

  const handleRegister = () => {
    if (!fullName || !email || !phone || !password) {
      alert("Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const alreadyExists = users.find(
      (u: any) => u.email === email || u.phone === phone
    );

    if (alreadyExists) {
      alert("Account already exists. Please login.");
      return;
    }

    users.push({ fullName, email, phone, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful. Please login.");
    setIsLogin(true);
  };

  return (
    <main className="page">
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

      <div className="card">
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

        {isLogin ? (
          <div key="login">
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

            <div className="google">Sign in with Google</div>

            <div className="switch">
              Don’t have an account?{" "}
              <a onClick={() => setIsLogin(false)}>Sign Up</a>
            </div>
          </div>
        ) : (
          <div key="signup">
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
    </main>
  );
}