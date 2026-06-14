const simScreen = document.getElementById('sim-screen');
const cellSlider = document.getElementById('cell-slider');
const cellCountText = document.getElementById('cell-count-text');
const mitosisBtn = document.getElementById('mitosis-btn');
const resetBtn = document.getElementById('reset-btn');

let cells = [];

class Cell {
    constructor(x = null, y = null) {
        this.element = document.createElement('div');
        this.element.classList.add('cell');
        
        this.x = x !== null ? x : Math.random() * (simScreen.clientWidth - 20);
        this.y = y !== null ? y : Math.random() * (simScreen.clientHeight - 20);
        
        this.dx = (Math.random() - 0.5) * 4;
        this.dy = (Math.random() - 0.5) * 4;
        
        this.updatePosition();
        simScreen.appendChild(this.element);
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x <= 0 || this.x >= simScreen.clientWidth - 20) this.dx *= -1;
        if (this.y <= 0 || this.y >= simScreen.clientHeight - 20) this.dy *= -1;

        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    destroy() {
        this.element.remove();
    }
}

function initSimulation(count) {
    clearSimulation();
    for (let i = 0; i < count; i++) {
        cells.push(new Cell());
    }
    cellCountText.innerText = cells.length;
}

function clearSimulation() {
    cells.forEach(cell => cell.destroy());
    cells = [];
    cellCountText.innerText = 0;
}

function animate() {
    cells.forEach(cell => cell.move());
    requestAnimationFrame(animate);
}

cellSlider.addEventListener('input', (e) => {
    initSimulation(e.target.value);
});

mitosisBtn.addEventListener('click', () => {
    const currentLength = cells.length;
    if (currentLength >= 60) return;

    for (let i = 0; i < currentLength; i++) {
        let parentCell = cells[i];
        cells.push(new Cell(parentCell.x + 10, parentCell.y + 10));
    }
    cellCountText.innerText = cells.length;
    cellSlider.value = cells.length;
});

resetBtn.addEventListener('click', () => {
    cellSlider.value = 10;
    initSimulation(10);
});

initSimulation(10);
animate();