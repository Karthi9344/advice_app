// Select DOM elements
const adviceText = document.getElementById('advice');
const generateButton = document.getElementById('generate-advice');
const saveButton = document.getElementById('save-advice');
const savedList = document.getElementById('saved-advice-list');

let currentAdvice = "";

// Fetch random advice
async function fetchAdvice() {
    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        currentAdvice = data.slip.advice;
        adviceText.textContent = `"${currentAdvice}"`;
        saveButton.disabled = false; // Enable save button
    } catch (error) {
        adviceText.textContent = "Failed to fetch advice. Try again!";
        console.error('Error fetching advice:', error);
    }
}

// Save advice to the list
function saveAdvice() {
    if (currentAdvice) {
        // Create a new list item
        const listItem = document.createElement('li');
        listItem.textContent = currentAdvice;

        // Add delete button for each saved advice
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px";
        deleteButton.onclick = () => listItem.remove();

        listItem.appendChild(deleteButton);
        savedList.appendChild(listItem);

        saveButton.disabled = true; // Disable save button until new advice is fetched
    }
}

// Event listeners
generateButton.addEventListener('click', fetchAdvice);
saveButton.addEventListener('click', saveAdvice);
// Load saved advice from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedAdvice = JSON.parse(localStorage.getItem('savedAdvice')) || [];
    savedAdvice.forEach((advice) => addSavedAdviceToList(advice));
});

// Save advice to the list and localStorage
function saveAdvice() {
    if (currentAdvice) {
        addSavedAdviceToList(currentAdvice);

        // Save to localStorage
        const savedAdvice = JSON.parse(localStorage.getItem('savedAdvice')) || [];
        savedAdvice.push(currentAdvice);
        localStorage.setItem('savedAdvice', JSON.stringify(savedAdvice));

        saveButton.disabled = true;
    }
}

// Add advice to the list dynamically
function addSavedAdviceToList(advice) {
    const listItem = document.createElement('li');
    listItem.textContent = advice;

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";
    deleteButton.onclick = () => {
        listItem.remove();

        // Update localStorage
        const savedAdvice = JSON.parse(localStorage.getItem('savedAdvice')) || [];
        const updatedAdvice = savedAdvice.filter((item) => item !== advice);
        localStorage.setItem('savedAdvice', JSON.stringify(updatedAdvice));
    };

    listItem.appendChild(deleteButton);
    savedList.appendChild(listItem);
}
