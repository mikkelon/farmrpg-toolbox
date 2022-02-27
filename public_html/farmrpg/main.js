const btnPlus = document.getElementById('button-plus');
const btnMinus = document.getElementById('button-minus');
const counttxt = document.getElementById('counter');
let count = 0;

function updateCount() {
    counttxt.innerHTML = count;
}

updateCount();

btnPlus.addEventListener("click", () => {
    count++;
    updateCount();
});

btnMinus.addEventListener("click", () => {
    count--;
    updateCount();
});