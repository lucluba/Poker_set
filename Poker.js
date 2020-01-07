'use strict';

let cardsArray = [];

for (let i = 0; i < 5; i++) {
    let value = Math.round((Math.random() * 12) + 2);
    let suit = Math.round(Math.random() * 3);

    let card = {
        value: value,
        suit: suit
    };

    cardsArray.push(card);

    for (let j = 0; j < i; j++) {
        if ((card.value === cardsArray[j].value) && (card.suit === cardsArray[j].suit)) {
            cardsArray.pop();
            i--;
            continue;
        }
    }
}

function checkSuit(array) {
    let uniqueSuit = [];
    array.forEach(element => {
        uniqueSuit.push(element.suit);
        for (let j = 0; j < uniqueSuit.length - 1; j++) {
            if (element.suit === uniqueSuit[j]) {
                uniqueSuit.pop();
                continue;
            }
        }
    });
    return uniqueSuit;
}

function checkValue(array) {
    let uniqueValue = [];
    array.forEach(element => {
        uniqueValue.push(element.value);
        for (let j = 0; j < uniqueValue.length - 1; j++) {
            if (element.value === uniqueValue[j]) {
                uniqueValue.pop();
                continue;
            }
        }
    });
    return uniqueValue;
}

function setValueOrder(arrayUnorder) {
    let valueUnorder = [];
    let valueOrder = [];

    arrayUnorder.forEach(element => {
        valueUnorder.push(element.value);
    });

    valueOrder = valueUnorder.sort();

    for (let k = 0; k < 1; k++) {
        let val = valueOrder[k];
        if (val > 9) {
            valueOrder.push(val);
            valueOrder.shift();
            k--;
        } else {
            break;
        }
    }
    return valueOrder;
}

function isInOrder(valueOrder) {
    let result = true;
    if (valueOrder[4] === 14) {
        for (let m = 0; m < 3; m++) {
            if (valueOrder[m] + 1 !== valueOrder[m + 1]) {
                result = false;
                break;
            }
        }
    } else {
        for (let k = 0; k < 4; k++) {
            if (valueOrder[k] + 1 !== valueOrder[k + 1]) {
                result = false;
                break;
            }
        }
    }
    return result;
}

function twoOrThree(isPairs, valueOrder) {
    let val1 = isPairs[0];
    let val2 = isPairs[1];
    let num1 = 0;
    let num2 = 0;

    valueOrder.forEach(element => {
        if (element === val1) {
            num1 += 1;
        }
    });

    valueOrder.forEach(element => {
        if (element === val2) {
            num2 += 1;
        }
    })
    let numbers = [];
    numbers.push(num1, num2);
    return numbers;
}

const isColour = checkSuit(cardsArray);
const isPairs = checkValue(cardsArray);
const valueOrder = setValueOrder(cardsArray);
const numbers = twoOrThree(isPairs, valueOrder);
const inOrder = isInOrder(valueOrder);


// -------------
// DISPLAY CARDS
// -------------

let value,
    suit;

for (let i = 0; i < 5; i++) {
    value = cardsArray[i].value;
    switch (value) {
        case 11: cardsArray[i].value = "Jack";
            break;
        case 12: cardsArray[i].value = "Queen";
            break;
        case 13: cardsArray[i].value = "King";
            break;
        case 14: cardsArray[i].value = "Ace";
            break;
        default: cardsArray[i].value;
            break;
    }

    suit = cardsArray[i].suit;
    switch (suit) {
        case 0: cardsArray[i].suit = "Spades";
            break;
        case 1: cardsArray[i].suit = "Hearts";
            break;
        case 2: cardsArray[i].suit = "Diamonds";
            break;
        case 3: cardsArray[i].suit = "Clubs";
            break;
    }
}

console.log("YOUR CARDS: ");
cardsArray.forEach(element => {
    console.log(element.value + " " + element.suit);
});
console.log('');

// ----------------
// ON HANDS RESULTS
// ----------------

if ((isColour.length === 1) && inOrder && (valueOrder[4] === 14)) {
    console.log("You have Royal Flush");
} else if ((isColour.length === 1) && inOrder) {
    console.log("You have Straight Flush");
} else if ((isColour.length === 1) && !inOrder) {
    console.log("You have Flush");
} else if ((isColour.length > 1) && inOrder) {
    console.log("You have Straight");
} else if ((isColour.length > 1) && !inOrder && (isPairs.length === 5)) {
    console.log("You have only High Card");
} else if ((isColour.length > 1) && isPairs.length === 4) {
    console.log("You have One Pair");
} else if ((isColour.length > 1) && isPairs.length === 3) {
    if ((numbers[0] === 2) || (numbers[1] === 2)) {
        console.log("You have Two Pairs");
    } else {
        console.log("You have Three Of A Kind");
    }
} else if ((isColour.length > 1) && isPairs.length === 2) {
    if ((numbers[0] === 1) || (numbers[0] === 4)) {
        console.log("You have Four Of A Kind");
    } else {
        console.log("You have Full House");
    }
}
