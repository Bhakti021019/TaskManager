'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    email: '',
    phone: '',
    role: '',
    profilePicture: '',
  });
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      fetch(`http://localhost:5000/api/users/${storedUsername}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setUserData(data);
          }
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData((prev) => ({ ...prev, profilePicture: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (res.ok) alert('Profile updated!');
      else alert('Failed to update profile.');
    } catch (err) {
      console.error(err); // ✅ Now using `err`
      alert('Server error');
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border rounded"
            value={userData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            className="w-full p-2 border rounded"
            value={userData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium">Role</label>
          <input
            type="text"
            name="role"
            className="w-full p-2 border rounded"
            value={userData.role}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium">Profile Picture</label>
          {userData.profilePicture && (
            <div className="mb-2 relative w-24 h-24">
              <Image
                src={userData.profilePicture}
                alt="Profile"
                className="rounded-full object-cover"
                fill
              />
            </div>
          )}
          <input type="file" onChange={handleProfilePicChange} />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
