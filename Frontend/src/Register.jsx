import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    email: "",
    userType: "user", // Default value
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http:/http://localhost:5050/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode:no-cors,
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("User registered successfully!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required className="w-full p-2 border mb-2" />
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border mb-2" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border mb-2" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-2 border mb-2" />
        <select name="userType" value={formData.userType} onChange={handleChange} className="w-full p-2 border mb-4">
          <option value="user">Issuer</option>
          <option value="admin">Receiver</option>
          <option value="admin">Verifier</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
