'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'; // ← Add this for the link

export default function ExperiencePage() {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/experience');
      setEntries(res.data);
    } catch (err) {
      console.error('Fetch error:', err.message);
    }
  };

  const handleAdd = async () => {
    if (!title || !company || !year) {
      alert('Title, Company, and Year are required.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/experience', {
        title,
        company,
        year,
        description
      });

      setEntries([...entries, res.data]);
      setTitle('');
      setCompany('');
      setYear('');
      setDescription('');
    } catch (err) {
      console.error('Create error:', err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar with Home button */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-700">TickIt</div>
        <div className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-purple-600 font-semibold">
            Home
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">💼 Experience</h1>

        <div className="bg-white shadow-md rounded-lg p-6 space-y-4 mb-8">
          <input
            type="text"
            placeholder="Title"
            className="w-full border border-gray-300 p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Company"
            className="w-full border border-gray-300 p-2 rounded"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            type="text"
            placeholder="Year"
            className="w-full border border-gray-300 p-2 rounded"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="w-full border border-gray-300 p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ➕ Add Experience
          </button>
        </div>

        <div className="space-y-4">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="border border-gray-200 shadow-sm rounded-lg p-4 bg-white"
            >
              <h2 className="font-semibold text-lg text-gray-900">
                {entry.title} @ {entry.company}
              </h2>
              <p className="text-sm text-gray-500 mb-1">{entry.year}</p>
              <p className="text-gray-700">{entry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
