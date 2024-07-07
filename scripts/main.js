// Combines components
class Main{
    constructor(components){
        // Link components
        this.automaton = components.automaton;
        this.display = components.display;

        this.automaton.setDecimalRuleSet(109);
        this.automaton.size = Math.floor(this.display.width / 2);
        this.automaton.maxGeneration = this.display.height;

        this.run();
    };

    step(){
        this.automaton.step();
        this.display.update();
    };

    run(){
        while(this.automaton.generation < this.automaton.maxGeneration){
            this.step();
        }
    };

    reset(){
        this.automaton.reset();
        this.display.reset();
    };

    regenerate(){
        this.reset();
        this.run();
    }
};