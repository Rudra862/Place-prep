const fs = require('fs');
const path = './data/questions.json';
let qs = JSON.parse(fs.readFileSync(path, 'utf-8'));

let maxId = Math.max(...qs.map(q => q.id));
let yearGen = () => 2021 + Math.floor(Math.random() * 3);
let compGen = () => ['TCS', 'Infosys', 'Wipro', 'Amazon', 'Google', 'Accenture', 'Cognizant'][Math.floor(Math.random()*7)];

const easy = [
  "Reverse a given string.",
  "Check whether a string is a palindrome.",
  "Find the largest element in an array.",
  "Count number of digits in an integer.",
  "Check whether a number is prime.",
  "Print Fibonacci series up to N terms.",
  "Find the sum of all elements in an array.",
  "Count vowels and consonants in a string.",
  "Find the factorial of a number.",
  "Check whether a number is Armstrong or not."
];

const medium = [
  "Find all pairs in an array whose sum equals a target.",
  "Remove duplicates from an array.",
  "Check if two strings are anagrams.",
  "Sort an array using any sorting technique.",
  "Find the second largest element in an array.",
  "Move all zeros in an array to the end.",
  "Find the frequency of each element in an array.",
  "Reverse words in a sentence.",
  "Find missing number in array from 1 to N.",
  "Find intersection of two arrays."
];

const hard = [
  "Find the longest substring without repeating characters.",
  "Maximum subarray sum (Kadane’s Problem).",
  "Merge two sorted arrays without extra space.",
  "Check if parentheses are balanced.",
  "Find majority element in an array (> n/2 times).",
  "Detect cycle in a linked list.",
  "Find the first non-repeating character in a string.",
  "Implement binary search.",
  "Find kth largest element in an array.",
  "Solve the Two Sum problem efficiently."
];

function addCodingQ(text, diff) {
  maxId++;
  qs.push({
    id: maxId,
    company: compGen(),
    type: "Coding",
    topic: "Algorithms",
    diff: diff,
    year: yearGen(),
    q: text + "\n\nWrite an optimal solution observing Edge Cases.",
    opts: [],
    ans: ""
  });
}

easy.forEach(q => addCodingQ(q, "Easy"));
medium.forEach(q => addCodingQ(q, "Medium"));
hard.forEach(q => addCodingQ(q, "Hard"));

fs.writeFileSync(path, JSON.stringify(qs, null, 2), 'utf-8');
console.log(`Added 30 coding questions explicitly ranked by difficulty. Total Database Volume: ${qs.length} questions.`);
