// Manages the input changes and button presses
class Inputs{
    constructor(components){
        // Link components
        this.main = components.main;

        // Map inputs to functions
        this.inputBinds = {
            "neighbourhood-size": (value) => {
                value = parseInt(value);
                this.main.automaton.neighbourhoodSize = value;
                this.main.regenerate();
            },
            "rule-set-number": (value) => {
                value = parseInt(value);
                this.main.automaton.setDecimalRuleSet(value);
                this.main.regenerate();
            },
            "initial-state": (value) => {
                this.main.automaton.initialState = value;
                this.main.regenerate();
            },
        };

        this.buttonBinds = {
            "regenerate": () => {
                this.main.regenerate();
            },
            "randomise-rule-set": () => {
                var maxDecimalRule = Math.pow(2, Math.pow(2, this.main.automaton.neighbourhoodSize));
                var decimalRuleSet = Math.floor(Math.random() * maxDecimalRule);
                this.main.automaton.setDecimalRuleSet(decimalRuleSet);
                this.main.regenerate();

                this.setInputValues();
            },
        };

        this.inputValues = {
            "neighbourhood-size": () => {
                return this.main.automaton.neighbourhoodSize;
            },
            "rule-set-number": () => {
                return this.main.automaton.getDecimalRuleSet();
            },
            "initial-state": () => {
                return this.main.automaton.initialState;
            },
        };

        this.addListeners();
        this.setInputValues();
    };

    addListeners = function(){
        var self = this;

        var inputBindsKeys = Object.keys(this.inputBinds);
        // Adding event listeners inside a loop cause them to be added to the last element
        // So bring it out as a separate function
        function addInputListener(i){
            var id = inputBindsKeys[i];
            var element = document.getElementById(id);
            element.addEventListener("change", function(){
                var value = element.value;
                (self.inputBinds[id])(value);
            });
        }
        for(var i = 0; i < inputBindsKeys.length; i++){
            addInputListener(i);
        }

        var buttonBindsKeys = Object.keys(this.buttonBinds);
        // Same with the buttons
        function addButtonListener(i){
            var id = buttonBindsKeys[i];
            var element = document.getElementById(id);
            element.addEventListener("click", function(){
                (self.buttonBinds[id])();
            });
        }
        for(var i = 0; i < buttonBindsKeys.length; i++){
            addButtonListener(i);
        }
    };

    // Put actual parameters into HTML UI
    setInputValues(){
        var inputBindsKeys = Object.keys(this.inputValues);
        for(var i = 0; i < inputBindsKeys.length; i++){
            var id = inputBindsKeys[i];
            var element = document.getElementById(id);
            element.value = (this.inputValues[id])();
        }
    };
};