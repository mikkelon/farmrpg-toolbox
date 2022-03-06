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
        createListItem(`According to our data '<strong>${userInput}</strong>' cannot be acquired from the Wishing Well.`, wwList);
    };
};

function createSuggestionList() {
    let allOutputs = [];
    wwData.forEach((element1) => {
        element1.outputs.forEach((element2) => {
            allOutputs.push(element2);
        });
    });
    let uniqueOutputs = [...new Set(allOutputs)];
    uniqueOutputs.sort();
    uniqueOutputs.forEach((element) => {
        let optionElement = document.createElement('option');
        let attribute = document.createAttribute('value');
        const suggestions = document.getElementById('suggestions');
        attribute.value = element;
        optionElement.setAttributeNode(attribute);
        suggestions.appendChild(optionElement);
    });
};

//Event Listeners//
userInputBox.addEventListener('keydown', (event) => { //Event Listeners for input-box 'Enter' key.
    if (event.key === 'Enter') {
        event.preventDefault();
        findInput();
    }
})
wwButton.addEventListener('click', findInput); // Event listener for click on search button

window.addEventListener('DOMContentLoaded', createSuggestionList); //Creates suggestion list for wwSearchTool input box