const numbers = document.querySelectorAll('.numbers')
const display = document.querySelector('.screen span')
const signs = document.querySelectorAll('.signs')
const equals = document.querySelector('.equals')

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
    })
}

function getFirstNum(num) {
    display.innerHTML = "";
    firstNum += num;
    display.innerHTML = firstNum;
    firstNum = +firstNum;
}

function getSecondNum(num) {
    if(isFirstNum === true) { 
        display.innerHTML = "";
        secondNum += num;
        display.innerHTML = secondNum;
        secondNum = +secondNum;
    }
}
//Event Listeners for operators
function getSign() {
    for(let i = 0; i < signs.length; i++) {
        signs[i].addEventListener('click', (e) =>{
            sign = e.target.getAttribute('value');
            isFirstNum = true;       
        })
    }

}
getSign();

//Event listener for equals sign
equals.addEventListener('click', (e) => {
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
    display.innerHTML = displayValue;
})

//Basic calculator operation functions
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
    return operator(num1 ,num2)
}


