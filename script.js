function optimizeCode() {
    console.log("Optimize button clicked");
    var inputCode = document.getElementById("inputCode").value.trim();
    if (inputCode === "") {
        alert("Please enter some code.");
        return;
    }

    var optimizations = getSelectedOptimizations();
    console.log("Selected optimizations:", optimizations);

    if (optimizations.length === 0) {
        alert("Please select at least one optimization.");
        return;
    }

    inputCode = applyOptimizations(inputCode, optimizations);

    document.getElementById("optimizedCode").innerText = inputCode;
}

function getSelectedOptimizations() {
    var optimizations = [];
    var checkboxes = document.querySelectorAll('.options input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            optimizations.push(checkbox.id);
        }
    });
    return optimizations;
}

function applyOptimizations(inputCode, optimizations) {
    optimizations.forEach(function(opt) {
        console.log("Applying optimization:", opt);
        switch (opt) {
            case "constantFolding":
                inputCode = constantFolding(inputCode);
                break;
            case "deadCodeElimination":
                inputCode = deadCodeElimination(inputCode);
                break;
            case "commonSubexpressionElimination":
                inputCode = commonSubexpressionElimination(inputCode);
                break;
            case "loopOptimization":
                inputCode = loopOptimization(inputCode);
                break;
            case "inlineExpansion":
                inputCode = inlineExpansion(inputCode);
                break;
            case "registerAllocation":
                inputCode = registerAllocation(inputCode);
                break;
            case "instructionScheduling":
                inputCode = instructionScheduling(inputCode);
                break;
            case "codeMotion":
                inputCode = codeMotion(inputCode);
                break;
            default:
                break;
        }
    });
    return inputCode;
}

function constantFolding(code) {
    console.log("Applying constant folding");
    return code.replace(/(\d+)\s*[\*\/]\s*(\d+)/g, function (match, p1, p2) {
        return parseInt(p1) * parseInt(p2);
    }).replace(/(\d+)\s*[\+\-]\s*(\d+)/g, function (match, p1, p2) {
        return parseInt(p1) + parseInt(p2);
    }).replace(/-(\d+)/g, function (match, p1) {
        return -parseInt(p1);
    });
}

function deadCodeElimination(code) {
    console.log("Applying dead code elimination");
    return code.replace(/console\.log\(.+?\);/g, '');
}

function commonSubexpressionElimination(code) {
    console.log("Applying common subexpression elimination");
    var variables = {};

    // Replace expressions with common subexpressions
    code = code.replace(/(\w+)\s*([\+\-\*\/])\s*(\w+)/g, function(match, p1, p2, p3) {
        // Check if the entire expression is a common subexpression
        var subexpr = p1 + p2 + p3;
        if (variables[subexpr]) {
            // Replace the expression with the variable
            return variables[subexpr];
        } else {
            // Store the expression as a common subexpression
            var variableName = "common" + Object.keys(variables).length;
            variables[subexpr] = variableName;
            return variableName;
        }
    });

    return code;
}


function loopOptimization(code) {
    console.log("Applying loop optimization");
    return code.replace(/for\s*\(([^;]+);\s*([^;]+);\s*([^)]+)\)\s*{[^}]+}/g, function (match, init, condition, increment) {
        var limit = condition.split('<')[1].trim();

        // Check if the limit is not a valid number
        if (isNaN(limit) || limit <= 0) {
            // If the limit is NaN or non-positive, return an empty string
            return '';
        } else if (limit === 1) {
            // If the limit is 1, return a single iteration loop
            return match; // Return the original loop
        } else {
            // For all other cases, decrement the limit by 1
            return match; // Return the original loop
        }
    });
}


function inlineExpansion(code) {
    console.log("Applying inline expansion");
    return code.replace(/calculate\s*\(\s*(\w+)\s*,\s*(\w+)\s*\)/g, function(match, p1, p2) {
        return '(' + p1 + ' * ' + p2 + ')';
    }).replace(/function\s*\(\s*(\w+)\s*\*\s*(\w+)\s*\)\s*\{\s*return\s*calculate\s*\(\s*\1\s*,\s*\2\s*\)\s*\+\s*calculate\s*\(\s*\1\s*,\s*\2\s*\)\s*;\s*\}/g, function(match, p1, p2) {
        return '(' + p1 + ' * ' + p2 + ') + (' + p1 + ' * ' + p2 + ')';
    });
}


function registerAllocation(code) {
    console.log("Applying register allocation");

    // Define a map to store variable-to-register mappings
    var variableMap = new Map();

    // Counter for available registers
    var registerCounter = 0;

    // Regular expression to match variable declarations and usages
    var varRegex = /var\s+(\w+)\s*=/g;

    // Replace variable names with registers
    code = code.replace(varRegex, function(match, p1) {
        // If the variable is not mapped to a register, assign a new register
        if (!variableMap.has(p1)) {
            variableMap.set(p1, 'reg' + registerCounter);
            registerCounter++;
        }
        // Replace variable with register
        return variableMap.get(p1) + ' =';
    });

    // Replace variable usages with registers
    variableMap.forEach(function(register, variable) {
        var regex = new RegExp(variable, 'g');
        code = code.replace(regex, register);
    });

    return code;
}

/************************************************************* */
function instructionScheduling(code) {
    console.log("Applying instruction scheduling");

    // Regular expression to match arithmetic operations
    var arithmeticRegex = /\b(\w+)\s*([\+\-\*\/])\s*(\w+)\b/g;

    // Match arithmetic operations in the code
    var matches = Array.from(code.matchAll(arithmeticRegex));

    // Reorder instructions to maximize parallelism
    matches.reverse().forEach((match, index) => {
        var operation = match[0];
        code = reorderInstruction(code, operation, index + 1);
    });

    return code;
}

// Function to reorder an instruction
function reorderInstruction(code, instruction, index) {
    // Perform basic reordering, e.g., swapping operands
    var reversedInstruction = instruction.replace(/(\w+)\s*([\+\-\*\/])\s*(\w+)/, '$3 $2 $1');
    // Add a comment indicating the reordering
    var comment = '// Reordered arithmetic operation ' + index;

    // Replace the original instruction with the reordered one
    var updatedCode = code.replace(instruction, `${reversedInstruction}`);

    // Find the index of the original instruction in the code
    var startIndex = updatedCode.indexOf(reversedInstruction);

    // Find the end index of the line containing the original instruction
    var endIndex = updatedCode.indexOf('\n', startIndex);
    if (endIndex === -1) endIndex = updatedCode.length; // If it's the last line, set endIndex to the end of the code

    // Insert the comment after the reordered instruction
    updatedCode = updatedCode.substring(0, endIndex) + '\n' + comment + updatedCode.substring(endIndex);

    return updatedCode;
}


/***************************************************************/
function codeMotion(code) {
    console.log("Applying code motion");

    // Regular expression to match the loop pattern
    var loopRegex = /for\s*\((var\s+\w+\s*=\s*\d+)\s*;\s*(\w+)\s*[<>=!]+\s*(\w+)\s*;\s*(\w+)\s*\+\+\)\s*{/;

    // Match loop pattern in the code
    var match = code.match(loopRegex);

    if (match) {
        // Extract loop variables and limits
        var initialization = match[1];
        var condition = match[2];
        var increment = match[3];

        // Extract loop body
        var loopBody = code.substring(match.index + match[0].length);
        var endIndex = loopBody.indexOf("}");
        var loopContent = loopBody.substring(0, endIndex);

        // Check if loop variable is used in the loop body
        var variableRegex = new RegExp(condition + "\\s*[<>=!]+\\s*\\w+");
        if (!variableRegex.test(loopContent)) {
            // Move the expression out of the loop
            var movedExpression = initialization + ";\n";
            movedExpression += "var sum = " + loopContent.match(/(sum\s*\+=\s*\w+)/)[0] + ";\n";

            // Remove extraneous loop-related code
            var codeWithoutLoop = code.substring(0, match.index) + movedExpression + code.substring(match.index + match[0].length + endIndex + 1);

            // Add comment indicating code motion optimization
            codeWithoutLoop = codeWithoutLoop.replace(/return\s*sum;/, "return sum; // Code Motion applied");

            return codeWithoutLoop;
        }
    }

    return code;
}

