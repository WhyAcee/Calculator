const buttons = document.querySelectorAll('button')
const numbers = document.querySelectorAll('.numbers')
const display = document.querySelector('.screen span')
const signs = document.querySelectorAll('.signs')
const equals = document.querySelector('.equals')
const clearBtn = document.querySelector('#clear')
const deleteBtn = document.querySelector('#delete')

let firstNum = "";
let isFirstNum = false;
let sign = "";
let secondNum = "";
let isSecondNum = false;
let displayValue = 0;

//Event Listeners for number buttons
for(let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', (e) => {
        let numValue = e.target.getAttribute('value');
        if(isFirstNum === false) {
            getFirstNum(numValue)
        }
        if(isSecondNum === false) {
            getSecondNum(numValue)
        }
        if (display.textContent.length >= 7) {
            document.querySelector('.screen span').style.fontSize = `${650 / display.textContent.length}px`;
        } 
    })
}

// Finds input values
function getFirstNum(num) {
    display.textContent = "";
    firstNum += num;
    display.textContent = firstNum;
    firstNum = +firstNum;
}

function getSecondNum(num) {
    if(isFirstNum === true) { 
        document.querySelector('.screen span').style.fontSize = "100px"
        display.textContent = "";
        secondNum += num;
        display.textContent = secondNum;
        secondNum = +secondNum;
    }
}

// Event Listeners for operators
function getSign() {
    for(let i = 0; i < signs.length; i++) {
        signs[i].addEventListener('click', (e) =>{
            sign = e.target.getAttribute('value');
            isFirstNum = true;   
            isSecondNum = false;
            if(secondNum != '') {
                secondNum = true;
                evaluate();
            }
        })
    }

}
getSign();

// Equals button functionality
equals.addEventListener('click', (e) => {
    evaluate();
})

function evaluate() {
    if(sign === '+') {
        displayValue = operate(add, firstNum, secondNum);
    }
    else if(sign === '-') {
        displayValue = operate(subtract, firstNum, secondNum);
    }
    else if(sign === '*') {
        displayValue = operate(multiply, firstNum, secondNum);
    }
    else if(sign === '/') {
        displayValue = operate(divide, firstNum, secondNum);
    }
    display.textContent = displayValue;
    firstNum = displayValue
    secondNum = '';

    if (display.textContent.length >= 7) {
        document.querySelector('.screen span').style.fontSize = `${650 / display.textContent.length}px`;
    }
}
// Clear Button functionality
clearBtn.addEventListener('click', clear)

function clear() {
    firstNum = "";
    isFirstNum = false;
    sign = "";
    secondNum = "";
    isSecondNum = false;
    displayValue = 0;
    display.textContent = displayValue;
    document.querySelector('.screen span').style.fontSize = "100px"
}

// Delete button functionality
deleteBtn.addEventListener('click', deleteNum)

function deleteNum() {
    if(display.textContent != 0) {
        display.textContent = display.textContent.toString().slice(0, -1);
        if(isFirstNum == true) {
            secondNum = display.textContent;
            secondNum = +secondNum;
        } else if(isFirstNum == false) {
            firstNum = display.textContent;
            firstNum = +firstNum;
        }
        if(isSecondNum == true) {
            clear()
        }
        console.log(display.textContent)
        console.log(firstNum)
    }
}

// Basic calculator operation functions
const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const multiply = function(a, b) {
    return a * b;
  };

const divide = function(a, b) {
    return a / b;
}

const operate = function(operator, num1, num2) {
    isSecondNum = true;
    return operator(num1 ,num2)
}

// Fix chaining operations
// Add decimal functionality 