const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const { Pool } = require('pg');
const knex =  require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development'])
const cors = require('cors');


// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'movies',
  password: 'docker',
  port: 5432,
});

app.use(express.json());
app.use(cors());

app.get('/movies', async (req,res) => {
  knex('movies')
    .select()
    .then((movies) => res.status(200).json(movies))
    .catch((error) => res.status(500).json({ error: 'An error occurred retrieving movies.'}))
})

// Add a new movie title to the server
// app.post('/movies', async (req, res) => {
//   const { title } = req.body;
//   try {
//     const client = await pool.connect();
//     const result = await client.query('INSERT INTO movies (title) VALUES ($1) RETURNING *', [title]);
//     const newMovie = result.rows[0].title;
//     res.status(201).json(newMovie);
//     client.release();
//   } catch (error) {
//     console.error('Error executing query', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
