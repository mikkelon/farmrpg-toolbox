//Wishing Well Search Tool
const wwButton = document.getElementById('ww-button');
const wwText = document.getElementById('ww-text');
const userInputBox = document.getElementById('ww-user-input');
const wwList = document.getElementById('ww-list');
const wwOutput = document.getElementById('ww-output');
const wwGrid = document.querySelector('.ww-grid');
const wwHeaderClass = document.querySelectorAll('.ww-header');

//Function for creating list item in HTML document
function createListItem(string, list) {
    let li = document.createElement('li');
    li.innerHTML = string;
    list.appendChild(li);
};

function createGridItem(input, percentage) {
    let htmlDiv1 = document.createElement('div');
    let htmlDiv2 = document.createElement('div');
    let cssClass1 = document.createAttribute('class');
    let cssClass2 = document.createAttribute('class');
    cssClass1.value = 'ww-row';
    htmlDiv1.innerHTML = `<p>${input}</p>`;
    htmlDiv1.setAttributeNode(cssClass1);
    wwGrid.appendChild(htmlDiv1);
    cssClass2. value = 'ww-row';
    htmlDiv2.innerHTML = `<p>${percentage}%</p>`;
    htmlDiv2.setAttributeNode(cssClass2);
    wwGrid.appendChild(htmlDiv2);
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
    if (document.querySelector('.ww-row') != null) {
        document.querySelectorAll('.ww-row').forEach(e => e.remove());
    };
    const userInput = userInputBox.value;
    if (userInput != '') {
        wwHeaderClass.forEach(e => e.style.display = 'flex');
        document.getElementById('error-msg').innerHTML = '';
    };
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
            createGridItem(element[0], element[1]);
        });
    } else if (userInput === '') {
        wwHeaderClass.forEach(e => e.style.display = 'none');
        document.getElementById('error-msg').innerHTML = 'You need to enter a search criteria.'
    } else {
        wwHeaderClass.forEach(e => e.style.display = 'none');
        document.getElementById('error-msg').innerHTML = `According to our data '<strong>${userInput}</strong>' cannot be acquired from the Wishing Well.`;
    };
    userInputBox.blur(); //deselect input box
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