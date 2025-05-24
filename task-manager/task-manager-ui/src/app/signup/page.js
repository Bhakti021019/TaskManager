// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function SignupPage() {
//   const [form, setForm] = useState({
//     username: '',
//     password: '',
//     email: '',
//     role: '',
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const router = useRouter();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       const res = await fetch('http://localhost:5000/api/users/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setSuccess('Registered! Now sign in.');
//         setTimeout(() => router.push('/signin'), 1000);
//       } else {
//         setError(data.error || 'Failed to register');
//       }
//     } catch (err) {
//       setError('Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <div className="bg-white shadow-lg p-8 rounded-md w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={form.username}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 p-2 rounded"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 p-2 rounded"
//           />
//           <input
//             type="text"
//             name="role"
//             placeholder="Role (e.g., Developer)"
//             value={form.role}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 p-2 rounded"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 p-2 rounded"
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
//           >
//             Sign Up
//           </button>
//         </form>

//         {error && (
//           <div className="text-red-500 mt-4 text-sm text-center">
//             {error}
//           </div>
//         )}
//         {success && (
//           <div className="text-green-600 mt-4 text-sm text-center">
//             {success}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }







'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    role: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Registered! Now sign in.');
        setTimeout(() => router.push('/signin'), 1000);
      } else {
        setError(data.error || 'Failed to register');
      }
    } catch (err) {
      console.error(err); // ✅ Now using the error
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg p-8 rounded-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="role"
            placeholder="Role (e.g., Developer)"
            value={form.role}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        {error && (
          <div className="text-red-500 mt-4 text-sm text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-600 mt-4 text-sm text-center">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}
