//Wishing Well Search Tool
const wwButton = document.getElementById('ww-button');
const wwText = document.getElementById('ww-text');
const userInputBox = document.getElementById('ww-user-input');
const wwList = document.getElementById('ww-list');
const wwOutput = document.getElementById('ww-output');
const wwGrid = document.getElementById('ww-grid');
const wwHeaderClass = document.querySelectorAll('.ww-header');
const wwResults = document.getElementsByClassName('ww-result');
const arrows = document.getElementsByClassName('exp-arrow');
const arrowsDown = document.getElementsByClassName('exp-arrow-down');

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
    htmlDiv1.innerHTML = `<p class="ww-result" id="${input}">${input}</p><i class="exp-arrow" id="${input}-arr"></i>`;
    htmlDiv1.setAttributeNode(cssClass1);
    wwGrid.appendChild(htmlDiv1);
    cssClass2.value = 'ww-row';
    htmlDiv2.innerHTML = `<p>${percentage}%</p>`;
    htmlDiv2.setAttributeNode(cssClass2);
    wwGrid.appendChild(htmlDiv2);
};

function createGridIemExp(a) {
    let htmlDiv1 = document.createElement('div');
    let htmlDiv2 = document.createElement('div');
    let cssClass1 = document.createAttribute('class');
    let cssClass2 = document.createAttribute('class');
    cssClass1.value = 'ww-exp-grid';
    htmlDiv1.setAttributeNode(cssClass1);
    htmlDiv1.setAttribute('id',`${a}-exp`);
    wwData.forEach(e => {
        if (e.input === a) {
            e.outputs.forEach(e2 => {
                let newDiv = document.createElement('div');
                let newAtt = document.createAttribute('class');
                newAtt.value = 'ww-exp-grid-item';
                newDiv.setAttributeNode(newAtt);
                newDiv.innerHTML = `<p>${e2}</p>`;
                htmlDiv1.appendChild(newDiv);
            });
        };
    });
    wwGrid.appendChild(htmlDiv1);
    cssClass2.value = 'ww-row ww-filler';
    htmlDiv2.setAttribute('id',`${a}-expf`)
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

function expandResult(event) {
    //alert(event.target.id.replace('-arr',''));
    event.target.style.transform = 'rotate(45deg)';
    document.getElementById(event.target.id.replace('-arr','') + '-exp').style.display = 'grid';
    document.getElementById(event.target.id.replace('-arr','') + '-expf').style.display = 'block';
    document.getElementById(event.target.id).removeEventListener('click', expandResult);
    document.getElementById(event.target.id).addEventListener('click', contractResult);
};

function contractResult(event) {
    //alert(event.target.id.replace('-arr',''));
    event.target.style.transform = 'rotate(-45deg)';
    document.getElementById(event.target.id.replace('-arr','') + '-exp').style.display = 'none';
    document.getElementById(event.target.id.replace('-arr','') + '-expf').style.display = 'none';
    document.getElementById(event.target.id).removeEventListener('click', contractResult);
    document.getElementById(event.target.id).addEventListener('click', expandResult);
};

function findInput(searchCriteria) {
    if (document.querySelector('.ww-row') != null) {
        document.querySelectorAll('.ww-row').forEach(e => e.remove());
    };
    if (searchCriteria != '') {
        wwHeaderClass.forEach(e => e.style.display = 'flex');
        document.getElementById('error-msg').innerHTML = '';
    };
    //if-statement checks if userInput is found in any of the outputs arrays
    if (wwSearchOutputs(searchCriteria) === true) {
        let inputsArray = [];
        wwData.forEach((element) => { //iterates through all elements in wwData
            if (elementHasOutput(element.outputs, searchCriteria) === true) { //if-statement checks if element has what the user is looking for
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
            createGridIemExp(element[0]);
            document.getElementById(element[0] + '-arr').addEventListener('click', expandResult);
        });
        document.getElementById('ww-h2').innerHTML = `Looking for <strong>${searchCriteria}</strong>`
    } else if (searchCriteria === '') {
        document.getElementById('ww-h2').innerHTML = '';
        wwHeaderClass.forEach(e => e.style.display = 'none');
        document.getElementById('error-msg').innerHTML = 'You need to enter a search criteria.'
    } else {
        document.getElementById('ww-h2').innerHTML = '';
        wwHeaderClass.forEach(e => e.style.display = 'none');
        document.getElementById('error-msg').innerHTML = `According to our data '<strong>${searchCriteria}</strong>' cannot be acquired from the Wishing Well.`;
    };
    userInputBox.blur(); //deselect input box
    //Add eventListeners for all results created
    Array.from(wwResults).forEach(e => {
        e.addEventListener('click', findInputByResult);
    });
    //Add eventListeners for all arrows created
    /*Array.from(arrows).forEach(e => {
        e.addEventListener('click', expandResult);
    });*/
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
        findInput(userInputBox.value);
    }
});
wwButton.addEventListener('click', () => {
    findInput(userInputBox.value);
}); // Event listener for click on search button
window.addEventListener('DOMContentLoaded', createSuggestionList); //Creates suggestion list for wwSearchTool input box

function findInputByResult(event) {
    let targetID = event.target.id;
    findInput(targetID);
    userInputBox.value = targetID;
};

/* Array.from(wwResults).forEach(e => {
    e.addEventListener('click', findInputByResult);
}) */