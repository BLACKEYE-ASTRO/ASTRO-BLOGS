const express = require('express');
const multer = require('multer');
const cors = require('cors');
const pool = require('./db');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer for image uploads (stores in disk for production)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Create a new blog
app.post('/api/blogs', upload.single('image'), async (req, res) => {
  const { title, category, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !category || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newBlog = await pool.query(
      'INSERT INTO blogs (title, category, image, description, created_on) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [title, category, image, description]
    );
    res.status(201).json(newBlog.rows[0]);
  } catch (error) {
    console.error('Error creating blog:', error.message);
    res.status(500).json({ message: 'Error creating blog' });
  }
});

// Get all blogs
app.get('/api/blogs', async (req, res) => {
  const { category } = req.query;

  try {
    let query = 'SELECT * FROM blogs';
    const queryParams = [];

    if (category) {
      query += ' WHERE category = $1';
      queryParams.push(category);
    }

    query += ' ORDER BY created_on DESC';

    const result = await pool.query(query, queryParams);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching blogs:', error.message);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Get a single blog by ID
app.get('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching blog:', error.message);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

// Delete a blog by ID
app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM blogs WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully', blog: result.rows[0] });
  } catch (error) {
    console.error('Error deleting blog:', error.message);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
