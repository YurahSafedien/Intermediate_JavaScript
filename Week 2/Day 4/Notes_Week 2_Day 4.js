/*
==========================================================
Patterns and Flags
==========================================================
*/

/*
RegEx consists of:

- a pattern
- optional flags

2 syntax create a RegEx object:
*/

//- Long Syntax:

regexp = new RegExp("pattern", "flags");

//- Short Syntax:

regexp = /pattern/; // no flags
regexp = /pattern/gmi; // with flags g,m and i (to be covered soon)

// "/" tells JS we are creating an expression - play the same role as quotation for strings.

/*
==========================================================
Usage
==========================================================
*/

/*
Search() - searches inside a string
*/

//Example:

let str = "I love JavaScript!"; // will search here 

let regexp = /love/;

alert( str.search(regexp) ); // 2

/*
str.search - looks for pattern /love/, returning the position inside the string
*/

//The code above is the same as:

let str2 = "I love JavaScript!"; // will search here

let substr = 'love';

alert( str.search(substr) ); // 2 

/*
Colors

From here on the color scheme is:

- regexp : red
- string (where we search) : blue
- result : green
*/

/*
When to use new RegExp?

- short syntax ("/.../") does not support variable insertion ("${...}").

- new RegExp allows constuct of a pattern dynamically from a string, increasing flexibility.
*/

//Example of a dynamically generated regexp:

let tag = prompt("Which tag you want to search?", "h2");

let regexp3 = new RegExp();

// finds <h2> by default

alert( "<h1> <h2> <h3>".search(regexp3));

/*
==========================================================
Flags
==========================================================
*/

/*
6 JS RegExp flags that affect search

- i : the search is case-insensitive.

- g : looks for all matches and doesn't just returns the first match found.

- m : multiline mode (https://javascript.info/regexp-multiline-mode).

- s : "Dotall" mode allows "." to match newslines (https://javascript.info/regexp-character-classes).

- u : enables full unicode support, enables correct processing of surrogate pairs (https://javascript.info/regexp-unicode).

- y : stick mode (https://javascript.info/regexp-sticky).
*/

//Example: simple "i" flag:
let str3 = "I love JavaScript!";

alert( str3.search(/LOVE/i) ); // 2 (found lowercased)

alert( str3.search(/LOVE/) ); // -1 (nothing found without 'i' flag)

/*
==========================================================
Methods of RegExp and String
==========================================================
*/

/*
Expands on the use of RegExp for string manipulation.
*/

/*
==========================================================
Character Class
==========================================================
*/

/*
Consider a practical task – we have a phone number "+7(903)-123-45-67", and we need to turn it into pure numbers: 79035419441.

To do so, we can find and remove anything that’s not a number. Character classes can help with that.

A character class is a special notation that matches any symbol from a certain set.

For the start, let’s explore a “digit” class. It’s written as \d. We put it in the pattern, that means “any single digit”.
*/

//For instance, the let’s find the first digit in the phone number:

let str4 = "+7(903)-123-45-67";

let reg3 = /\d/;

alert( str4.match(reg3) ); // 7

/*Without the flag g, the regular expression only looks for the first match, that is the first digit \d.*/

//Let’s add the g flag to find all digits:

let str5 = "+7(903)-123-45-67";

let reg4 = /\d/g;

alert( str5.match(reg4) ); // array of matches: 7,9,0,3,1,2,3,4,5,6,7

alert( str5.match(reg4).join('') ); // 79035419441

/*That was a character class for digits. There are other character classes as well.

Most used are:

- \d (“d” is from “digit”)

- A digit : a character from 0 to 9.

- \s (“s” is from “space”)

- A space symbol : that includes spaces, tabs, newlines.

- \w (“w” is from “word”)

- A “wordly” character : either a letter of English alphabet or a digit or an underscore. Non-Latin letters (like cyrillic or hindi) do not belong to \w.

For instance, \d\s\w means a “digit” followed by a “space character” followed by a “wordly character”, like "1 a".

A regexp may contain both regular symbols and character classes.
*/

//For instance, CSS\d matches a string CSS with a digit after it:

let str6 = "CSS4 is cool";

let reg5 = /CSS\d/

alert( str6.match(reg5) ); // CSS4

//Also we can use many character classes:

alert( "I love HTML5!".match(/\s\w\w\w\w\d/) ); // ' HTML5'

/*
==========================================================
Word Boundary \B
==========================================================
*/

/*
Word boundary \b - special character class.
                 - does not denote a character, but rather sets a boundary between characters.
*/

//Example: \bJava\b matches Java in the string Hello, Java!, but not in the script Hello, JavaScript!

alert( "Hello, Java!".match(/\bJava\b/) ); // Java

alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null

/*
Boundary has "0 width" as usually a character class means a character in the result, but not here.

The boundary is a test.

When the pattern contains \b, it tests that the position in string is a word boundary, that is one of three variants:

- Immediately before is \w, and immediately after – not \w, or vise versa.

- At string start, and the first string character is \w.

- At string end, and the last string character is \w.

For instance, in the string Hello, Java! the following positions match \b - so it matches \bHello\b, because:

- At the beginning of the string the first \b test matches.

- Then the word Hello matches.

- Then \b matches, as we’re between o and a space.

Pattern \bJava\b also matches. But not \bHell\b (because there’s no word boundary after l) and not Java!\b (because the exclamation sign is not a wordly character, so there’s no word boundary after it).
*/

alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
alert( "Hello, Java!".match(/\bHell\b/) );  // null (no match)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (no match)

/*
Once again let’s note that \b makes the searching engine to test for the boundary, so that Java\b finds Java only when followed by a word boundary, but it does not add a letter to the result.
*/

//Word boundary doesn’t work for non-Latin alphabets

/*
==========================================================
Inverse Classes
==========================================================
*/

/*
For every character class there exists an “inverse class”, denoted with the same letter, but uppercased.

The “reverse” means that it matches all other characters, for instance:

\D - Non-digit : any character except \d, for instance a letter.

\S - Non-space : any character except \s, for instance a letter.

\W - Non-wordly character : anything but \w.

\B - Non-boundary : a test reverse to \b.

In the beginning of the chapter we saw how to get all digits from the phone +7(903)-123-45-67.
*/

//One way was to match all digits and join them:

let str7 = "+7(903)-123-45-67";

alert( str7.match(/\d/g).join('') ); // 79031234567

//An alternative, shorter way is to find non-digits \D and remove them from the string:

let str8 = "+7(903)-123-45-67";

alert( str8.replace(/\D/g, "") ); // 79031234567

/*
==========================================================
Spaces are Regular Characters
==========================================================
*/

/*
If a regexp doesn’t take spaces into account, it may fail to work.
*/

//Let’s try to find digits separated by a dash:
alert( "1 - 5".match(/\d-\d/) ); // null, no match!

//Here we fix it by adding spaces into the regexp \d - \d:
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, now it works

/*
A space is a characterof equal importance with as other characters.

Spaces in a regexp are needed only if we look for them. 
*/

//Extra spaces (just like any other extra characters) may prevent a match:
alert( "1-5".match(/\d - \d/) ); // null, because the string 1-5 has no spaces

/*
In a regular expression all characters matter, spaces too.
*/

/*
==========================================================
A Dot as any Character
==========================================================
*/

/*
The dot "." is a special character class that matches “any character except a newline”.
*/

//For instance:

alert( "Z".match(/./) ); // Z

//Or in the middle of a regexp:

let reg = /CS.4/;

alert( "CSS4".match(reg) ); // CSS4

alert( "CS-4".match(reg) ); // CS-4

alert( "CS 4".match(reg) ); // CS 4 (space is also a character)

//Please note that the dot means “any character”, but not the “absense of a character”. There must be a character to match it:

alert( "CS4".match(/CS.4/) ); // null, no match because there's no character for the dot

/*
==========================================================
The Dotall "S" Flag
==========================================================
*/

/*
Usually a dot doesn’t match a newline character.

For instance, A.B matches A, and then B with any character between them, except a newline.
*/

//This doesn’t match:

alert( "A\nB".match(/A.B/) ); // null (no match)

// a space character would match, or a letter, but not \n

/*
Sometimes it’s inconvenient, we really want “any character”, newline included. That’s what s flag does. 
*/

//If a regexp has it, then the dot "." match literally any character:

alert( "A\nB".match(/A.B/s) ); // A\nB (match!)

/*
There exist following character classes:

- \d : digits.
- \D : non-digits.
- \s : space symbols, tabs, newlines.
- \S : all but \s.
- \w : English letters, digits, underscore '_'.
- \W : all but \w.

- any character if with the regexp 's' flag, otherwise any except a newline.

The Unicode encoding, used by JavaScript for strings, provides many properties for characters, like: 

- which language the letter belongs to (if a letter) it is it a punctuation sign, etc.

Modern JavaScript allows to use these properties in regexps to look for characters, for instance:

- A cyrillic letter is: \p{Script=Cyrillic} or \p{sc=Cyrillic}.

- A dash (be it a small hyphen - or a long dash —): \p{Dash_Punctuation} or \p{pd}.

- A currency symbol, such as $, € or another: \p{Currency_Symbol} or \p{sc}.
*/

/*
==========================================================
The Dotall "S" Flag
==========================================================
*/

/*
- To search special characters [ \ ^ $ . | ? * + ( ) literally, we need to prepend them with \ (“escape them”).

- We also need to escape / if we’re inside /.../ (but not inside new RegExp).

- When passing a string new RegExp, we need to double backslashes \\, cause strings consume one of them
*/