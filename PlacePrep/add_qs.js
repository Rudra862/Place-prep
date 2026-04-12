const fs = require('fs');

const dataPath = './data/questions.json';
let questions = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

let maxId = Math.max(...questions.map(q => q.id));

const newQs = [
  // Aptitude
  {company:"TCS",type:"Aptitude",topic:"Time & Work",diff:"Medium",year:2023,q:"If 15 men can do a piece of work in 20 days, how many men are required to do the same work in 12 days?",opts:["20","25","30","35"],ans:1},
  {company:"Infosys",type:"Aptitude",topic:"Speed & Distance",diff:"Hard",year:2023,q:"Two trains running in opposite directions cross a man standing on the platform in 27 seconds and 17 seconds respectively and they cross each other in 23 seconds. The ratio of their speeds is:",opts:["1:3","3:2","3:4","None of these"],ans:1},
  {company:"Wipro",type:"Aptitude",topic:"Probability",diff:"Medium",year:2022,q:"Tickets numbered 1 to 20 are mixed up and then a ticket is drawn at random. What is the probability that the ticket drawn has a number which is a multiple of 3 or 5?",opts:["1/2","2/5","8/15","9/20"],ans:3},
  {company:"Amazon",type:"Logical",topic:"Seating Arrangement",diff:"Hard",year:2023,q:"A, B, C, D and E are sitting on a bench. A is sitting next to B, C is sitting next to D, D is not sitting with E who is on the left end of the bench. C is on the second position from the right. A is to the right of B and E. A and C are sitting together. In which position A is sitting?",opts:["Between B and D","Between B and C","Between E and D","Between C and E"],ans:1},

  // Technical
  {company:"Accenture",type:"Technical",topic:"Java",diff:"Medium",year:2022,q:"Which of the following is not a concept of Object-Oriented Programming in Java?",opts:["Polymorphism","Inheritance","Compilation","Encapsulation"],ans:2},
  {company:"Cognizant",type:"Technical",topic:"Databases",diff:"Medium",year:2023,q:"Which of the following is a NoSQL database?",opts:["MySQL","PostgreSQL","MongoDB","Oracle"],ans:2},
  {company:"TCS",type:"Technical",topic:"OS",diff:"Medium",year:2021,q:"What is a semaphore?",opts:["A synchronization tool","A deadlock mechanism","A memory management technique","A file system type"],ans:0},

  // 5 New Coding Questions
  {company:"Google",type:"Coding",topic:"Arrays",diff:"Medium",q:"Given an array of integers, return the maximum subarray sum.\n\nSample Input:\nnums = [-2,1,-3,4,-1,2,1,-5,4]\n\nSample Output:\n6\n\nExplanation:\nThe contiguous subarray [4,-1,2,1] has the largest sum = 6.",opts:[],ans:""},
  {company:"Microsoft",type:"Coding",topic:"Strings",diff:"Easy",q:"Given a string s, find the length of the longest substring without repeating characters.\n\nSample Input:\ns = \"abcabcbb\"\n\nSample Output:\n3\n\nExplanation:\nThe answer is \"abc\", with the length of 3.",opts:[],ans:""},
  {company:"Amazon",type:"Coding",topic:"Logic",diff:"Easy",q:"Given an integer x, return true if x is a palindrome, and false otherwise.\n\nSample Input:\nx = 121\n\nSample Output:\ntrue\n\nExplanation:\n121 reads as 121 from left to right and from right to left.",opts:[],ans:""},
  {company:"TCS",type:"Coding",topic:"Math",diff:"Easy",q:"Write a function that reverses an integer.\n\nSample Input:\nx = 123\n\nSample Output:\n321\n\nExplanation:\nReverse the digits of 123 to get 321.",opts:[],ans:""},
  {company:"Wipro",type:"Coding",topic:"Arrays",diff:"Easy",q:"Given an array of integers that is already sorted in ascending order, find two numbers such that they add up to a specific target number.\n\nSample Input:\nnumbers = [2,7,11,15], target = 9\n\nSample Output:\n[1,2]\n\nExplanation:\nThe sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2.",opts:[],ans:""}
];

newQs.forEach(q => {
  maxId++;
  q.id = maxId;
  questions.push(q);
});

fs.writeFileSync(dataPath, JSON.stringify(questions, null, 2), 'utf-8');
console.log("Added " + newQs.length + " new questions successfully.");
