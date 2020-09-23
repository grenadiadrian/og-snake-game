const grid = document.querySelector(".grid")
const startButton = document.getElementById("start")
const scoreDisplay = document.getElementById("score")
const title = document.querySelector("h1")
const gameOverSound = new Audio('https://raw.githubusercontent.com/grenadiadrian/og-snake-game/master/sounds/haha.mp3')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 20
let appleIndex = 0
let score = 0
let intervalTime = 500
let speed = 0.9
let timerId = 0


const createGrid = () => {
    //create 200 of these elements with a for loop
    for (let i = 0; i < width*width; i++) {
        //create element
        const square = document.createElement("div")
        //add styling to the element
        square.classList.add("square")
        //put the element into our grid
        grid.appendChild(square)
        //push it into a new squares array
        squares.push(square)
    }
}

createGrid()

currentSnake.forEach(index => squares[index].classList.add("snake"))

const startGame = () => {
    //restore main title text
    title.textContent = "Snake Game!!!"
    title.style.color = "#3C4D50"
    //remove the snake
    currentSnake.forEach(index => squares[index].classList.remove("snake"))
    //remove the apple
    squares[appleIndex].classList.remove("apple")
    clearInterval(timerId)
    currentSnake = [2,1,0]
    score = 0
    //re-add score to the browser
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 500
    generateApple()
    //re-add the class of snake to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add("snake"))
    timerId = setInterval(move, intervalTime)
}

const move = () => {
    //End the game
    if ( 
        (currentSnake[0] + width >= width*width && direction === width) ||
        (currentSnake[0] % width === width -1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === - width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        title.textContent = "GAME OVER!!!😫"
        title.style.color = "red"
        gameOverSound.play()
        return clearInterval(timerId)
    }
    

    //remove last element from currentSnake array
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove("snake")
    //add square in direction snake is heading
    currentSnake.unshift(currentSnake[0] + direction)
    //add styling so it is seen

    //deal with snake head getting the apple
    if (squares[currentSnake[0]].classList.contains("apple")) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove("apple")
        //grow snake by adding class of snake
        squares[tail].classList.add("snake")
        //grow snake array
        currentSnake.push(tail)
        //generate a new apple
        generateApple()
        //add one to the score
        score++
        //display score
        scoreDisplay.textContent = score
        //speed up the snake
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }


    squares[currentSnake[0]].classList.add("snake")
}



const generateApple = () => {
    do {
        //generate a random number
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple")
}

generateApple()

const control = (e) => {
    const value = e.keyCode

    switch(value) {
        case 37:
            direction = -1
            break
        case 38:
            direction = -width
            break
        case 39:
            direction = 1
            break
        case 40:
            direction = +width
            break
    }
}


document.addEventListener('keydown', control)
startButton.addEventListener("click", startGame)
