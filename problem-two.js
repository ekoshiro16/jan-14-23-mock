/* 
PROMPT: Implement a method to perform basic string compression using the counts of repeated characters.

For example, the string "aabcccccaaa" would become "a2b1c5a3". 

If the "compressed" string would not become smaller than the original string, your method should return the original string.

You can assume the string has only uppercase and lowercase letters (from a to z). 

HINTS: 
#1. Do the easy thing first. Compress the string, then compare the lengths.

#2. Be careful that you aren't repeatedly concatenating strings together. This can be very inefficient. 
*/ 

function compressString (str) {
    // Quick edge case check - if the string is too short, then we can't compress the string further. 
    if (str.length <= 1) return str  

    // Some helper variables. We have one to track the new compressed string we are making, another to keep track of how many characters are the same in a consecutive one, and lastly one to track what character we're currently looking at in the string. 
    let newStr = "";
    let currCharCount = 1; 
    let currChar = str[0];

    // Now we loop through the string, but starting at the 2nd character (index of 1) since we've already accounted for the first character above. 
    for (let i = 1; i < str.length; i++) {
        // First we check whether the current character we are looking at in the string is the same as the character of our helper variable above. If so, then we have found a duplicate and should tally it up in our character counter. 
        if (currChar === str[i]) {
            currCharCount++ 

            // However, we also need to check whether the current character is NOT the same as the next character. If so, then we have reached the end of a consecutive row of the same characters, and need to add our findings to the new compressed string we are making. 
            if (str[i] !== str[i + 1]) {
                // Note how we are adding the current character and the character count from both our helper variables above. 
                newStr += currChar + currCharCount
            }
        } else {
            // If the current character is NOT the same as the character at our index pointer... 
            // We then need to modify the current character helper var to reflect the change.

            // So first we update our currChar helper variable.
            currChar = str[i];
            // And then reset our character counter tracker to 1. 
            currCharCount = 1 

            // If the character at our current index pointer is NOT the same as the next consecutive character in the string, then we have again reached the end of a consecutive row of similar characters, and need to then update our new compressed string. 
            if (str[i] !== str[i + 1]) {
                newStr += currChar + currCharCount
            }
        }
    }

    // Once we have finished looping, we need to add the very last character that we were looking at in the string to our compressed string. 
    newStr += currChar + currCharCount;

    // One last logical check - we only want to return the shorter string, so we run a check for the length of the new compressed string to the original string. We return whichever is shorter. 
    return newStr.length >= str.length ? str : newStr;
}

console.log(compressString("aabcccccaaa"))

// MOST OPTIMIZED SOLUTION
function compressStringOptimized(str) {
    if (str.length <= 1) return str;

    let compressedParts = [];
    let currCharCount = 1;
    let currChar = str[0];

    for (let i = 1; i < str.length; i++) {
        if (currChar === str[i]) {
            currCharCount++;
        } else {
            compressedParts.push(currChar + currCharCount);
            if (compressedParts.join('').length >= str.length) return str;

            currChar = str[i];
            currCharCount = 1;
        }
    }

    compressedParts.push(currChar + currCharCount);
    let compressedStr = compressedParts.join('');

    return compressedStr.length >= str.length ? str : compressedStr;
}
