const express = require('express');

const app = express();

// Use environment variable or default to port 3000
const port = 8080;
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;