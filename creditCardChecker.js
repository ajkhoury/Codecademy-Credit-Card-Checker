
// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]

// Checks if one card is valid
// Returns true or false
validateCred = (arr) => {

    //Check if card is an array, convert to array of numbers
    if (Array.isArray(arr) === false) {
        arr = stringToNumber(arr);
    }

    let newArray = arr.slice()
    let reversedArr = newArray.reverse();
    let sum = 0;

    for(let i = 1; i < reversedArr.length; i++) {

        let n = reversedArr[i]
        if(i %2 !== 0) {
            n *=2;
            if (n > 9) {
                n -=9
            }
        }
        sum += n
    }
    sum += reversedArr[0]

    if(sum %10 === 0) {
        return true
    }
    return false
}

// Returns justs invalid cards as an array
// Can take in multiple cards in an array
const findInvalidCards = (arr) => {

    let falseCards = [];

    for (let i = 0; i <= arr.length-1; i++) {
        let valCredResults = validateCred(arr[i])

        if(valCredResults === false){
            falseCards.push(arr[i])
        }
    }
    return falseCards;
}

// Check what companies cards are from.
// Only checks for company, not validity
// Can take in multiple cards in an array
const idInvalidCardCompanies = (arr) => {

    let invalidCompanyNames = [];
    let arrayOfCompanies = [];

    for(let i = 0; i < arr.length; i++){
        if(arr[i][0] === 3) { //Amex
            invalidCompanyNames.push('Amex')
        } else if(arr[i][0] === 4) { // Visa
            invalidCompanyNames.push('Visa')
        } else if(arr[i][0] === 5) { // Mastercard
            invalidCompanyNames.push('Mastercard')
        } else if(arr[i][0] === 6) { //Discover
            invalidCompanyNames.push('Discover')
        } else {
            invalidCompanyNames.push('Company not found')
        }
    }

    if(invalidCompanyNames.indexOf('Amex') !== -1){
        arrayOfCompanies.push('Amex')
    } if(invalidCompanyNames.indexOf('Visa') !== -1){
        arrayOfCompanies.push('Visa')
    } if(invalidCompanyNames.indexOf('Mastercard') !== -1){
        arrayOfCompanies.push('Mastercard')
    } if(invalidCompanyNames.indexOf('Discover') !== -1){
        arrayOfCompanies.push('Discover')
    } if(invalidCompanyNames.indexOf('Company not found') !== -1){
        arrayOfCompanies.push('Company not found')
    }

    return arrayOfCompanies
}

// String to array of numbers function
const stringToNumber = (string) => {
    string = string.replace(/,/g,'') //replace commas /g not just first is replaced
    string = string.split(' ').join(''); //removes whitespace

    let stringToNumArray = []

    for (let i=0; i < string.length; i++){
    stringToNumArray.push(parseInt(string[i]));
    }

    return stringToNumArray
}

let stringOfNums = '4539, 6779, 0801, 6808'
console.log(stringToNumber(stringOfNums))
//[4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]

console.log(validateCred(valid1))
//true

console.log(findInvalidCards(batch))
// [
// [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5],
// [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3],
// [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4],
// [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5],
// [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4],
// [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4],
// [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3],
// [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
// ]

let invalidCards = findInvalidCards(batch)
console.log(idInvalidCardCompanies(invalidCards))
//[ 'Amex', 'Visa', 'Mastercard', 'Discover' ]