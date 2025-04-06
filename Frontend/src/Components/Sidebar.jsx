import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (!storedRole) {
      navigate("/signin"); // redirect if role not found
    } else {
      setRole(storedRole);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const commonClasses = "p-2 hover:bg-indigo-500 rounded-md cursor-pointer";

  const issuerLinks = [
    { to: `/issuer/dashboard`, label: "📊 Dashboard" },
    { to: `/issuer/upload`, label: "🖼️ Upload Documents" },
    // { to: `/issuer/pending`, label: "⏳ Pending List" },
    { to: `/issuer/userProfile`, label: "🧍 Profile" }
  ];

  const receiverLinks = [
    { to: `/receiver/dashboard`, label: "📊 Dashboard" },
    { to: `/receiver/verified`, label: "✅ Verified List" },
    { to: `/receiver/userProfile`, label: "🧍 Profile" }
  ];

  const links = role === "issuer" ? issuerLinks : receiverLinks;

  return (
    <div className="fixed top-0 left-0 h-full bg-indigo-600 text-white p-6 w-64">
      <h2 className="text-2xl font-bold mb-6 capitalize">{role} Dashboard</h2>
      <ul className="space-y-4">
        {links.map((item, index) => (
          <li key={index} className={commonClasses}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
        <li onClick={handleLogout} className={commonClasses}>
          🔒 Logout
        </li>
      </ul>
    </div>
  );
}
