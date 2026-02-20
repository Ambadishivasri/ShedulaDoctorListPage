"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

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
    if (!email && !phone) {
      alert("Enter email or phone");
      return;
    }

    localStorage.setItem("userEmail", email || phone);
    window.location.href = "/dashboard";
  };

  return (
    <main className="page">
      {/* Bubbles */}
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
        {/* Logo Section */}
        <div className="logo">
          <img src="logo.png" alt="Shedula"/>

          <h1>Shedula</h1>
          <span><strong>PearlThoughts</strong></span>
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
            />

            <div className="password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value || "")}
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
                <input type="checkbox" defaultChecked={false} />
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
            <input type="text" placeholder="Full Name" defaultValue="" />

            <input
              type="email"
              placeholder="Email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value || "")}
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone || ""}
              onChange={(e) => setPhone(e.target.value || "")}
            />

            <div className="password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value || "")}
              />
              <span
                className="toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button onClick={() => setIsLogin(true)}>Register</button>

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