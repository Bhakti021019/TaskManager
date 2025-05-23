'use client';
import { useRouter } from 'next/navigation';

export default function Sidebar({ userProfile, isLoggedIn, handleLogout }) {
  const router = useRouter();

  return (
    <aside className="w-72 bg-white shadow-md flex flex-col justify-between p-6">
      <div>
        <h1 className="text-3xl font-extrabold text-purple-600 mb-10">TickIt</h1>
        <nav className="flex flex-col gap-5 text-gray-700 font-medium">
          {isLoggedIn ? (
            <>
              <button onClick={() => router.push('/tasks/create')} className="text-left hover:text-purple-600 transition">+ Create Task</button>
              <button onClick={() => router.push('/academics')} className="text-left hover:text-purple-600 transition">🎓 Academics</button>
              <button onClick={() => router.push('/experience')} className="text-left hover:text-purple-600 transition">💼 Experience</button>
              <button onClick={() => router.push('/skills')} className="text-left hover:text-purple-600 transition">🛠️ Skills</button>
            </>
          ) : (
            <>
              <button onClick={() => router.push('/signin')} className="text-left hover:text-purple-600 transition">Sign In</button>
              <button onClick={() => router.push('/signup')} className="text-left hover:text-purple-600 transition">Sign Up</button>
            </>
          )}
          {isLoggedIn && (
            <button onClick={handleLogout} className="text-left text-red-500 hover:text-red-600 transition">Logout</button>
          )}
        </nav>
      </div>

      {isLoggedIn && (
        <div className="mt-10 pt-6 border-t border-gray-200 flex items-center gap-4 p-2 rounded">
          {/* <img
            src={userProfile.profilePicture || '/default-avatar.png'}
            alt="User avatar"
            className="w-14 h-14 rounded-full object-cover"
          /> */}
          <div>
            <p className="text-lg font-bold text-gray-800">{userProfile.username}</p>
            <p className="text-sm text-gray-500">{userProfile.role}</p>
            <p className="text-xs text-gray-400">{userProfile.email}</p>
          </div>
        </div>
      )}
    </aside>
  );
}
