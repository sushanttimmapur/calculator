let display = document.querySelector('#display');
let keys = document.querySelectorAll('button');
let op = '';
let num1 = null;
let num2 = null;
let lastKey = null;

keys.forEach(k => k.addEventListener('click', updateDisplay));

function updateDisplay(e) {
    let keyVal = e.target.textContent;

    if(!isNaN(keyVal)) {
        if(lastKey === null || !isNaN(lastKey) || lastKey === '.') {
            display.append(keyVal);
        } else {
            display.textContent = keyVal;
        }
    } else {
        if(display.textContent.length > 0) {
            if(keyVal === '.') {
                if(!display.textContent.includes('.')) display.append(keyVal);
            } else if(keyVal === 'Del') {
                display.textContent = display.textContent.slice(0, -1);
            } else if(keyVal === 'Clear') {
                display.textContent = null;
                restartValues();
            } else {
                if(keyVal != '=') {
                    if(num1 === null) {
                        num1 = +display.textContent;
                        op = keyVal;
                    } else {
                        if(num2 === null) {
                            num2 = +display.textContent;
                            let result = operate(op, num1, num2);
                            display.textContent = format(result);
                            num1 = result;
                            num2 = null;
                            op = keyVal;
                        }
                    }
                } else {
                    if(op.length > 0 && num1 != null && !isNaN(display.textContent)) {
                        num2 = +display.textContent;
                        let result = operate(op, num1, num2);
                        display.textContent = format(result);
                        restartValues();
                    }
                }
            }
        } 
    }
    lastKey = keyVal;
}

function operate(op, a, b) {
    switch(op) {
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return 'Error';
    }
}

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function restartValues() {
    num1 = null;
    num2 = null;
    op = '';
}

function format(val) {
    return countDecimals(val) < 9 ? val : val.toFixed(9);
}

function countDecimals(val) {
    if(Math.floor(val) === val) return 0;
    return val.toString().split(".")[1].length || 0; 
}