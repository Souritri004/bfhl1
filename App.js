import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_alphabet', label: 'Highest alphabet' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      const res = await axios.post('https://bfhl-ckax6ygup-souritri-chatterjees-projects.vercel.app/', parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid input or server error');
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return selectedOptions.map(option => (
      <div key={option.value}>
        <h3>{option.label}</h3>
        <p>{JSON.stringify(response[option.value])}</p>
      </div>
    ));
  };

  return (
    <div className="App">
      <h1>BFHL App</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON here'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <Select
          isMulti
          options={options}
          onChange={setSelectedOptions}
          className="multi-select"
        />
      )}
      {renderResponse()}
    </div>
  );
}

export default App;