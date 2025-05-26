'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    profilePicture: ''
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios.get(`http://localhost:5000/api/users/${userId}`)
        .then(res => {
          setUser(res.data);
          setFormData({
            username: res.data.username || '',
            email: res.data.email || '',
            role: res.data.role || '',
            profilePicture: res.data.profilePicture || ''
          });
        })
        .catch(err => console.error('Failed to fetch user profile:', err));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, formData);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile.');
    }
  };

  if (!user) return <p className="p-4">Loading profile...</p>;

  return (
    <div className="p-6 bg-white rounded shadow max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium">Role</label>
          <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium">Profile Picture URL</label>
          <input type="text" name="profilePicture" value={formData.profilePicture} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {formData.profilePicture && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Preview:</p>
            <img src={formData.profilePicture} alt="Preview" className="w-20 h-20 object-cover rounded-full" />
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button type="button" onClick={() => router.push('/')} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">← Back to Home</button>
          <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">💾 Save Changes</button>
        </div>
      </form>
    </div>
  );
}

