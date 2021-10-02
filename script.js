const MEM = {
	value: {
		current: null,
		previous: null,
		get: () => MEM.value.current,
		getOld: () => MEM.value.previous,
		set: value => MEM.value.current = value,
		update: value => {
			// Set previous value to current value. 
			MEM.value.previous = MEM.value.get();
			// Set current value to passed variable. 
			MEM.value.set(value);
		}
	},
	answer: {
		value: null,
		get: () => MEM.answer.value,
		set: value => MEM.answer.value = value,
	},
	operation: {
		current: null,
		previous: null,
		get: () => MEM.operation.current,
		getOld: () => MEM.operation.previous,
		set: value => MEM.operation.current = value,
		update: value => {
			MEM.operation.previous = MEM.operation.get();
			MEM.operation.set(value);
		}
	},
	entry: {
		display: document.getElementById('display-entry'),
		register: [],
		get: () => MEM.entry.display.innerText,
		set: value => MEM.entry.display.innerText = value,
		update: value => {
			// Add the passed variable to the entry register.
			MEM.entry.register.push(value);
			// Combine the entire array and display it in the entry screen.
			MEM.entry.set(MEM.entry.register.join(''));
			// Get the number displayed in the entry screen and set it as the current value.
			MEM.value.set(MEM.entry.get());

			// DEBUG MODE

		},
	},
	history: {
		display: document.getElementById('display-history'),
		register: [],
		get: () => MEM.history.register,
		set: value => MEM.history.display.innerText = value,
		update: value => {
			// Add the passed variable to the history register.
			MEM.history.register.push(value);
			// Combine the array and display it in the history screen.
			MEM.history.set(MEM.history.register.join(' '));
		},
	},
	init: () => {
		// Inital GUI display values.
		MEM.entry.set(0);
		MEM.history.set('History (temp)');
	},
};

const NUM = {
	key: {
		'dec': document.getElementById('calc-decimal'),
	},
	value: {
		'dec': '.',
	},
	input: value => {
		// Handle decimal input.
		if (value == '.') {
			NUM.key['dec'].disabled = true;
			if (MEM.entry.register[0] == undefined) MEM.entry.update(0);
		};
		// Add number to display
		MEM.entry.update(value);

	},
	init: () => {
		for (let i = 0; i < 10; i++) {
			// assign HTML elements to the numpad object.
			NUM.key[i] = document.getElementById(`calc-${i}`);
			// apply number to button text.
			NUM.value[i] = document.getElementById(`calc-${i}`).innerText = i;
			// add event for input.
			NUM.key[i].addEventListener('click', () => NUM.input(i));
		};
		NUM.key['dec'].innerText = NUM.value['dec'];
		NUM.key['dec'].addEventListener('click', () => NUM.input('.'));
	},
};

const OPS = {
	equals: {
		value: '=',
		input: () => {
			OPS.input('equals');
		},
		// Add Input Functions
	},
	add: {
		name: 'add',
		value: '+',
		input: () => {
			OPS.input('add')
	},
		operate: () => {
			return (MEM.answer.get() == null) ? parseFloat(MEM.value.getOld()) + parseFloat(MEM.value.get()) : parseFloat(MEM.answer.get()) + parseFloat(MEM.value.get());
		}
	},
	subtract: {
		name: 'subtract',
		value: '-',
		input: () => {
			OPS.input('subtract');
		},
		operate: () => {
			return (MEM.answer.get() == null) ? parseFloat(MEM.value.getOld()) - parseFloat(MEM.value.get()) : parseFloat(MEM.answer.get()) - parseFloat(MEM.value.get());
		}
	},
	multiply: {
		name: 'multiply',
		value: '•',
		input: () => {
			OPS.input('multiply');
		},
		operate: () => {
			return (MEM.answer.get() == null) ? parseFloat(MEM.value.getOld()) * parseFloat(MEM.value.get()) : parseFloat(MEM.answer.get()) * parseFloat(MEM.value.get());
		},
	},
	divide: {
		name: 'divide',
		value: '÷',
		input: () => {
			OPS.input('divide');
		},
		operate: () => {
			return (MEM.answer.get() == null) ? parseFloat(MEM.value.getOld()) / parseFloat(MEM.value.get()) : parseFloat(MEM.answer.get()) / parseFloat(MEM.value.get());
		},
	},
	init: () => {
		let operationArray = ['equals', 'add', 'subtract', 'multiply', 'divide'];
		operationArray.forEach(operation => {
			OPS[operation].key = document.getElementById(`calc-${operation}`);
			OPS[operation].key.innerText = OPS[operation].value;
			OPS[operation].key.addEventListener('click', OPS[operation].input);
		});
	},
	input: (opValue) => {
		MEM.operation.update(OPS[opValue].name);
		MEM.history.update(MEM.entry.get());
		MEM.history.update(OPS[opValue].value);
		MEM.entry.register = [];
		if (MEM.operation.getOld() == null) {
			MEM.entry.set(0);
		} else {
			MEM.answer.set(OPS[MEM.operation.getOld()].operate())
			MEM.entry.set(MEM.answer.get());
		}
		MEM.operation.set(OPS[opValue].name);
	
		MEM.value.update(MEM.entry.get());
		NUM.key['dec'].disabled = false;

	}
};

function init() {
	// Initialize all objects.
	MEM.init();
	NUM.init();
	OPS.init();
}

init();

//testing
{
	function test() {
		console.log(`\n`);
		console.log(`Current: ${MEM.value.current} | Previous: ${MEM.value.previous}`);
		console.log(`Answer: ${MEM.answer.value}`);
		console.log(`Current Operation: ${MEM.operation.current} | Previous: ${MEM.operation.previous}`);
		console.log(`Entry Register: [${MEM.entry.register}]`);
		console.log(`History Register: [${MEM.history.register}]`);
		console.log(`\n`);
	}

	testStats = document.getElementById('calc-func1');
	testStats.innerText = 'STATS (test)';
	testStats.addEventListener('click', test);

	testClear = document.getElementById('calc-func2');
	testClear.innerText = 'CLEAR (test)';
	testClear.addEventListener('click', () => {

		MEM.entry.register = [];
		MEM.history.register = [];
		MEM.history.set('');
		MEM.entry.update(null);
		MEM.answer.set(null);
		MEM.operation.set(null);
		MEM.value.set(null);
		MEM.value.update(null);

	});
}