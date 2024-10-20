
const calcBody = document.querySelector(".calc-body");
const leftVar = document.querySelector(".leftVar");
const operator = document.querySelector(".operator");
const rightVar = document.querySelector(".rightVar");
calcBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("row-buttons")
        ||
        event.target.classList.contains("calc-body")) return;

    if (isNaN(parseInt(leftVar.textContent))) {
        leftVar.textContent = "0";
    }

    let value = event.target.textContent;
    let Var = leftVar;
    if (operator.textContent) {
        Var = rightVar;
    }

    if (!isNaN(parseInt(value))) {
        if (Var.textContent === "0") {
            Var.textContent = event.target.textContent;
        } else {
            Var.textContent += event.target.textContent;
        }
    } else if (value === "C") {
        leftVar.textContent = "0";
        operator.textContent = "";
        rightVar.textContent = "";
    } else if (value === "+" || value === "-" || value === "x" || value === "/") {
        if (operator.textContent && rightVar.textContent) {
            leftVar.textContent = operate(operator.textContent, leftVar.textContent, rightVar.textContent);
            operator.textContent = value;
            rightVar.textContent = "";
        } else {
            operator.textContent = value;
        }
    } else if (value === "%" && !rightVar.textContent) {
        leftVar.textContent = operate(value, leftVar.textContent, rightVar.textContent);
        operator.textContent = "";
    } else if (value === ".") {
        if (Var.textContent.includes(".")) return;
        else if (Var.textContent) {
            Var.textContent += value;
        } else {
            Var.textContent = "0.";
        }
    } else if (value === "+/-") {
        if (leftVar.textContent.startsWith("-")) {
            leftVar.textContent = leftVar.textContent.slice(1);
        } else {
            leftVar.textContent = "-" + leftVar.textContent;
        }
    } else if (value === "=") {
        if (operator.textContent && rightVar.textContent) {
            leftVar.textContent = operate(operator.textContent, leftVar.textContent, rightVar.textContent);
            operator.textContent = "";
            rightVar.textContent = "";
        }
    }
});

function operate(operator, left, right) {
    left = parseFloat(left);
    right = parseFloat(right);
    let solution = 0;
    switch (operator) {
        case "+":
            solution = left + right;
            break;

        case "-":
            solution = left - right;
            break;

        case "x":
            solution = left * right;
            break;

        case "/":
            if (right === 0) return "What are you even doing?";
            solution = left / right;
            break;

        case "%":
            solution = left / 100;
            break;
    }

    if (`${solution}`.length > 8) {
        solution = Math.round(1000000 * solution) / 1000000;
    }

    return solution;
}
