const express = require('express');
const app = express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`El servidor esta escuchando en el servidor http//localhost:${PORT}`)
});