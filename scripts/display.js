// Manages the canvas
class Display{
    constructor(components){
        // Link components
        this.automaton = components.automaton;

        this.element = document.getElementById("display");
        this.context = this.element.getContext("2d");

        // Get the size of a fullscreen div and make the canvas the same size
        var bounds = document.getElementById("container").getBoundingClientRect();
        this.width = Math.ceil(bounds.width);
        this.height = Math.ceil(bounds.height);

        // Set the canvas' size with JS because CSS makes it blurry
        this.element.setAttribute("width", this.width);
        this.element.setAttribute("height", this.height);
    };

    get cellSize(){
        return Math.round(this.width / this.automaton.size);
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

    reset(){
        this.context.fillStyle = "#ffffff";
        this.context.fillRect(0, 0, this.width, this.height);
    };
};