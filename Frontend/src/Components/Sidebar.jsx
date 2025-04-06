import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-full bg-indigo-600 text-white p-6 w-64">
      <h2 className="text-2xl font-bold mb-6">User Profile</h2>
      <ul className="space-y-4">
        <li className="p-2 hover:bg-indigo-500 rounded-md cursor-pointer">
          <Link to="/upload">📤 Upload Documents</Link>
        </li>
        <li className="p-2 hover:bg-indigo-500 rounded-md cursor-pointer">
          <Link to="/check">📁 Check Documents</Link>
        </li>
        <li className="p-2 hover:bg-indigo-500 rounded-md cursor-pointer">
          ⚙️ Settings
        </li>
        <li className="p-2 hover:bg-indigo-500 rounded-md cursor-pointer">
          🔓 Logout
        </li>
      </ul>
    </div>
  );
}
