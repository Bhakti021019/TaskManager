'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Sidebar({ isLoggedIn, handleLogout }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${userId}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        } else {
          console.error('Failed to fetch user:', data.error);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    if (userId) fetchUser();
  }, []);

  return (
    <aside className="w-72 bg-white shadow-md flex flex-col justify-between p-6 h-screen">
      <div>
        <h1
          className="text-3xl font-extrabold text-purple-600 mb-10 cursor-pointer"
          onClick={() => router.push('/')}
        >
          TickIt
        </h1>

        <nav className="flex flex-col gap-5 text-gray-700 font-medium">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => router.push('/tasks/create')}
                className="text-left hover:text-purple-600 transition"
              >
                + Create Task
              </button>
              <button
                onClick={() => router.push('/academics')}
                className="text-left hover:text-purple-600 transition"
              >
                🎓 Academics
              </button>
              <button
                onClick={() => router.push('/experience')}
                className="text-left hover:text-purple-600 transition"
              >
                💼 Experience
              </button>
              <button
                onClick={() => router.push('/skills')}
                className="text-left hover:text-purple-600 transition"
              >
                🛠️ Skills
              </button>
              <button
                onClick={() => router.push('/profile')}
                className="text-left hover:text-purple-600 transition"
              >
                👤 Profile
              </button>
              <button
                onClick={handleLogout}
                className="text-left text-red-500 hover:text-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push('/signin')}
                className="text-left hover:text-purple-600 transition"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="text-left hover:text-purple-600 transition"
              >
                Sign Up
              </button>
            </>
          )}
        </nav>
      </div>

      {isLoggedIn && (
        <div className="mt-10 pt-6 border-t border-gray-200 flex items-center gap-4 p-2 rounded">
          <img
            src={user?.profilePicture || 'https://via.placeholder.com/150'}
            alt="User avatar"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-bold text-gray-800">{user?.username || 'User'}</p>
            <p className="text-sm text-gray-500">{user?.role || 'Role'}</p>
            <p className="text-xs text-gray-400">{user?.email || 'email@example.com'}</p>
          </div>
        </div>
      )}
    </aside>
  );
}
