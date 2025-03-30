import { useState } from 'react';
import Sidebar from '../Components/Sidebar';
// import UploadDocuments from './UploadDocuments';
// import CheckDocuments from './CheckDocuments';

export default function UserProfile() {
    const [selectedPage, setSelectedPage] = useState('upload');

    return (
        <div className="flex">
            <Sidebar onSelect={setSelectedPage} />
            <div className="flex-1 p-4">
                {/* {selectedPage === 'upload' && <UploadDocuments />}
                {selectedPage === 'check' && <CheckDocuments />} */}
            </div>
        </div>
    );
}
