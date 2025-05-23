'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [userProfile, setUserProfile] = useState({
    username: '',
    role: '',
    email: '',
    phone: '',
    profilePicture: '',
  });

  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const storedUsername = typeof window !== 'undefined' ? localStorage.getItem('username') : null;

    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setUserProfile({
        username: storedUsername,
        role: localStorage.getItem('role') || 'Developer',
        email: localStorage.getItem('email') || '',
        phone: localStorage.getItem('phone') || '',
        profilePicture: localStorage.getItem('profilePic') || '',
      });
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/tasks');
      const data = await res.json();
      setTasks(data);
      setFilteredTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchTasks();
    } else {
      setTasks([]);
      setFilteredTasks([]);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  }, [searchTerm, tasks]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchTasks();
      } else {
        alert('Failed to delete task.');
      }
    } catch (error) {
      alert('An error occurred while deleting the task.');
    }
  };

  const handleSignIn = () => router.push('/signin');
  const handleSignUp = () => router.push('/signup');
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUsername('');
    setTasks([]);
    setFilteredTasks([]);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="md:w-72 bg-white shadow-md flex flex-col justify-between p-6 md:min-h-screen">
        <div>
          <h1 className="text-3xl font-extrabold text-purple-600 mb-10">TickIt</h1>
          <nav className="flex flex-col gap-5 text-gray-700 font-medium">
            {isLoggedIn ? (
              <>
                <button onClick={() => router.push('/tasks/create')} className="text-left hover:text-purple-600">+ Create Task</button>
                <button onClick={() => router.push('/academics')} className="text-left hover:text-purple-600">🎓 Academics</button>
                <button onClick={() => router.push('/experience')} className="text-left hover:text-purple-600">💼 Experience</button>
                <button onClick={() => router.push('/skills')} className="text-left hover:text-purple-600">🛠️ Skills</button>
              </>
            ) : (
              <>
                <button onClick={handleSignIn} className="text-left hover:text-purple-600">Sign In</button>
                <button onClick={handleSignUp} className="text-left hover:text-purple-600">Sign Up</button>
              </>
            )}
            {isLoggedIn && (
              <button onClick={handleLogout} className="text-left text-red-500 hover:text-red-600">Logout</button>
            )}
          </nav>
        </div>

        {isLoggedIn && (
          <div className="mt-10 pt-6 border-t border-gray-200 flex items-center gap-4 p-2 rounded">
            <img
              src={userProfile.profilePicture || '/default-avatar.png'}
              alt="User avatar"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="text-lg font-bold text-gray-800">{userProfile.username}</p>
              <p className="text-sm text-gray-500">{userProfile.role}</p>
              <p className="text-xs text-gray-400">{userProfile.email}</p>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {isLoggedIn ? (
          <>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h2>
            <input
              type="text"
              placeholder="Search tasks..."
              className="mb-6 w-full p-2 border border-gray-300 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {loading ? (
              <p className="text-center text-gray-500 mt-10">Loading...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-white p-4 rounded-lg shadow border border-gray-200 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Due: {task.duedate ? new Date(task.duedate).toLocaleDateString() : 'N/A'}
                      </p>
                      <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded 
                        ${task.status === 'Completed' ? 'bg-green-100 text-green-700'
                          : task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'}`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => router.push(`/tasks/edit/${task._id}`)}
                        className="flex-1 bg-yellow-400 text-white py-1 rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {filteredTasks.length === 0 && (
                  <p className="text-center text-gray-500 col-span-full">No tasks found.</p>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-5xl font-bold text-purple-600 mb-4">Welcome to TickIt</h2>
            <p className="text-gray-600 text-lg">Please sign in or sign up to manage your tasks.</p>
          </div>
        )}
      </main>
    </div>
  );
}




