import { useState } from "react";
import Sidebar from "../../Components/Sidebar";

export default function UploadDocuments() {
  const [receiverId, setReceiverId] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [manualMetadata, setManualMetadata] = useState("");
  const [fileMetadata, setFileMetadata] = useState(null);
  const [manualHash, setManualHash] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [uploadMethod, setUploadMethod] = useState("file"); // 'file' or 'hash'

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      setFileMetadata({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        lastModified: file.lastModified,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (!receiverId) {
        throw new Error("Receiver UUID is required.");
      }

      if (!documentName.trim()) {
        throw new Error("Please enter the document name.");
      }

      const token = localStorage.getItem("token");

      if (uploadMethod === "file") {
        if (!selectedFile) {
          throw new Error("Please select a file to upload.");
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("receiver_id", receiverId);
        formData.append("document_name", documentName);

        if (manualMetadata.trim()) {
          try {
            JSON.parse(manualMetadata);
            formData.append("metadata", manualMetadata);
          } catch (err) {
            throw new Error("Invalid metadata JSON format.");
          }
        }

        const response = await fetch("http://localhost:5050/api/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Upload failed");
        }

        setSuccessMessage("Document uploaded successfully!");
        setSelectedFile(null);
        setFileMetadata(null);
        setManualMetadata("");
        setLiveUrl("");

      } else if (uploadMethod === "hash") {
        if (!manualHash || manualHash.length !== 64) {
          throw new Error("Hash must be a 64-character string.");
        }

        const response = await fetch("/api/documents/hash", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            receiver_id: receiverId,
            document_name: documentName,
            document_hash: manualHash,
            metadata: manualMetadata,
            live_url: liveUrl,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Hash submission failed");
        }

        setSuccessMessage("Document hash recorded successfully!");
        setManualHash("");
        setManualMetadata("");
        setLiveUrl("");
      }

    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="p-8 bg-white shadow-xl rounded-lg w-full max-w-xl"
        >
          <h2 className="text-xl font-bold mb-6 text-center">Upload Document</h2>

          {/* Upload Method Toggle */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Upload Method</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={uploadMethod}
              onChange={(e) => setUploadMethod(e.target.value)}
            >
              <option value="file">Upload File</option>
              <option value="hash">Submit Hash</option>
            </select>
          </div>

          {/* Receiver ID */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Receiver UUID</label>
            <input
              type="text"
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Document Name */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Document Name</label>
            <input
              type="text"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* File Upload */}
          {uploadMethod === "file" && (
            <div className="mb-4">
              <label className="block font-semibold mb-1">Choose File</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full"
                required
              />
            </div>
          )}

          {/* Hash Upload */}
          {uploadMethod === "hash" && (
            <>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Document Hash</label>
                <input
                  type="text"
                  value={manualHash}
                  onChange={(e) => setManualHash(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter 64-character SHA256 hash"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-1">Live Document URL (Optional)</label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </>
          )}

          {/* Metadata JSON */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Metadata (JSON)</label>
            <textarea
              value={manualMetadata}
              onChange={(e) => setManualMetadata(e.target.value)}
              rows={3}
              placeholder='e.g. {"issued_on":"2024-01-01"}'
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Status Messages */}
          {loading && (
            <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded-lg">
              Uploading...
            </div>
          )}

          {successMessage && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg">
              Error: {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold py-2 rounded-lg transition`}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
