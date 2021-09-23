// Objects
const MEM = {
	value: {
		current: null,
		previous: null,
		operator: null,
	},
	entry: {
		display: document.getElementById('display-entry'),
		register: [],
		get: () => MEM.entry.display.innerText,
		set: data => MEM.entry.display.innerText = data,
	},
	history: {
		display: document.getElementById('display-history'),
		register: [],
		set: data => MEM.history.display.innerText = data,
	},
	update: (op) => {
		MEM.history.register.push(MEM.entry.get());
		MEM.history.register.push(op);
		MEM.history.set(MEM.history.register.join(' '));
		MEM.value.previous = MEM.entry.get();
		MEM.value.operator = op;
		MEM.value.current = 0;
		MEM.entry.set('0.0');
		MEM.entry.register = [];
	},
	init: () => {
		MEM.entry.set('0.0');
		MEM.history.set('History (temp)');
		MEM.value.current = parseFloat(0);
		MEM.value.previous = parseFloat(0);
	},
}

const NUM = {
	key: {
		'dec': document.getElementById('calc-decimal'),
	},
	value: {
		'dec': '.',
	},
	init: () => {
		for (let i = 0; i < 10; i++) {
			NUM.key[i] = document.getElementById(`calc-${i}`);
			NUM.value[i] = document.getElementById(`calc-${i}`).innerText = i;
			NUM.key[i].addEventListener('click', () => NUM.input(i));
		}
		NUM.key['dec'].innerText = NUM.value['dec'];
		NUM.key['dec'].addEventListener('click', () => NUM.input('.'));
	},
	input: num => {
		if (num == '.') {
			NUM.key['dec'].disabled = true;
			if (MEM.entry.register[0] == undefined) MEM.entry.register.push(0);
		}
		MEM.entry.register.push(num);
		MEM.entry.set(MEM.entry.register.join(''));
		MEM.value.current = MEM.entry.get();
	},
}

const OPS = {
	equals: {
		key: document.getElementById('calc-equals'),
		value: '=',
		operate: () => {
			MEM.value.current = MEM.entry.get();
			MEM.history.register.push(MEM.entry.get());
			MEM.history.set(MEM.history.register.join(' '));
			MEM.entry.set('0.0');
		},
	},
	add: {
		key: document.getElementById('calc-add'),
		value: '+',
		operate: () => {
			MEM.update('+');
		},
	},
	subtract: {
		key: document.getElementById('calc-subtract'),
		value: '-',
		operate: () => { 
			MEM.update('-');
		},
	},
	multiply: {
		key: document.getElementById('calc-multiply'),
		value: '•',
		operate: () => {
			MEM.update('•');
		},
	},
	divide: {
		key: document.getElementById('calc-divide'),
		value: '÷',
		operate: () => { 
			MEM.update('÷');
		},
	},
	init: () => {
		OPS.equals.key.innerText = OPS.equals.value;
		OPS.equals.key.addEventListener('click', OPS.equals.operate);

		OPS.add.key.innerText = OPS.add.value;
		OPS.add.key.addEventListener('click', OPS.add.operate);

		OPS.subtract.key.innerText = OPS.subtract.value;
		OPS.subtract.key.addEventListener('click', OPS.subtract.operate);

		OPS.multiply.key.innerText = OPS.multiply.value;
		OPS.multiply.key.addEventListener('click', OPS.multiply.operate);

		OPS.divide.key.innerText = OPS.divide.value;
		OPS.divide.key.addEventListener('click', OPS.divide.operate);
	},
}
MEM.init();
NUM.init();
OPS.init();

/*

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
*/