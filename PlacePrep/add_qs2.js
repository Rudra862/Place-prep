const fs = require('fs');

const dataPath = './data/questions.json';
let questions = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

let maxId = Math.max(...questions.map(q => q.id));

const newQs = [
  // Aptitude
  {company:"TCS",type:"Aptitude",topic:"Ages",diff:"Easy",year:2022,q:"Present ages of Sameer and Anand are in the ratio of 5 : 4 respectively. Three years hence, the ratio of their ages will become 11 : 9 respectively. What is Anand's present age in years?",opts:["24","27","40","None of these"],ans:0},
  {company:"Infosys",type:"Aptitude",topic:"Profit & Loss",diff:"Medium",year:2021,q:"A vendor bought toffees at 6 for a rupee. How many for a rupee must he sell to gain 20%?",opts:["3","4","5","6"],ans:2},
  {company:"Cognizant",type:"Aptitude",topic:"Number System",diff:"Hard",year:2023,q:"Which of the following is completely divisible by 99?",opts:["3572404","135792","913464","114345"],ans:3},
  {company:"Accenture",type:"Aptitude",topic:"Percentages",diff:"Medium",year:2022,q:"A student has to obtain 33% of the total marks to pass. He got 125 marks and failed by 40 marks. The maximum marks are:",opts:["300","500","800","1000"],ans:1},

  // Technical
  {company:"TCS",type:"Technical",topic:"C++",diff:"Hard",year:2022,q:"What is a virtual destructor in C++?",opts:["It is undefined","Destroys virtual functions","A destructor that must be overridden","Ensures proper cleanup of derived class objects when deleted through a base class pointer"],ans:3},
  {company:"Infosys",type:"Technical",topic:"SQL",diff:"Medium",year:2021,q:"What is the difference between TRUNCATE and DELETE?",opts:["TRUNCATE can be rolled back","TRUNCATE is a DDL command, DELETE is DML","No difference","DELETE resets identity counters"],ans:1},
  {company:"Wipro",type:"Technical",topic:"Networking",diff:"Easy",year:2023,q:"Which protocol is used to secure HTTP connections?",opts:["FTP","SSH","TCP","HTTPS"],ans:3},
  {company:"Cognizant",type:"Technical",topic:"Data Structures",diff:"Hard",year:2022,q:"In a binary search tree, which traversal yields elements in sorted order?",opts:["Pre-order","In-order","Post-order","Level-order"],ans:1},

  // Logical
  {company:"TCS",type:"Logical",topic:"Blood Relations",diff:"Medium",year:2022,q:"Pointing to a photograph of a boy, Suresh said, 'He is the son of the only son of my mother.' How is Suresh related to that boy?",opts:["Brother","Uncle","Cousin","Father"],ans:3},
  {company:"Infosys",type:"Logical",topic:"Directions",diff:"Easy",year:2021,q:"A man is facing west. He turns 45 degrees in the clockwise direction and then another 180 degrees in the same direction and then 270 degrees in the anticlockwise direction. Find which direction he is facing now?",opts:["South-West","North-West","West","South"],ans:0},
  {company:"Wipro",type:"Logical",topic:"Syllogism",diff:"Medium",year:2023,q:"Statements: Some actors are singers. All the singers are dancers. Conclusion 1: Some actors are dancers. Conclusion 2: No singer is actor.",opts:["Only conclusion 1 follows","Only conclusion 2 follows","Both follow","Neither follows"],ans:0},

  // More Coding (no strict LC Env required as fallback creates normal setup)
  {company:"Amazon",type:"Coding",topic:"Trees",diff:"Hard",q:"Invert a binary tree.\n\nSample Input:\nroot = [4,2,7,1,3,6,9]\n\nSample Output:\n[4,7,2,9,6,3,1]\n\nExplanation:\nSwap left and right children repeatedly.",opts:[],ans:""},
  {company:"TCS",type:"Coding",topic:"Dynamic Programming",diff:"Medium",q:"Climbing Stairs: You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?\n\nSample Input:\nn = 2\n\nSample Output:\n2\n\nExplanation:\n1. 1 step + 1 step\n2. 2 steps",opts:[],ans:""}
];

newQs.forEach(q => {
  maxId++;
  q.id = maxId;
  questions.push(q);
});

fs.writeFileSync(dataPath, JSON.stringify(questions, null, 2), 'utf-8');
console.log("Added " + newQs.length + " more questions successfully.");
