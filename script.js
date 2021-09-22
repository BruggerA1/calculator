// Objects
const DISPLAY = {
	history: document.getElementById('display-history'),
	entry: document.getElementById('display-entry'),
	digit: [],
	init: () => {
		DISPLAY.history.innerText = 'History (temp)';
		DISPLAY.entry.innerText = DISPLAY.digit;
	}
}

const NUMKEY = {
	init: () => {
		for (let i = 0; i < 10; i++) {
			NUMKEY[i] = document.getElementById(`calc-${i}`);
			NUMKEY[i].innerText = `${i}`;
			NUMKEY[i].addEventListener('click', inputNum);
		}
		NUMKEY['decimal'] = document.getElementById('calc-decimal');
		NUMKEY['decimal'].innerText = '.'
		NUMKEY['decimal'].addEventListener('click', inputNum);
	}
}

const OPERATIONS = {
	equals: document.getElementById('calc-equals'),
	add: document.getElementById('calc-add'),
	subtract: document.getElementById('calc-subtract'),
	multiply: document.getElementById('calc-multiply'),
	divide: document.getElementById('calc-divide'),
	init: () => {
		OPERATIONS.equals.addEventListener('click', inputEquals);
		OPERATIONS.add.addEventListener('click', inputAdd);
		OPERATIONS.subtract.addEventListener('click', inputSubtract);
		OPERATIONS.multiply.addEventListener('click', inputMultiply);
		OPERATIONS.divide.addEventListener('click', inputDivide);
	},
}

// Functions
function init() {
	NUMKEY.init();
	OPERATIONS.init();
	DISPLAY.init();
}

//clean this up
function inputNum() {
	let num = this.innerText;
	console.log(num);
	DISPLAY.digit.push(num);
	let fullNum = DISPLAY.digit.reduce((prev, curr) => prev.toString() + curr.toString());
	DISPLAY.entry.innerText = fullNum
	console.log(fullNum)
}

function inputEquals() {
	console.log(this.innerText);
}

function inputAdd(){
	console.log(this.innerText);
}

function inputSubtract() {
	console.log(this.innerText);
}

function inputMultiply() {
	console.log(this.innerText);
}

function inputDivide() {
	console.log(this.innerText);
}





// Initialization
init();
