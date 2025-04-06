import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uname, setUname] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    if (storedUsername) {
      setUname(storedUsername);
    }

    const fetchDocuments = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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

    fetchDocuments();
  }, []);

  return (
    <>
      <Sidebar />

      <div className="ml-64 p-8 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <h2 className="text-xl mb-4">Hello, {uname}</h2>

        {loading && <p className="text-gray-600">Loading documents...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.length === 0 ? (
              <p>No documents available.</p>
            ) : (
              documents.map((doc) => (
                <div
                  key={doc.document_id}
                  className="p-4 border rounded-lg shadow-sm bg-white"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {doc.document_name}
                  </h2>
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
                        {new Date(doc.metadata.issuedDate).toLocaleDateString()}
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
                  <p className="text-xs text-gray-400 mt-2">
                    Created: {new Date(doc.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}
