import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Toggle Button */}
            <button onClick={() => setIsOpen(true)} className="absolute top-4 left-4 text-indigo-600">
                <Menu size={32} />
            </button>

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full bg-indigo-600 text-white p-6 w-64 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-6">User Profile</h2>
                <ul className="space-y-4">
                    <li className="p-2 hover:bg-indigo-500 rounded-md cursor-pointer">
                        <Link to="/upload">📤 Upload Documents</Link>
                    </li>
                    <li className="p-2 hover:bg-indigo-500 rounded-md cursor-pointer">
                        <Link to="/check">📁 Check Documents</Link>
                    </li>
                    <li className="p-2 hover:bg-indigo-500 rounded-md cursor-pointer">⚙️ Settings</li>
                    <li className="p-2 hover:bg-indigo-500 rounded-md cursor-pointer">🔓 Logout</li>
                </ul>
            </div>
        </>
    );
}
