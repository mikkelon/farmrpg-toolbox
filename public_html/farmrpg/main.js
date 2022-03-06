//Wishing Well Search Tool
const wwButton = document.getElementById('ww-button');
const wwText = document.getElementById('ww-text');
const userInputBox = document.getElementById('ww-user-input');
const wwList = document.getElementById('ww-list');
const wwOutput = document.getElementById('ww-output');

//Function for creating list item in HTML document
function createListItem(string, list) {
    let li = document.createElement('li');
    li.innerHTML = string;
    list.appendChild(li);
};

//Function for searching through output array
function wwSearchOutputs(output) {
    return wwData.some((el1) => {
        return el1.outputs.some((el2) => {
            return el2.toLowerCase() === output.toLowerCase();
        });
    });
};

//Function for finding inputs
function elementHasOutput(array, string) {
    return array.some((element) => {
        return element.toLowerCase() === string.toLowerCase();
    });
};

function findPercentage(value) {
    let count = 0;
    wwData.forEach((element) => {
        if (element.input.toLowerCase() === value.toLowerCase()) {
            count++;
        };
    });
    let percentage = Math.floor(1 / count * 100);
    return percentage;
};

function findInput() {
    wwList.innerHTML = '';
    const userInput = userInputBox.value;
    //if-statement checks if userInput is found in any of the outputs arrays
    if (wwSearchOutputs(userInput) === true) {
        let inputsArray = [];
        wwData.forEach((element) => { //iterates through all elements in wwData
            if (elementHasOutput(element.outputs, userInput) === true) { //if-statement checks if element has what the user is looking for
                let arr = [];
                const percentage = Math.floor(1 / element.outputs.length * 100);
                arr.push(element.input); //pushes input for said output to an array inputsArray
                arr.push(percentage);
                inputsArray.push(arr);
            };
        });
        inputsArray.sort((a,b) => {return b[1] - a[1]});
        inputsArray.forEach((element) => { //itereates through all elements in inputsArray
            createListItem(`<strong>${element[0]}</strong> with a <strong>${element[1]}%</strong> drop chance.`, wwList); //Creates a list item for each element in inputsArray
        });
    } else {
        createListItem(`No outputs were found for '<strong>${userInput}</strong>'.`, wwList);
    };
};

/* function findInput() {
    wwOutput.innerHTML = userInputBox.value;
    wwList.innerHTML = '';
    const userInput = userInputBox.value.toLowerCase();
    let outputArr = [];
    wwData.forEach((element) => {
        if (element.output.toLowerCase() === userInput) {
            let percentage = 0;
            wwData.forEach((element2) => {
                if (element.input === element2.input) {
                    percentage++;
                };
            });
            percentage = Math.floor(1 / percentage * 100);
            let li = document.createElement('li');
            li.innerHTML = `<strong>${element.input}</strong> with a ${percentage}% chance to drop.`;
            wwList.appendChild(li);
        };
    });
}; */

//Event Listeners//
userInputBox.addEventListener('keydown', (event) => { //Event Listeners for input-box 'Enter' key.
    if (event.key === 'Enter') {
        event.preventDefault();
        findInput();
    }
})
wwButton.addEventListener('click', findInput); // Event listener for click on search button
