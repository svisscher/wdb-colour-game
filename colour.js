// This app was built as an exercise for the Udemy course 'The Web Developer Bootcamp'. For more information see: https://www.udemy.com/the-web-developer-bootcamp/learn/v4/overview

// Variables
let colours = [];
let colourSet;
let gameMode = 6;
const buttonReset = document.querySelector('#buttonReset');
const buttonsMode = document.querySelectorAll('.mode');
const colourDisplay = document.querySelector('#colourDisplay');
const header = document.querySelector('h1');
const messageDisplay = document.querySelector('#message');
const squares = document.querySelectorAll('.square');

// Functions
/**
 * Access and return random colour from the 'colours' array.
 * @return {number} Number that denotes position of item in 'colours' array.
 */
function assignColour() {
    const randomNumber = Math.floor(Math.random() * colours.length);
    return colours[randomNumber];
}

/**
 * Change the background colour of each square to the colour passed as
 * an argument.
 * @param {string} colour The RGB colour that was set to be guessed by
 * the player.
 */
function changeColours(colour) {
    squares.forEach(function(square) {
        square.style.backgroundColor = colour;
    });
}

/**
 * Produce an RGB colour using randomized values from 0-255 for red, green
 * and blue.
 * @return {string}
 */
function randomColour() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}

/**
 * Generate an array with a number of random RGB colours.
 * @param {number} number The number of colours passed into the function.
 * The number depends on the gameMode; easy = 3, hard = 6 (default).
 * @return {Array}
 */
function generateRandomColours(number) {
    const arrayColours = [];
    // Add number random colours to array and repeat number of times
    for (let i = 0; i < number; i++) {
        // Get random colour and push into array
        arrayColours.push(randomColour());
    }
    return arrayColours;
}

/**
 * Reset the game by updating the colours to play with and changing the display
 * features accordingly.
 */
function resetGame() {
    // Generate new colours
    colours = generateRandomColours(gameMode);
    // Select new random colour from array
    colourSet = assignColour();
    // Update display to match set colour
    colourDisplay.textContent = colourSet;
    // Change colours of squares
    for (let i = 0; i < squares.length; i++) {
        if (colours[i]) {
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = colours[i];
        } else {
            squares[i].style.display = 'none';
        }
    }
    // Reset header background
    header.style.backgroundColor = '#747475';
    // Reset button and message text
    buttonReset.textContent = 'New colours';
    messageDisplay.textContent = '';
}

/**
 * Add events listeners to the Easy and Hard game mode buttons.
 */
function setupModeButtons() {
    // By placing buttons for game mode in For-loop code is no longer
    // duplicated and it becomes easier to add another game mode later on
    for (let i = 0; i < buttonsMode.length; i++) {
        buttonsMode[i].addEventListener('click', function() {
            buttonsMode[0].classList.remove('selected');
            buttonsMode[1].classList.remove('selected');
            this.classList.add('selected');
            // Change number of squares according to game mode
            if (this.textContent === 'Easy') {
                gameMode = 3;
            } else {
                gameMode = 6;
            }
            resetGame();
        });
    }
}

/**
 * Add events listeners to the coloured squares and handle the display
 * of the header, squares and in-game messages.
 */
function setupSquares() {
    for (let i = 0; i < squares.length; i++) {
        // Add click listeners to squares
        squares[i].addEventListener('click', function() {
        // Store colour of clicked square
        const colourClicked = this.style.backgroundColor;
        // Compare clicked colour with set colour
        if (colourClicked === colourSet) {
            messageDisplay.textContent = 'Correct!';
            // Call function to change colour of all squares to clicked colour
            changeColours(colourClicked);
            // Update header colour to clicked colour
            header.style.backgroundColor = colourClicked;
            // Change reset button text
            buttonReset.textContent = 'Play again?';
            } else {
                this.style.backgroundColor = '#232323';
                messageDisplay.textContent = 'Try again!';
            }
        });
    }
}

/**
 * Run initial game functionality on page load. Add event listeners on
 * the game mode buttons, add event listeners to the squares and run
 * the reset game functionality to bring the page to its initial state.
 */
function init() {
    setupModeButtons();
    setupSquares();
    resetGame();
}

init();

buttonReset.addEventListener('click', function() {
    resetGame();
});
