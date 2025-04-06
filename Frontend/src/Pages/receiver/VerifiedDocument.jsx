import { useEffect, useState } from 'react';
import Sidebar from '../../Components/SideBar';

export default function VerifiedDocuments() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5050/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.documents) {
          setDocuments(data.documents);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <>
      <Sidebar role={"receiver"} />
      <div className="ml-64 p-8 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Verified Documents</h1>
        <p className="mb-6">This page shows all the verified documents.</p>

        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-indigo-600 text-white text-left">
                <th className="py-3 px-4">Sr. No</th>
                <th className="py-3 px-4">Document Name</th>
                <th className="py-3 px-4">Issuer ID</th>
                <th className="py-3 px-4">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {documents.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No verified documents found.
                  </td>
                </tr>
              ) : (
                documents
                  .filter((doc) => doc.status === "completed") // 👈 filter only completed documents
                  .map((doc, index) => (
                    <tr key={doc.document_id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{doc.document_name}</td>
                      <td className="py-3 px-4">{doc.issuer_id}</td>
                      <td className="py-3 px-4">{doc.document_id}</td>
                    </tr>
                  ))
              )
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
