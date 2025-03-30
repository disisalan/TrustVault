import { useState } from "react";
import Sidebar from '../Components/Sidebar';

export default function UploadDocuments() {
    const [selectedType, setSelectedType] = useState("");

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Centered Content */}
            <div className="flex-1 flex justify-center items-center">
                <div className="p-10 bg-white shadow-lg rounded-lg text-center">
                    <h2 className="text-2xl font-bold">Upload Documents</h2>
                    <p className="mt-2 text-gray-600">Select a document type:</p>

                    <select
                        className="border border-gray-400 rounded-lg p-2 mt-2 w-full"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="" disabled>Select file type</option>
                        <option value="jpg">JPG</option>
                        <option value="pdf">PDF</option>
                        <option value="png">PNG</option>
                        <option value="docx">DOCX</option>
                    </select>

                    {selectedType && (
                        <p className="mt-4 text-green-600">You selected: {selectedType.toUpperCase()}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
