// Define character classes
const LETTER = 0;
const DIGIT = 1;
const UNKNOWN = 99;
const EOF = -1;

// Define token codes
const INT_LIT = 1;       // Integer literal
const IDENT = 2;         // Identifier
const ASSIGN_OP = 3;     // Assignment operator (=)
const ADD_OP = 4;        // Addition operator (+)
const SUB_OP = 5;        // Subtraction operator (-)
const MULT_OP = 6;       // Multiplication operator (*)
const DIV_OP = 7;        // Division operator (/)
const LEFT_PAREN = 8;    // Left parenthesis '('
const RIGHT_PAREN = 9;   // Right parenthesis ')'

// Global variables
let input = "(sum + 47) / total"; // Input string
let charClass;
let lexeme = "";
let nextChar;
let nextToken;
let position = 0;

// Function to add character to lexeme
function addChar() {
    lexeme += nextChar;
}

// Function to get the next character
function getChar() {
    if (position < input.length) {
        nextChar = input[position++];
        if (/[a-zA-Z]/.test(nextChar)) {
            charClass = LETTER;
        } else if (/[0-9]/.test(nextChar)) {
            charClass = DIGIT;
        } else {
            charClass = UNKNOWN;
        }
    } else {
        charClass = EOF;
    }
}

// Function to skip white spaces
function getNonBlank() {
    while (/\s/.test(nextChar)) {
        getChar();
    }
}

// Function to lookup operators and parentheses
function lookup(ch) {
    switch (ch) {
        case "(":
            addChar();
            nextToken = LEFT_PAREN;
            break;
        case ")":
            addChar();
            nextToken = RIGHT_PAREN;
            break;
        case "+":
            addChar();
            nextToken = ADD_OP;
            break;
        case "-":
            addChar();
            nextToken = SUB_OP;
            break;
        case "*":
            addChar();
            nextToken = MULT_OP;
            break;
        case "/":
            addChar();
            nextToken = DIV_OP;
            break;
        default:
            addChar();
            nextToken = EOF;
            break;
    }
}

// Lexical analyzer
function lex() {
    lexeme = "";
    getNonBlank();
    switch (charClass) {
        case LETTER: // Parse identifiers
            addChar();
            getChar();
            while (charClass === LETTER || charClass === DIGIT) {
                addChar();
                getChar();
            }
            nextToken = IDENT;
            break;

        case DIGIT: // Parse integer literals
            addChar();
            getChar();
            while (charClass === DIGIT) {
                addChar();
                getChar();
            }
            nextToken = INT_LIT;
            break;

        case UNKNOWN: // Parentheses and operators
            lookup(nextChar);
            getChar();
            break;

        case EOF: // End of file
            nextToken = EOF;
            lexeme = "EOF";
            break;
    }
    console.log(`Next token is: ${nextToken}, Next lexeme is: ${lexeme}`);
    return nextToken;
}

// Main driver
function main() {
    getChar();
    do {
        lex();
    } while (nextToken !== EOF);
}

// Run the lexical analyzer
main();

