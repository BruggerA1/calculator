const MEM = {
	value: {
		current: null,
		previous: null,
		set: value => MEM.value.current = parseFloat(value),
		update: () => {
			MEM.value.previous = parseFloat(MEM.entry.get());
			MEM.value.set(0);
			MEM.entry.clear();
		}
	},
	entry: {
		display: document.getElementById('display-entry'),
		register: [],
		get: () => MEM.entry.display.innerText,
		set: value => MEM.entry.display.innerText = value,
		clear: () => {
			MEM.entry.set(0);
			MEM.entry.register = [];
		},
	},
	history: {
		display: document.getElementById('display-history'),
		register: [],
		set: value => MEM.history.display.innerText = value,
		update: operation => {
			MEM.history.register.push(MEM.entry.get());
			if (operation != null) MEM.history.register.push(operation);
			MEM.history.set(MEM.history.register.join(' '));
		},
	},
	init: () => {
		MEM.entry.set(0);
		MEM.history.set('History (temp)');
		MEM.value.update(MEM.value.set(0));

	},
};

const NUM = {
	key: {
		'dec': document.getElementById('calc-decimal'),
	},
	value: {
		'dec': '.',
	},
	input: num => {
		if (num == '.') {
			if (MEM.entry.register[0] == undefined) MEM.entry.register.push(0);
			NUM.key['dec'].disabled = true;
		}
		MEM.entry.register.push(num);
		MEM.entry.set(MEM.entry.register.join(''));
		MEM.value.set(MEM.entry.get());
	},
	init: () => {
		for (let i = 0; i < 10; i++){
			NUM.key[i] = document.getElementById(`calc-${i}`);
			NUM.value[i] = document.getElementById(`calc-${i}`).innerText = i;
			NUM.key[i].addEventListener('click', () => NUM.input(i));
		}
		NUM.key['dec'].innerText = NUM.value['dec'];
		NUM.key['dec'].addEventListener('click', () => NUM.input('.'));
	},
};

const OPS = {
	equals: {
		key: document.getElementById('calc-equals'),
		value: '=',
		operate: () => {
			MEM.value.update((MEM.entry.get()));
			MEM.history.update();
		},
	},
	add: {
		key: document.getElementById('calc-add'),
		value: '+',
		operate: () => {
			MEM.history.update('+');
			MEM.value.update();
		},
	},
	subtract: {
		key: document.getElementById('calc-subtract'),
		value: '-',
		operate: () => {
			MEM.history.update('-');
			MEM.value.update();
		},
	},
	multiply: {
		key: document.getElementById('calc-multiply'),
		value: '•',
		operate: () => {
			MEM.history.update('•');
			MEM.value.update();
		},
	},
	divide: {
		key: document.getElementById('calc-divide'),
		value: '÷',
		operate: () => {
			MEM.history.update('÷');
			MEM.value.update();
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
};

MEM.init();
NUM.init();
OPS.init();