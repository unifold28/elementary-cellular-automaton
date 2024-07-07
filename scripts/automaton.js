// Manages cells, rules, generations, etc.
class Automaton{
    constructor(){
        this.size = 256;

        this.generation = 0;
        this.maxGeneration = this.size;

        this.cells = [];
        this.previousCells = [];

        this.neighbourhoodSize = 3;
        this.ruleSet = [];
        this.setDeicmalRuleSet(30);

        this.initalStates = {
            CENTER_CELL: () => {
                for(var i = 0; i < this.size; i++){
                    // Set the center cell to 1, other cells to 0
                    var value = 0; 
                    if(i == Math.floor(this.size / 2)){
                        value = 1;
                    }
        
                    this.cells[i] = value;
                }
            },
            RANDOM: () => {
                // Randomize cells
                for(var i = 0; i < this.size; i++){
                    this.cells[i] = Math.round(Math.random());
                }
            }
        };
        this.initalState = "RANDOM";
    };

    step(){
        if(this.generation == 0){
            (this.initalStates[this.initalState])();
        }else{
            // Copy the array without object reference
            for(var i = 0; i < this.cells.length; i++){
                this.previousCells[i] = this.cells[i];
            }

            for(var i = 0; i < this.cells.length; i++){
                // Which rule (index) to use in the ruleset
                var rule = 0;
                for(var j = 0; j < this.neighbourhoodSize; j++){
                    var index = i - (this.neighbourhoodSize - 1) / 2 + j;

                    // Use another formula for the modulo since JS gives wrong values for negatives
                    index = ((index % this.size) + this.size) % this.size;

                    // Use binary to convert neighbours to rule index
                    var exponent = this.neighbourhoodSize - 1 - j;
                    var bit = 1 - this.previousCells[index];
                    rule += bit * Math.pow(2, exponent);
                }
                this.cells[i] = this.ruleSet[rule];
            }
        }
        this.generation++;
    };

    reset(){
        this.generation = 0;
        this.cells = [];
        this.previousCells = [];
    };

    // Accepts a usual (decimal) number
    // Converts it into binary and writes it to the rule set
    setDeicmalRuleSet(number){
        var ruleSet = [];
        number = number.toString(2);
        for(var i = 0; i < number.length; i++){
            var bit = parseInt(number[i], 10);
            ruleSet.push(bit);
        }
        while(ruleSet.length < Math.pow(2, this.neighbourhoodSize)){
            ruleSet.unshift(0);
        }
        this.ruleSet = ruleSet;
    };
};