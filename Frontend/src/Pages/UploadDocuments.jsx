import { useState } from "react";
import Sidebar from "../Components/Sidebar";

export default function UploadDocuments() {
  const [uploadMethod, setUploadMethod] = useState("file");
  const [receiverId, setReceiverId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileMetadata, setFileMetadata] = useState(null);
  const [liveUrl, setLiveUrl] = useState("");
  const [manualHash, setManualHash] = useState("");
  const [manualMetadata, setManualMetadata] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only PDF, PNG, or JPG files are allowed.");
      setSelectedFile(null);
      setFileMetadata(null);
      return;
    }

    setError("");
    setSelectedFile(file);
    setFileMetadata({
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      lastModified: new Date(file.lastModified).toISOString(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!receiverId) {
      alert("Receiver UUID is required.");
      return;
    }

    if (uploadMethod === "file") {
      if (!selectedFile || !fileMetadata || !liveUrl) {
        alert("Please upload a file, generate metadata, and provide the live URL.");
        return;
      }

      console.log("📤 Submitting file-based upload:");
      console.log({
        receiverId,
        fileMetadata,
        liveUrl,
        selectedFile,
      });

    } else if (uploadMethod === "hash") {
      try {
        const parsedMetadata = JSON.parse(manualMetadata);

        if (!manualHash || manualHash.length !== 64) {
          alert("Hash must be a 64-character string.");
          return;
        }

        console.log("📤 Submitting manual hash:");
        console.log({
          receiverId,
          document_hash: manualHash,
          metadata: parsedMetadata,
        });

      } catch (err) {
        alert("Metadata JSON is invalid.");
      }
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
          <h2 className="text-2xl font-bold mb-4">Upload or Hash a Document</h2>

          {/* Receiver UUID */}
          <label className="block text-left font-medium mb-1">Receiver UUID</label>
          <input
            type="text"
            className="w-full border border-gray-400 rounded-lg p-2 mb-4"
            placeholder="e.g., 5e1b1bfa-d6ef-4b17-85ef-0e0e9fc8659b"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            required
          />

          {/* Upload Method Selection */}
          <div className="mb-4">
            <label className="font-semibold">Upload Method:</label>
            <div className="flex gap-4 mt-2">
              <label>
                <input
                  type="radio"
                  value="file"
                  checked={uploadMethod === "file"}
                  onChange={() => setUploadMethod("file")}
                />{" "}
                Upload File
              </label>
              <label>
                <input
                  type="radio"
                  value="hash"
                  checked={uploadMethod === "hash"}
                  onChange={() => setUploadMethod("hash")}
                />{" "}
                Enter Hash
              </label>
            </div>
          </div>

          {/* Upload File Section */}
          {uploadMethod === "file" && (
            <>
              <label className="block text-left font-medium mb-1">Select File (PDF, PNG, JPG)</label>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="w-full mb-3"
              />

              {error && <p className="text-red-500">{error}</p>}

              {fileMetadata && (
                <div className="bg-gray-100 rounded-md p-4 text-left text-sm mt-2">
                  <strong>Metadata:</strong>
                  <pre className="text-xs mt-2">
                    {JSON.stringify(fileMetadata, null, 2)}
                  </pre>
                </div>
              )}

              {/* Document Live URL */}
              <label className="block text-left font-medium mt-4 mb-1">Document Live URL</label>
              <input
                type="url"
                className="w-full border border-gray-400 rounded-lg p-2"
                placeholder="https://yourdomain.com/path-to-document"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
              />
            </>
          )}

          {/* Manual Hash Input Section */}
          {uploadMethod === "hash" && (
            <>
              <label className="block text-left font-medium mt-4 mb-1">Document Hash (64-char)</label>
              <input
                type="text"
                className="w-full border border-gray-400 rounded-lg p-2"
                placeholder="e.g., abcd1234... (64 char SHA-256)"
                value={manualHash}
                onChange={(e) => setManualHash(e.target.value)}
              />

              <label className="block text-left font-medium mt-4 mb-1">Metadata (JSON)</label>
              <textarea
                rows={6}
                className="w-full border border-gray-400 rounded-lg p-2 font-mono text-sm"
                placeholder='{ "name": "Transcript", "date": "2025-04-01" }'
                value={manualMetadata}
                onChange={(e) => setManualMetadata(e.target.value)}
              />

<label className="block text-left font-medium mt-4 mb-1">Document Live URL</label>
              <input
                type="url"
                className="w-full border border-gray-400 rounded-lg p-2"
                placeholder="https://yourdomain.com/path-to-document"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
              />
            </>
          )}

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
