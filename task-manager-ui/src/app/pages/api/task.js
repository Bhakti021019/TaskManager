export default async function handler(req, res) {
  const url = `http://localhost:5000/api/tasks${req.query.id ? '/' + req.query.id : ''}`;
  const options = {
    method: req.method,
    headers: { 'Content-Type': 'application/json' },
    body: ['POST', 'PUT'].includes(req.method) ? JSON.stringify(req.body) : undefined,
  };

  const response = await fetch(url, options);
  const data = await response.json();
  res.status(response.status).json(data);
}
