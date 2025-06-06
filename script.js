// Calculator class handles all calculator logic and state
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        // Elements to display previous and current operands
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear(); // Initialize calculator state
    }

    // Resets calculator to initial state
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // Deletes the last character from the current operand
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
    }

    // Appends a number or decimal point to the current operand
    appendNumber(number) {
        // Prevent multiple decimals
        if (number === '.' && this.currentOperand.includes('.')) return;
        // Replace leading zero unless adding a decimal
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    // Sets the operation and prepares for the next operand
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        // If there's already a previous operand, compute first
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    // Performs the calculation based on the selected operation
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    // Updates the calculator display with current values
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// Get all the elements we need from the DOM
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-action="calculate"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const allClearButton = document.querySelector('[data-action="clear"]');
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');

// Create a calculator object with display elements
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Add event listeners to number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

// Add event listeners to operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

// Equals button event listener
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

// All clear button event listener
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

// Delete button event listener
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});
