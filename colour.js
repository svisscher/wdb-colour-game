// General
var gameMode = 6;
var colours = generateRandomColours(gameMode);
var header = document.querySelector('h1');

/**
 * Produce an RGB colour using randomized values from 0-255 for red, green
 * and blue.
 * @return {string}
 */
function randomColour() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}

/**
 * Generate an array with a number of random RGB colours.
 * @param {number} number The number of colours passed into the function.
 * The number depends on the gameMode; easy = 3, hard = 6 (default).
 * @return {Array}
 */
function generateRandomColours(number) {
    var arrayColours = [];
    // Add number random colours to array and repeat number of times
    for (var i = 0; i < number; i++) {
        // Get random colour and push into array
        arrayColours.push(randomColour());
    }
    return arrayColours;
}

// Header
var colourSet = assignColour();
var colourDisplay = document.querySelector('#colourDisplay');
var messageDisplay = document.querySelector('#message');

colourDisplay.textContent = colourSet;

/**
 * Access and return random colour from the 'colours' array.
 * @return {number} Number that denotes position of item in 'colours' array.
 */
function assignColour() {
    var randomNumber = Math.floor(Math.random() * colours.length);
    return colours[randomNumber];
}

// Navbar
var buttonEasy = document.querySelector('#buttonEasy');
var buttonHard = document.querySelector('#buttonHard');
var buttonReset = document.querySelector('#buttonReset');

/**
 * Reset the game by updating the colours to play with.
 */
function resetGame() {
    // Generate new colours
    colours = generateRandomColours(gameMode);
    // Select new random colour from array
    colourSet = assignColour();
    // Update display to match set colour
    colourDisplay.textContent = colourSet;
    // Change colours of squares
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colours[i];
    }
    // Reset header background
    header.style.backgroundColor = '#747475';
    // Reset button and message text
    buttonReset.textContent = 'New colours';
    messageDisplay.textContent = '';
}

buttonEasy.addEventListener('click', function() {
    // Show button as selected
    buttonEasy.classList.add('selected');
    buttonHard.classList.remove('selected');
    // Reset message text
    messageDisplay.textContent = '';
    header.style.backgroundColor = '#747475';
    // Set game mode to easy
    gameMode = 3;
    // Generate new colours depending on game mode
    colours = generateRandomColours(gameMode);
    // Choose and set new colour
    colourSet = assignColour();
    colourDisplay.textContent = colourSet;
    for (var i = 0; i < squares.length; i++) {
        // If there is next colour, loop through colours array and check if
        // square has colour assigned, then change it
        if (colours[i]) {
            squares[i].style.backgroundColor = colours[i];
        } else {
            squares[i].style.display = 'none';
        }
    }
});

buttonHard.addEventListener('click', function() {
    buttonHard.classList.add('selected');
    buttonEasy.classList.remove('selected');
    messageDisplay.textContent = '';
    header.style.backgroundColor = '#747475';
    gameMode = 6;
    colours = generateRandomColours(gameMode);
    colourSet = assignColour();
    colourDisplay.textContent = colourSet;
    for (var i = 0; i < squares.length; i++) {
        colours[i] = squares[i].style.backgroundColor = colours[i];
        squares[i].style.display = 'block';
    }
});

buttonReset.addEventListener('click', function() {
    resetGame();
});

// Main content
var squares = document.querySelectorAll('.square');

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

for (var i = 0; i < squares.length; i++) {
    // Add initial colours to squares
    squares[i].style.backgroundColor = colours[i];
    // Add click listeners to squares
    squares[i].addEventListener('click', function() {
    // Store colour of clicked square
    var colourClicked = this.style.backgroundColor;
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
