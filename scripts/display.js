// Manages the canvas
class Display{
    constructor(components){
        // Link components
        this.automaton = components.automaton;

        this.element = document.getElementById("display");
        this.context = this.element.getContext("2d");

        // Canvas size in px
        this.width = 512;
        this.height = 512;

        this.cellSize = this.width / this.automaton.size;

        // Set the canvas' size with JS because CSS makes it blurry
        this.element.setAttribute("width", this.width);
        this.element.setAttribute("height", this.height);
    };

    setCell(cell, state){
        var x = cell * this.cellSize;
        // Since the generation was incremented already, subtract 1
        var y = (this.automaton.generation - 1) * this.cellSize

        this.context.fillStyle = state == 1 ? "#000000" : "#ffffff";
        this.context.fillRect(x, y, this.cellSize, this.cellSize);
    };

    update(){
        for(var i = 0; i < this.automaton.size; i++){
            this.setCell(i, this.automaton.cells[i]);
        }
    };
};