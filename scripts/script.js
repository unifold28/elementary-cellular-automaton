var automaton = new Automaton();
var display = new Display({automaton: automaton});

var main = new Main({automaton: automaton, display: display});

main.run();