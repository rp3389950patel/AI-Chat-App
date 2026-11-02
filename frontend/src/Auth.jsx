
import { useState } from "react";
import "./Auth.css";

function Auth({ onLogin }) {
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const endpoint = isSignup ? "signup" : "signin";

            const response = await fetch(
                `http://localhost:8080/api/auth/${endpoint}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        isSignup
                            ? { name, email, password }
                            : { email, password }
                    ),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            if (isSignup) {
                setMessage("Signup successful! Ab Sign In karo.");
                setIsSignup(false);
                setName("");
                setPassword("");
            } else {
                if (typeof onLogin !== "function") {
                    throw new Error(
                        "onLogin function missing. App.jsx mein <Auth onLogin={handleLogin} /> check karo."
                    );
                }

                if (!data.user || !data.token) {
                    throw new Error("Login response mein user ya token missing hai.");
                }

                onLogin(data.user, data.token);
            }
        } catch (error) {
            setMessage(error.message || "Server se connect nahi ho paya.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h1>Welcome to ChatGPT</h1>
                <p className="auth-subtitle">
                    {isSignup ? "Create your account" : "Sign in to continue"}
                </p>

                {isSignup && (
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                )}

                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password (minimum 8 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    required
                />

                {message && (
                    <p className="auth-message" role="status">
                        {message}
                    </p>
                )}

                <button type="submit" disabled={loading}>
                    {loading
                        ? "Please wait..."
                        : isSignup
                            ? "Sign Up"
                            : "Sign In"}
                </button>

                <p className="auth-switch">
                    {isSignup
                        ? "Already have an account?"
                        : "Don't have an account?"}{" "}
                    <span
                        onClick={() => {
                            setIsSignup(!isSignup);
                            setMessage("");
                        }}
                    >
                        {isSignup ? "Sign In" : "Sign Up"}
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Auth;
