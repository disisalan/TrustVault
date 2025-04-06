import { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';

export default function UserProfile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedPage, setSelectedPage] = useState('profile');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await fetch('http://localhost:5050/api/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch user profile');
                }

                const data = await res.json();
                setUserData(data.user);
                setLoading(false);
            } catch (err) {
                console.error('Error:', err.message);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div className="ml-64 p-8 min-h-screen bg-gray-50">
            <Sidebar onSelect={setSelectedPage} />
            <div className="flex-1 p-8 bg-gray-100">
                <h2 className="text-3xl font-bold mb-6">User Profile</h2>

                {loading ? (
                    <p className="text-blue-500">Loading profile...</p>
                ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : (
                    <div className="bg-white shadow-lg rounded-lg p-6 space-y-4 text-lg">
                        <p><strong>ID:</strong> {userData.id}</p>
                        <p><strong>User ID:</strong> {userData.userId}</p>
                        <p><strong>Username:</strong> {userData.username}</p>
                        <p><strong>Name:</strong> {userData.name}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Role:</strong> {userData.role}</p>
                        <p><strong>Public Key:</strong> {userData.public_key}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
