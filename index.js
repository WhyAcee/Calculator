const buttons = document.querySelectorAll('button')
const numbers = document.querySelectorAll('.numbers')
const display = document.querySelector('.screen span')
const signs = document.querySelectorAll('.signs')
const equals = document.querySelector('.equals')
const clearBtn = document.querySelector('#clear')
const deleteBtn = document.querySelector('#delete')
const decimal = document.querySelector('#decimal')

let firstNum = "";
let isFirstNum = false;
let sign = "";
let secondNum = "";
let isSecondNum = false;
let displayValue = 0;
let isCalculated = false;

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
    if(isCalculated)
    {
        firstNum = "";
        secondNum = "";
        isCalculated = false;
    }

    if(num)
    display.textContent = "";
    firstNum += num;
    display.textContent = firstNum;
}

function getSecondNum(num) {
    if(isFirstNum === true) { 
        document.querySelector('.screen span').style.fontSize = "100px"
        display.textContent = "";
        secondNum += num;
        display.textContent = secondNum;
    }
}

// 2 + 4
// firstNum = 2 then + sign (calls getSign()) then secondNum = 4
// 2 + 4 + =>  6 +
// when we call + => getSign()
// secondNum > null / ' '

// Event Listeners for operators
function getSign() {
    for(let i = 0; i < signs.length; i++) {
        signs[i].addEventListener('click', (e) =>{
        decimal.removeAttribute('disabled')

        if(isCalculated)
        {
            secondNum = "";
            isCalculated = false;
        }
      
        if(secondNum != '') { // second operator
            evaluate()
            isSecondNum = false;
            secondNum = '';
            console.log("I did my job")
        }
        else // for first operator
        {
            isFirstNum = true;   
            isSecondNum = false;
            secondNum = '';
        }
        sign = e.target.getAttribute('value');
        console.log(isSecondNum)
        console.log(secondNum)
        console.log(displayValue)
        console.log(firstNum)
        })
    }

}
getSign();

// Equals button functionality
equals.addEventListener('click', (e) => {
    evaluate();
    equalClear();
    
})

function evaluate() {
    firstNum = +firstNum
    secondNum = +secondNum
    decimal.removeAttribute('disabled')

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
    firstNum = +firstNum;
    
    if (display.textContent.length >= 7) {
        document.querySelector('.screen span').style.fontSize = `${650 / display.textContent.length}px`;
    } 
}
// Clear Button functionality
clearBtn.addEventListener('click', clear)

function clear() {
    decimal.removeAttribute('disabled')
    isCalculated = false;
    firstNum = "";
    isFirstNum = false;
    sign = "";
    secondNum = "";
    isSecondNum = false;
    displayValue = 0;
    display.textContent = displayValue;
    document.querySelector('.screen span').style.fontSize = "100px"
}

function equalClear() { 
    isCalculated = true;
    isFirstNum = false;
    isSecondNum = false;
}



// Check if there is a decimal
decimal.addEventListener('click', () => {
    decimal.setAttribute("disabled","disabled");
})

// Delete button functionality
deleteBtn.addEventListener('click', deleteNum)

function deleteNum() {
    if(display.textContent != 0) {
        display.textContent = display.textContent.toString().slice(0, -1);
        display.value = display.textContent
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
    if(b === 0) 
    {
    return display.textContent = "Error"
    }
    else 
    {
    return a / b;
    }
}

const operate = function(operator, num1, num2) {
    return operator(num1 ,num2)
}