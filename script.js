// Define and Fill NumKey
const numKey = {}

for (let i = 0; i < 10; i++) {
	numKey[i] = document.getElementById(`calc-${i}`);
	numKey[i].innerText = `${i}`;
	numKey[i].addEventListener('click', () => {
		console.log(parseInt(numKey[i].innerText));
	});
}

// Declare Display 
const displayHistory = document.getElementById('display-history');
const displayEntry = document.getElementById('display-entry');

displayHistory.innerText = 'History (temp)';
displayEntry.innerText = 'Entry (temp)';