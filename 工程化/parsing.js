//! (add 2 (subtract 4 2))

[
    { type: 'paren', value: '(' },
    { type: 'name', value: 'add' },
    { type: 'number', value: '2' },
    { type: 'paren', value: '(' },
    { type: 'name', value: 'subtract' },
    { type: 'number', value: '4' },
    { type: 'number', value: '2' },
    { type: 'paren', value: ')' },
    { type: 'paren', value: ')' },
]

let NUMBERS = /[0-9]/
if (NUMBERS.test(char)) {
    let value = ''
    while (NUMBERS.test(char)) {
        value += char
        char = input[++current]
    }
    tokens.push({type: 'number', value})
    continue
}

let LETTERS = /[a-z]/i
if (LETTERS.test(char)) {
    let value = ''
    while (LETTERS.test(char)) {
        value += char
        char = input[++current]
    }
    tokens.push({type: 'name', value})
    continue
}

function compiler(input) {
    let tokens = tokenizer(input)
    let ast = parser(tokens)
    let newAst = transformer(ast)
    let output = codeGenerator(newAst)
    return output
}
