const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestAlphabet = alphabets.length > 0 ? [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)] : [];

    res.json({
        is_success: true,
        user_id: "souritri004", // Replace with your actual user_id
        email: "souritri_c@srmap.edu.in", // Replace with your actual email
        roll_number: "AP21110010004", // Replace with your actual roll number
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    });
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});