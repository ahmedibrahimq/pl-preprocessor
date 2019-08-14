var s = document.getElementById("s").value;

function check() {

    s = document.getElementById("s").value;
    s = s.replace(/\s+/g, '');

    var wff = true;

    var c = s[0];
    if (!Legal_St_Char(c)) {
        wff = false;
    } else {


    var i = 0;
    for (; i < s.length - 1; i++) {
        c = s[i];

        if (i > 0 && c == '(' && (!Legal_Opening_Prefix(s[i - 1]) ||
            !Legal_Opening_Postfix(s[i + 1]))) {
            wff = false;
            break;
        }

        if (c == ')' && (!Legal_Closing_Prefix(s[i - 1]) ||
            !Legal_Closing_Postfix(s[i + 1]))) {
            wff = false;
            break;
        }

        if (!Legal_Statment_Letter_Char(c) && !Operator(c) && !Parenthesis(c)) {
            wff = false;
            break;
        }

        if (Operator(c)) {
            if (i > 0 && c == '¬' && !Legal_Negation_Prefix(s[i - 1])) {
                wff = false;
                break;
            }

            c = s[i + 1];
            if (!Legal_Operator_Postfix(c) && wff) {
                wff = false;
                break;
            }
        }
    }

    c = s[i];
    if (Illegal_Char(c) & wff) {
        wff = false;
    }

    }

    var msg1 = wff ? s + " <strong>is wff</strong>" : s + " <strong class='text-danger'>is not wff</strong>";
    var msg2 = IS_Balanced(s) ? " " : "Parenthesis are <strong>not balanced</strong>";
    document.getElementById("msg1").innerHTML = msg1;
    document.getElementById("msg2").innerHTML = msg2;
}


function Parenthesis(c) {
    return c == '(' || c == ')';
}

function Legal_St_Char(c) {
    var sL_St_Char = (c >= 'a' && c <= 'z') ||
        c == '(' ||
        c == '¬';
    return sL_St_Char;
}

function Legal_Opening_Postfix(c) {
    return Legal_St_Char(c);
}

function Binary_Operators(c) {
    var operator_ = c == '∧' ||
        c == '∨' ||
        c == '⇒' ||
        c == '⇔';

    return operator_;
}

function Operator(c) {
    return c == '¬' || Binary_Operators(c);
}

function Legal_Negation_Prefix(c) {
    var negation_prefix = Operator(c) ||
        c == '(';

    return negation_prefix;
}

function Legal_Opening_Prefix(c) {
    return Legal_Negation_Prefix(c);
}

function Legal_Operator_Postfix(c) {
    return Legal_St_Char(c);
}

function Legal_Statment_Letter_Char(c) {
    var not_First_char = (c >= '0' && c <= '9') ||
        (c >= 'a' && c <= 'z') ||
        (c >= 'A' && c <= 'Z') ||
        c == '_';
    return not_First_char;
}

function Legal_Last_Char(c) {
    var legal_Char = Legal_Statment_Letter_Char(c) || c == ')';
    return legal_Char;
}

function Legal_Closing_Prefix(c) {
    return Legal_Last_Char(c);
}

function Legal_Closing_Postfix(c) {
    return Binary_Operators(c) || c == ')';
}

function Illegal_Char(c) {
    return !Legal_Last_Char(c);
}

function IS_Balanced(s) {
    var balanced = true;
    var opening = [];
    var closing = [];

    var c;
    for (var i = 0; i < s.length; i++) {
        c = s[i];
        if (c == '(') {
            opening.push(i);
        }
        else if (c == ')') {
            closing.push(i);
        }
    }
    if (opening.length != closing.length) {
        return false;
    }

    while (opening.length != 0) {
        if (opening.shift() > closing.shift()) {
            return false;
        }
    }

    return balanced;
}
