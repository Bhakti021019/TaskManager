'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const res = await fetch('http://localhost:5000/api/skills');
    const data = await res.json();
    setSkills(data);
  };

  const addSkill = async () => {
    if (!newSkill.trim()) return;
    const res = await fetch('http://localhost:5000/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newSkill })
    });
    const data = await res.json();
    setSkills([...skills, data]);
    setNewSkill('');
  };

  const deleteSkill = async (id) => {
    await fetch(`http://localhost:5000/api/skills/${id}`, { method: 'DELETE' });
    setSkills(skills.filter(s => s._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-600">TickIt</h1>
        <button
          onClick={() => router.push('/')}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Home
        </button>
      </nav>

      {/* Content */}
      <div className="px-4 py-10 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">🛠️ Manage Skills</h2>

        <div className="mb-4 flex space-x-2">
          <input
            type="text"
            placeholder="Add a skill"
            className="flex-1 border border-gray-300 p-2 rounded"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <button
            onClick={addSkill}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ➕ Add
          </button>
        </div>

        <ul className="space-y-2">
          {skills.map((skill) => (
            <li key={skill._id} className="flex justify-between items-center bg-white shadow p-2 rounded">
              <span>{skill.name}</span>
              <button
                onClick={() => deleteSkill(skill._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
