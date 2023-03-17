const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const multiply = function(array) {
    return array.reduce((total, current) => (total * current), 1);
  };

const divide = function(a, b) {
    return a / b;
}

const operate = function(operator, num1, num2) {
    return operator(num1 ,num2)
}
