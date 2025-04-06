import { useState } from "react";
import Sidebar from '../../Components/SideBar';

export default function IssuerDashboard() {
  const [receiverId, setReceiverId] = useState("");
  const [documents, setDocuments] = useState([]);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uname, setUname] = useState("");

  const token = localStorage.getItem("token");

  const handleSearch = async () => {
    if (!receiverId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5050/api/bulkDocuments`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch documents");
      }

      const data = await res.json();
      setDocuments(data.documents || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (docId) => {
    setSelectedDocs((prev) =>
      prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]
    );
  };

  const handleVerify = async () => {
    if (selectedDocs.length === 0) return;
    try {
      const res = await fetch("http://localhost:5050/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ document_ids: selectedDocs }),
      });

      if (!res.ok) {
        throw new Error("Verification failed");
      }

      const data = await res.json();
      alert("Documents verified successfully.");
      handleSearch(); // refresh after verification
      setSelectedDocs([]);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <>
      <Sidebar role="issuer" />
      <div className="ml-64 p-8 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 capitalize">Issuer Dashboard</h1>

        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter Receiver UUID"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            className="border rounded px-4 py-2 w-full max-w-md"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>

        {loading && <p>Loading documents...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {documents.length > 0 && (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents
        .filter(
          (doc) =>
            doc.status &&
            (doc.status.toLowerCase() === "completed" ||
              doc.status.toLowerCase() === "in progress")
        )
        .map((doc) => (
          <div
            key={doc.document_id}
            className="relative p-4 border rounded-lg shadow-sm bg-white"
          >
            <span
              className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full ${
                doc.status?.toLowerCase() === "completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {doc.status || "Pending"}
            </span>

            <h2 className="text-xl font-semibold mb-2">{doc.document_name}</h2>
            <p className="text-sm text-gray-500">
              <strong>Document ID:</strong> {doc.document_id}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Issuer ID:</strong> {doc.issuer_id}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Receiver ID:</strong> {doc.receiver_id}
            </p>
            {doc.metadata && (
              <div className="mt-2">
                <p className="text-sm">
                  <strong>Title:</strong> {doc.metadata.title}
                </p>
                <p className="text-sm">
                  <strong>Issued Date:</strong>{" "}
                  {new Date(doc.metadata.issuedDate || doc.metadata.issued_on).toLocaleDateString()}
                </p>
              </div>
            )}
            {doc.storage_uri && (
              <a
                href={doc.storage_uri}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-blue-500 hover:underline text-sm"
              >
                View Document
              </a>
            )}

            {/* Bigger checkbox only for non-completed status */}
            {doc.status?.toLowerCase() !== "completed" && (
              <div className="absolute right-3 bottom-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 cursor-pointer"
                  checked={selectedDocs.includes(doc.document_id)}
                  onChange={() => toggleSelect(doc.document_id)}
                />
              </div>
            )}
          </div>
        ))}
    </div>

    <button
      onClick={handleVerify}
      className="mt-6 bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700"
    >
      Verify Selected Documents
    </button>
  </>
)}
      </div>
    </>
  );
}
