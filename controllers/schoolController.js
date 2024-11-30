const pool = require('../utils/db');
const calculateDistance = require('../utils/distanceCalculator');

async function addSchool(req, res) {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await pool.query(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    return res.status(201).json({ message: 'School added successfully' });
  } catch (error) {
    console.error('Error adding school:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function listSchools(req, res) {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const [schools] = await pool.query('SELECT * FROM schools');
    const sortedSchools = schools.map(school => {
      const distance = calculateDistance(latitude, longitude, school.latitude, school.longitude);
      return { ...school, distance };
    }).sort((a, b) => a.distance - b.distance);

    return res.status(200).json(sortedSchools);
  } catch (error) {
    console.error('Error fetching schools:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { addSchool, listSchools };
