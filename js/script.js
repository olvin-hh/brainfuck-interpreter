$(function() {
    var memorySize = 20;
    var wordSize = 256;

    var memoryDisplay = $('#memory');
    var outputField = $('#output');

    var memory;
    var memoryPointer;

    $('#start').click(function() {
        memory = [];
        for (var i = 0; i < memorySize; i++) {
            memory.push(0);
        }
        memoryPointer = 0;

        var code = $('#code').val();
        interpret(code, 0, code.length);
    });

    $('#test').click(function() {

    });

    function findClosingBracket(start, text) {
        var bracketCount = 0;
        var index = start;
        do {
            if (index > (text.length - 1)) {
                console.log('Error: Unexpected end of line while closing bracket searching');
                return;
            }
            if (text[index] == '[') {
                bracketCount++;
            }
            if (text[index] == ']') {
                bracketCount--;
            }
            index++;
        } while (bracketCount > 0);
        return index - 1;
    }

    function interpret(code, start, end) {
        for (var codePointer = start; codePointer < end; codePointer++) {
            switch (code[codePointer]) {
                case '.':
                    printToOutput(memory[memoryPointer]);
                    break;

                case ',':

                    break;

                case '+':
                    memory[memoryPointer]++;
                    if (memory[memoryPointer] > (wordSize - 1)) {
                        memory[memoryPointer] = 0;
                    }
                    showMemory(memory);
                    break;

                case '-':
                    memory[memoryPointer]--;
                    if (memory[memoryPointer] < 0) {
                        memory[memoryPointer] = (wordSize - 1);
                    }
                    showMemory(memory);
                    break;

                case '>':
                    if ((memoryPointer + 2) < memorySize) {
                        memoryPointer++;
                    } else {
                        memoryPointer = 0;
                    }
                    break;

                case '<':
                    if (memoryPointer > 0) {
                        memoryPointer--;
                    } else {
                        memoryPointer = memorySize - 1;
                    }
                    break;

                case '[':
                    var closingBracketPosition = findClosingBracket(codePointer, code);
                    while (memory[memoryPointer]) {
                        interpret(code, codePointer + 1, closingBracketPosition);
                    }
                    codePointer = closingBracketPosition;
                    break;

                case ']':
                    console.log('Error: met closing bracket!');
                    break;

                default:
                    //console.log('Unknown character');
            }
        }
    }

    function showMemory(memory) {
        memoryDisplay.text(memory.join(','));
    }

    function printToOutput(byte) {
        var char;
        if (byte == 10) {
            char = '<br>';
        } else {
            char = String.fromCharCode(byte);
        }
        var newOutput = outputField.html() + char;
        outputField.html(newOutput);
    }
});