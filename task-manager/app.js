// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // Route imports
// const taskRoutes = require('./routes/taskRoutes');
// const userRoutes = require('./routes/userRoutes');
// const experienceRoutes = require('./routes/experienceRoutes');
// const academicsRoutes = require('./routes/academicsRoutes');
// const skillRoutes = require('./routes/skillsRoutes');

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:3000', // frontend origin
// }));

// // API Routes
// app.use('/api/tasks', taskRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/experience', experienceRoutes);
// app.use('/api/academics', academicsRoutes);
// app.use('/api/skills', skillRoutes);

// // MongoDB connection
// const mongoUri = 'mongodb+srv://modakbhakti15:Admin1234@cluster0.0vdaz3e.mongodb.net/taskdb';

// mongoose.connect(mongoUri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('✅ Connected to MongoDB Atlas');
// })
// .catch((err) => {
//   console.error('❌ MongoDB connection error:', err);
// });

// // Error handling for DB
// mongoose.connection.on('error', err => {
//   console.error('❌ MongoDB runtime error:', err);
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });




require('dotenv').config(); // Load env variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const academicsRoutes = require('./routes/academicsRoutes');
const skillRoutes = require('./routes/skillsRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/academics', academicsRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/users', require('./routes/userRoutes'));

// MongoDB
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

mongoose.connection.on('error', err => console.error('❌ MongoDB runtime error:', err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

