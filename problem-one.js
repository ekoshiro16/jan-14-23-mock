/* PROMPT: There are 3 types of edits that can be performed on strings: insert a character, remove a character, or replace a character. Given two strings, write a function to check if they are one edit (or zero edits) away. 

Examples:
* "pale" and "ple" would return true 
* "pales" and "pale" would return true
* "pale" and "bale" would return true
* "pale" and "bake" would return false

Hints: 
#1. Start with the easy thing. Can you check each of the conditions separately? 
#2. What is the relationship between the "insert character" option and the "remove character" option? Do these need to be two separate checks? 
#3. Can you do all three checks in a single pass? 

*/ 

function editSingleTime(strOne, strTwo) {
    // For an edge case, let's first check whether the two strings have a length difference greater than 2. If so, then it will not be possible to edit the strings only one single time. 
    if (Math.abs(strOne.length - strTwo.length) >= 2) {
        return false 
    }

    // Let's make 2 helper variables to help identify which is the longer / shorter string, if they are different lengths 
    let longerStr = "" 
    let shorterStr = ""

    // We'll have an if else statement block to identify the longer / shorter strings, if they exist. If not (meaning that the two strings are of the same length), then we can do a single iteration through the two strings, checking how many edits are required. If more than 1 edit is required, then we return false. 
    if (strOne.length > strTwo.length) { 
        longerStr = strOne
        shorterStr = strTwo
    } else if (strOne.length < strTwo.length) {
        longerStr = strTwo
        shorterStr = strOne
    } else {
        // Do a single pass checking for similarities char by char
        let editCounter = 0; 

        for (let j = 0; j < strOne.length; j++) {
            let currChar = strOne[j];
            let otherChar = strTwo[j];

            if (currChar !== otherChar && editCounter < 2) {
                editCounter++ 
            } else if (editCounter >= 2) {
                return false
            } 
        }

        return true 
    }

    // Now we'll handle the situation where we have two strings that are of different lengths. 
    // We'll make some helper variables to:
        // 1) keep track of how many edits are required,
        // 2) an index tracker for the longer string,
        // 3) and an index tracker for the shorter string. 
    let numOfEditsNeeded = 0; 
    let idxOfLongerStr = 0;
    let idxOfShorterStr = 0; 

    // We'll keep iterating so long as both of our index pointers are less than the total length of each respective string. 
    while (idxOfLongerStr < longerStr.length && idxOfShorterStr < idxOfShorterStr.length) { 
        // We'll check if the current character of the longer string is the same as the current character of the shorter string.
        if (longerStr[idxOfLongerStr] !== shorterStr[idxOfShorterStr]) {
            // If they aren't, then we know we need to make an edit. Additionally, we know that if our edit counter variable is already equal to 1 (meaning we found an edit needed earlier in the string), then we can automatically return false since we can't make more than 1 edit. 
            if (numOfEditsNeeded === 1) return false

            // However, if our edit counter is still equal to 0, then we can just tally up the edit needed we just found.
            numOfEditsNeeded++ 

            // Since this current if statement we're in checks if the current characters of each string are NOT the same, then we also check whether the lengths of our strings are equivalent. If not, then we need to increment the index tracker of our longer string and keep checking for the similarity between characters of each string. 
            if (longerStr.length !== shorterStr.length) {
                idxOfLongerStr += 1
                continue
            }
        }

        // At the end of each loop iteration, we need to increment both of our index trackers to keep pace with where we are in the string. 
        idxOfLongerStr++  
        idxOfShorterStr++ 
    }

    // If we manage to make it through the entire loop without accumulating more than 1 edits required, then we can return true (the strings can be edited in one go) 
    return true
}

// SINGLE ITERATION SOLUTION: 
function checkSingleEdit(strOne, strTwo) {
    // If the length difference is 2 or more, more than one edit is required.
    if (Math.abs(strOne.length - strTwo.length) >= 2) {
        return false;
    }

    let pointerOne = 0;
    let pointerTwo = 0;
    let foundDifference = false;

    while (pointerOne < strOne.length && pointerTwo < strTwo.length) {
        if (strOne[pointerOne] !== strTwo[pointerTwo]) {
            // If a difference is already found, return false
            if (foundDifference) {
                return false;
            }
            foundDifference = true;

            // If the lengths are the same, move both pointers (replacement case)
            if (strOne.length === strTwo.length) {
                pointerTwo++;
            }
        } else {
            // If characters are the same, move the shorter string pointer
            pointerTwo++;
        }
        pointerOne++;
    }

    return true;
}


console.log("TEST ONE: ")
console.log(editSingleTime("pale", "ple"))
console.log("TEST TWO: ")
console.log(editSingleTime("pales", "pale"))
console.log("TEST THREE: ")
console.log(editSingleTime("pale", "bale"))
console.log("TEST FOUR: ")
console.log(editSingleTime("pale", "bake"))