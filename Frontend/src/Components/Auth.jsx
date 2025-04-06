import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import Content from './Content';
import { useState } from 'react';

export default function Auth({ type }) {
    const navigate = useNavigate();
    const [fields, setFields] = useState({
        username: "",
        name: "",
        email: "",
        userType: "",
        password: ""
    });
    const [error, setError] = useState("");

    // Handle Signup
    const handleSignup = async () => {
        try {
            const response = await fetch("http://localhost:5050/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fields)
            });

            const data = await response.json();

            if (response.ok) {
                navigate("/signin"); // Redirect to Sign-in page
            } else {
                setError(data.message || "Signup failed. Try again.");
            }
        } catch (err) {
            setError("Network error. Please check your connection.");
        }
    };

    // Handle Signin
    const handleSignin = async () => {
        try {
            const response = await fetch("http://localhost:5050/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: fields.username, password: fields.password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                localStorage.setItem("username", fields.username);
                if(data.role === "receiver") {
                    navigate("/receiver/dashboard")
                }

                if(data.role === "issuer") {
                    navigate("/issuer/dashboard")
                }

                if(data.role === "verifier") {
                    navigate("/verifier/dashboard")
                }

                // navigate(`/${data.role}`); // Redirect based on role
            } else {
                setError(data.message || "Invalid credentials. Please try again.");
            }
        } catch (err) {
            setError("Network error. Please check your connection.");
        }
    };

    return (
        <div className="h-screen flex justify-center flex-col items-center bg-amber-100">
            {/* Title */}
            <div className="font-bold text-2xl">
                {type === 'signup' ? "Create an account" : "Enter your Details"}
            </div>

            {/* Toggle Signin/Signup */}
            <div className="flex bg-orange-400 rounded-sm p-2">
                <div className="text-black">
                    {type === 'signup' ? "Already have an account?" : "Don't have an account?"}
                </div>
                <div className="underline cursor-pointer pl-1 pr-2 text-white hover:font-medium">
                    <Link to={type === "signup" ? '/signin' : '/signup'}>
                        {type === "signup" ? 'Signin' : 'Signup'}
                    </Link>
                </div>
            </div>

            <br /><br />

            {/* Signup Fields */}
            {type === 'signup' && (
                <>
                    <Content title="Username" placeholder="Enter your username" type="text"
                        onChange={(e) => setFields({ ...fields, username: e.target.value })} />
                    <br />

                    <Content title="Full Name" placeholder="Enter your name" type="text"
                        onChange={(e) => setFields({ ...fields, name: e.target.value })} />
                    <br />

                    <Content title="Email" placeholder="xyz@example.com" type="email"
                        onChange={(e) => setFields({ ...fields, email: e.target.value })} />
                    <br />

                    {/* Role Selection */}
                    <div className="w-full flex justify-center flex-col items-center">
                        <label className="font-bold text-lg w-full text-left">Role</label>
                        <select className="border border-orange-400 rounded-lg w-64 h-10 pl-2 hover:bg-white 
                            hover:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            value={fields.userType}
                            onChange={(e) => setFields({ ...fields, userType: e.target.value })}>
                            <option value="" disabled>Select a role</option>
                            <option value="issuer">Issuer</option>
                            <option value="receiver">Receiver</option>
                            <option value="verifier">Verifier</option>
                        </select>
                    </div>
                    <br />
                </>
            )}

            {/* Signin Fields */}
            {type === "signin" && (
                <>
                    <Content title="Username" placeholder="Enter your username" type="text"
                        onChange={(e) => setFields({ ...fields, username: e.target.value })} />
                    <br />
                </>
            )}

            {/* Password Field (Common for Signin & Signup) */}
            <Content title="Password" placeholder="******" type="password"
                onChange={(e) => setFields({ ...fields, password: e.target.value })} />
            <br />

            {/* Error Message */}
            {error && <p className="text-red-600">{error}</p>}

            {/* Signup or Signin Button */}
            <Button onClick={type === "signup" ? handleSignup : handleSignin}
                title={type === "signup" ? "Sign-up" : "Sign-in"} />
        </div>
    );
}
