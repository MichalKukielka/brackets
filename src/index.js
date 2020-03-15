module.exports = function check(str, bracketsConfig) {

    const openers = [];
    const closers = []
    bracketsConfig.forEach(x => {
        openers.push(x[0]);
        closers.push(x[1]);
    });

    const input = str.split('');
    let stack = [];

    for (let i = 0; i < input.length; i++) {
        if (openers.some(x => x === input[i])) {  // opener at i index
            if (closers.some(x => x === input[i])) {  // opener and closer are the same
                if (stack.slice(-1)[0] === input[i]) { // check if current input is the same as last at the stack
                    stack.pop();
                } else {
                    stack.push(input[i])
                }
            } else {
                stack.push(input[i])
            }
        } else if (closers.some(x => x === input[i])) {  //closer at i index
            if (stack.slice(-1)[0] === openers[closers.indexOf(input[i])]) { // check if last element on stack is opener which corresponds to current input
                stack.pop();
            } else {
                return false; // mismatched opener and closer found
            }
        }

    }

    return stack.length ? false : true // stack is empty when amount of corresponding openers and closers are the same and was placed in 'right' order

}