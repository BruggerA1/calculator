// Objects
const DISPLAY = {
	history: document.getElementById('display-history'),
	entry: document.getElementById('display-entry'),
	digit: [],
	historyReg: [],
	init: () => {
		DISPLAY.history.innerText = 'History (temp)';
		DISPLAY.entry.innerText = '0.0';
	},
	clear: () => {
		DISPLAY.digit = [];
		DISPLAY.entry.innerText = '0.0';
	},
	// CLEAN THIS UP (needs arg)
	addHistory: () => {
		DISPLAY.historyReg.push(DISPLAY.entry.innerText);
		DISPLAY.history.innerText = DISPLAY.historyReg.join(' ');
		DISPLAY.entry.innerText = '0.0';
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

const MEMORY = {
	currentVal: 0,
	previousVal: 0,
	update: () => {
		MEMORY.previousVal = MEMORY.currentVal;
		MEMORY.currentVal = parseFloat(DISPLAY.entry.innerText);
	}
}


// Functions
function init() {
	NUMKEY.init();
	OPERATIONS.init();
	DISPLAY.init();
}

//clean this up (move to NUMKEY)
function inputNum() {
	if (this.innerText == '.') {
		NUMKEY['decimal'].disabled = true;
		if (DISPLAY.digit[0] == undefined) {
			DISPLAY.digit.push(0);
		}
	}

	DISPLAY.digit.push(this.innerText);
	DISPLAY.entry.innerText = DISPLAY.digit.reduce((prev, curr) => prev.toString() + curr.toString());

	MEMORY.update();
}
//CLEAN THIS UP (Do something similar to NUMKEY with a loop.)
function inputEquals() {
	console.log(this.innerText);
}

function inputAdd() {
	console.log(this.innerText);
	DISPLAY.addHistory();
	DISPLAY.historyReg.push('+');
	DISPLAY.history.innerText = DISPLAY.historyReg.join(' ');
	MEMORY.update();
	DISPLAY.digit = [];
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
