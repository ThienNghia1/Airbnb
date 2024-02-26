const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));


app.get('/', (req, res) => {
    res.json('test ok')
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    res.json({ name: name, email: email, password: password });
});

app.listen(4000)