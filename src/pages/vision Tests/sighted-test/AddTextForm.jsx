import React, { useState, useEffect } from 'react';

const TextForm = () => {
  const [text, setText] = useState('');
  const [textList, setTextList] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [editingWord, setEditingWord] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch all saved words when the component mounts
    fetch('http://localhost:5000/api/word/')
      .then((response) => response.json())
      .then((data) => setAllWords(data))
      .catch((error) => console.error('Error fetching words:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Regular expression to match only letters (no numbers or symbols)
    const lettersOnlyRegex = /^[A-Za-z]+$/;

    if (!lettersOnlyRegex.test(text)) {
      setErrorMessage('Please enter text without numbers, symbols or spaces');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/word/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: text }),
      });

      if (response.ok) {
        // The word was successfully added to the backend
        console.log('Word added successfully');
        setTextList([...textList, text]);
        setText('');
        setErrorMessage('');
      } else {
        // Handle errors if the request was not successful
        console.error('Failed to add word to the backend');
      }
    } catch (error) {
      console.error('An error occurred while adding the word:', error);
    }
  };

  const handleEdit = (id) => {
    // Set the editingWord state to the ID of the word to edit
    setEditingWord(id);
  };

  const handleSaveEdit = async (id, newText) => {
    // Send a PUT request to edit the word
    try {
      const response = await fetch(`http://localhost:5000/api/word/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: newText }),
      });

      if (response.ok) {
        // Update the word in the UI
        const updatedWords = allWords.map((word) =>
          word._id === id ? { ...word, word: newText } : word
        );
        setAllWords(updatedWords);
        setEditingWord(null); // Clear editing mode
      } else {
        // Handle errors if the request was not successful
        console.error('Failed to edit word');
      }
    } catch (error) {
      console.error('An error occurred while editing the word:', error);
    }
  };

  const handleDelete = async (id) => {
    // Send a DELETE request to delete the word
    try {
      const response = await fetch(`http://localhost:5000/api/word/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the word from the UI
        const updatedWords = allWords.filter((word) => word._id !== id);
        setAllWords(updatedWords);
      } else {
        // Handle errors if the request was not successful
        console.error('Failed to delete word');
      }
    } catch (error) {
      console.error('An error occurred while deleting the word:', error);
    }
  };

  return (
    <div className="container mx-auto h-screen lg:p-24">
      <h1 className="text-2xl font-bold mb-4">Add Text</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          className="w-full px-3 py-2 rounded-lg border"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="mt-4 bg-[#004AAD] text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
        >
          Submit
        </button>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </form>

      <div>
        <h2 className="text-xl font-bold mt-8">All Words:</h2>
        <ul>
          {allWords.map((word) => (
            <li key={word._id} className="my-2 flex justify-between items-center">
              {editingWord === word._id ? (
                <>
                  <input
                    type="text"
                    value={word.word}
                    onChange={(e) => {
                      const newText = e.target.value;
                      const updatedWords = allWords.map((w) =>
                        w._id === word._id ? { ...w, word: newText } : w
                      );
                      setAllWords(updatedWords);
                    }}
                  />
                  <button
                    onClick={() => handleSaveEdit(word._id, word.word)}
                    className="ml-2 text-green-500 hover:underline"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {word.word}
                  <div>
                    <button
                      onClick={() => handleEdit(word._id)}
                      className="ml-2 text-blue-500 hover:underline mr-8"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(word._id)}
                      className="ml-2 text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TextForm;
