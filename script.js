const gridContainer = document.querySelector('.grid-container');
const penControl = document.querySelector('.pen');
const eraserControl = document.querySelector('.eraser');
const rainbowControl = document.querySelector('.rainbow');

const backgroundChanger = document.querySelector('.background-changer');
const penColorChanger = document.querySelector('.pen-color-changer');

const gridLineSwitch = document.querySelector('input[type=checkbox]');


setUpGrid();
gridLines();
setUpBackgroundColor();
function setUpGrid(size = 35) {
    //REFRESH
    gridContainer.innerHTML = "";
    gridContainer.style.cssText = `grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr);`;
    const rangeNum = document.querySelector('.grid-range-num');
    for(let x = 0; x < size; x++) {
        for(let y = 0; y < size; y++) {
            const div = document.createElement('div');
            div.classList.add("square");
            gridContainer.appendChild(div)
        }
    }
    rangeNum.innerHTML = `${size} <i class="fas fa-times"></i> ${size}`;
    clickEvent();
    gridLines();
    setUpBackgroundColor();

}



function gridLines() {
    const squares = document.querySelectorAll('.square');
    if(gridLineSwitch.checked == false) {
        squares.forEach(element => {
            element.classList.add('grid-lines-disable');
            element.classList.remove("grid-lines-active")
        });
    } else {
        squares.forEach(element => {
            element.classList.remove('grid-lines-disable');
            element.classList.add('grid-lines-active')
        });
        
    }
}

gridLineSwitch.addEventListener('change', gridLines);
penColorChanger.addEventListener('input', penActivate);




function setUpBackgroundColor() {
    gridContainer.style.backgroundColor = backgroundChanger.value;
}
backgroundChanger.addEventListener('input', setUpBackgroundColor);

//CONTROLS - PEN - ERASER - RAINBOW
//one will be enabled others will be disabled
let penColor = penColorChanger.value;
let rainbowActive = false;
let eraserActive = false;
penControl.addEventListener('click', penActivate);

function penActivate() {
    penColor = penColorChanger.value;
    eraserActive = false;
    rainbowActive = false
    penControl.classList.add('active');
    eraserControl.classList.remove('active');
    rainbowControl.classList.remove('active');
}

eraserControl.addEventListener('click', () => {
    eraserActive = true;
    rainbowActive = false;
    penControl.classList.remove('active');
    eraserControl.classList.add('active');
    rainbowControl.classList.remove('active');
})


rainbowControl.addEventListener('click', () => {
    rainbowActive = true;
    eraserActive = false;
    penControl.classList.remove('active');
    eraserControl.classList.remove('active');
    rainbowControl.classList.add('active');
});

//RAINBOW PEN FUNCTION


//SKETCH
function clickEvent() {
    const squares = document.querySelectorAll('.square');
    let colorCode = 1;
    squares.forEach((square) => {
        square.addEventListener('mousemove', (e)=> {
            if(e.buttons === 1) {
                if(eraserActive == true){
                    square.style.backgroundColor = ""
                } else if(rainbowActive == true) {
                    if(colorCode <= 360) {
                        square.style.cssText = `background-color: hsl(${colorCode}, 100%, 50%)`;
                        colorCode++;
                    } else {
                        colorCode = 20;
                    }
                } else {
                    square.style.cssText = `background-color: ${penColor}`
                }
            }
        })
    });
}




//slider function
const gridRange = document.querySelector('.grid-range');
gridRange.addEventListener("input", () => {
    setUpGrid(gridRange.value);
})

document.querySelector('.reset-button').addEventListener('click', () => {
    setUpGrid(gridRange.value);
})