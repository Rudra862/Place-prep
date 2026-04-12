const fs = require('fs');
const path = './data/questions.json';
let qs = JSON.parse(fs.readFileSync(path, 'utf-8'));

let maxId = Math.max(...qs.map(q => q.id));
let yearGen = () => 2020 + Math.floor(Math.random() * 4);
let compGen = () => ['TCS', 'Infosys', 'Wipro', 'Amazon', 'Google', 'Accenture', 'Cognizant'][Math.floor(Math.random()*7)];

function addQ(type, topic, q, opts, ans) {
  maxId++;
  qs.push({
    id: maxId, company: compGen(), type: type, topic: topic, diff: "Medium", year: yearGen(),
    q: q, opts: opts, ans: ans
  });
}

// Aptitude
addQ("Aptitude", "Time & Work", "If 12 men complete a work in 10 days, how many days will 8 men take?", ["12", "15", "18", "20"], 1);
addQ("Aptitude", "Speed & Distance", "A train crosses a pole in 10 sec and platform in 20 sec. Ratio of lengths?", ["1:2", "2:1", "1:3", "3:1"], 0);
addQ("Aptitude", "Interest", "Simple interest on ₹2000 at 10% for 2 years?", ["200", "300", "400", "500"], 2);
addQ("Aptitude", "Profit & Loss", "If CP = 500, SP = 600, profit %?", ["10%", "20%", "25%", "30%"], 1);
addQ("Aptitude", "Number System", "LCM of 12, 15, 20?", ["60", "120", "180", "240"], 0);
addQ("Aptitude", "Speed & Distance", "Speed = 60 km/h, distance = 180 km, time?", ["2 hr", "3 hr", "4 hr", "5 hr"], 1);
addQ("Aptitude", "Ratio", "Ratio 2:3, total = 50. The numbers are?", ["20,30", "15,35", "10,40", "25,25"], 0);
addQ("Aptitude", "Interest", "Compound interest formula?", ["PRT", "P(1+r)^t", "P+r+t", "PT/r"], 1);
addQ("Aptitude", "Averages", "Average of 10, 20, 30?", ["15", "20", "25", "30"], 1);
addQ("Aptitude", "Ratio", "A is 2x faster than B. Ratio of their speeds?", ["1:2", "2:1", "3:1", "1:3"], 1);

// Aptitude Fast Set
addQ("Aptitude", "Percentages", "25% of 200 = ?", ["40", "50", "60", "70"], 1);
addQ("Aptitude", "Math", "7² + 3² = ?", ["48", "58", "68", "78"], 1);
addQ("Aptitude", "Math", "Cube of 5 = ?", ["15", "25", "125", "625"], 2);
addQ("Aptitude", "Math", "√144 = ?", ["12", "14", "16", "18"], 0);
addQ("Aptitude", "Percentages", "15% of 300 = ?", ["30", "45", "60", "75"], 1);
addQ("Aptitude", "Profit & Loss", "Profit = SP - ?", ["Loss", "CP", "Discount", "Tax"], 1);
addQ("Aptitude", "Speed & Distance", "Time = Distance / ?", ["Speed", "Area", "Length", "Velocity"], 0);
addQ("Aptitude", "Ratio", "3:4 = x:20. Find x.", ["12", "15", "18", "21"], 1);
addQ("Aptitude", "Algebra", "If 2x = 10, then x = ?", ["5", "10", "15", "20"], 0);
addQ("Aptitude", "Math", "100 / 4 = ?", ["20", "25", "30", "35"], 1);
addQ("Aptitude", "Math", "45 ÷ 5 = ?", ["7", "8", "9", "10"], 2);
addQ("Aptitude", "Math", "9 × 9 = ?", ["18", "72", "81", "90"], 2);
addQ("Aptitude", "Math", "18 + 32 = ?", ["40", "45", "50", "55"], 2);
addQ("Aptitude", "Math", "200 - 75 = ?", ["115", "125", "135", "145"], 1);
addQ("Aptitude", "Percentages", "10% of 500 = ?", ["40", "50", "60", "70"], 1);
addQ("Aptitude", "Permutations", "5! = ?", ["20", "60", "120", "240"], 2);
addQ("Aptitude", "Math", "8³ = ?", ["64", "256", "512", "1024"], 2);
addQ("Aptitude", "Math", "√81 = ?", ["7", "8", "9", "10"], 2);
addQ("Aptitude", "Fractions", "1/2 + 1/2 = ?", ["0", "1", "1.5", "2"], 1);
addQ("Aptitude", "Fractions", "3/4 of 100 = ?", ["25", "50", "75", "100"], 2);

// Logical Reasoning
addQ("Logical", "Series", "Series: 2, 4, 8, 16, ?", ["18", "24", "32", "64"], 2);
addQ("Logical", "Odd One Out", "Odd one out: Apple, Banana, Mango, Car", ["Apple", "Banana", "Mango", "Car"], 3);
addQ("Logical", "Coding", "Coding: CAT = DBU. DOC = ?", ["EPD", "EPH", "XYZ", "DPH"], 0);
addQ("Logical", "Coding", "If A=1, B=2, then Z=?", ["24", "25", "26", "27"], 2);
addQ("Logical", "Series", "Find missing: 3, 9, 27, ?", ["54", "81", "108", "243"], 1);

addQ("Logical", "Pattern", "Mirror of 123", ["321", "213", "132", "312"], 0);
addQ("Logical", "Series", "5, 10, 20, 40. Next?", ["50", "60", "70", "80"], 3);
addQ("Logical", "Clocks", "Angle at 3:00?", ["45°", "90°", "180°", "360°"], 1);
addQ("Logical", "Directions", "Opposite of NORTH is?", ["SOUTH", "EAST", "WEST", "NORTH-EAST"], 0);
addQ("Logical", "Venn Diagram", "Dog belongs to group?", ["Animal", "Bird", "Reptile", "Amphibian"], 0);
addQ("Logical", "Analogy", "Book : Read :: Food : ?", ["Drink", "Bite", "Cook", "Eat"], 3);
addQ("Logical", "Series", "7, 14, 28, next?", ["35", "42", "49", "56"], 3);
addQ("Logical", "Odd One Out", "Odd: 2, 3, 5, 9?", ["2", "3", "5", "9"], 3);
addQ("Logical", "Coding", "A→Z, B→Y. C→?", ["W", "X", "Y", "Z"], 1);
addQ("Logical", "Blood Relations", "Father’s brother is?", ["Uncle", "Nephew", "Cousin", "Brother"], 0);
addQ("Logical", "Series", "1, 1, 2, 3, 5. Next?", ["6", "7", "8", "9"], 2);
addQ("Logical", "Directions", "Facing North, turn Right. Now facing?", ["South", "West", "East", "North"], 2);
addQ("Logical", "Dice", "Standard Dice opposite faces sum to?", ["6", "7", "8", "9"], 1);
addQ("Logical", "Alphabets", "A, C, F, ?", ["H", "I", "J", "K"], 2);
addQ("Logical", "Analogy", "4→16, 5→25, 6→?", ["30", "36", "42", "48"], 1);
addQ("Logical", "Syllogism", "Statement-Conclusion dependency?", ["Independent", "Depends case", "Always True", "Always False"], 1);
addQ("Logical", "Coding", "HELLO → IFMMP. Rule?", ["+1 shift", "-1 shift", "+2 shift", "-2 shift"], 0);
addQ("Logical", "Missing Number", "2, 6, 7, 21, 22, ?", ["23", "44", "66", "88"], 2);
addQ("Logical", "Clocks", "Angle at 6:00 is?", ["90°", "180°", "270°", "360°"], 1);
addQ("Logical", "Dice", "Sum of opposite faces in standard dice?", ["5", "6", "7", "8"], 2);
addQ("Logical", "Series", "11, 13, 17, ?", ["18", "19", "21", "23"], 1);
addQ("Logical", "Alphabets", "Reverse of A is?", ["Y", "X", "W", "Z"], 3);
addQ("Logical", "Odd One Out", "Cow, Dog, Cat, Tiger. Odd one?", ["Cow", "Dog", "Cat", "Tiger"], 3);

// Technical
addQ("Technical", "Algorithms", "Time complexity of binary search?", ["O(n)", "O(log n)", "O(n²)", "O(1)"], 1);
addQ("Technical", "Data Structures", "Stack follows?", ["FIFO", "LIFO", "FILO", "Random"], 1);
addQ("Technical", "Data Structures", "Queue follows?", ["FIFO", "LIFO", "LILO", "Random"], 0);
addQ("Technical", "Databases", "Which is a DB?", ["MySQL", "HTML", "CSS", "JS"], 0);
addQ("Technical", "Databases", "Primary key?", ["Duplicate value", "Unique identifier", "Null value", "Foreign relation"], 1);
addQ("Technical", "OS", "OS manages?", ["Resources", "Hardware only", "Software only", "Internet"], 0);
addQ("Technical", "OS", "Deadlock condition?", ["Mutual exclusion", "Hold and wait", "Circular wait", "All of these"], 3);
addQ("Technical", "Hardware", "RAM is?", ["Volatile memory", "Non-volatile memory", "Storage", "Processor"], 0);
addQ("Technical", "Hardware", "ROM is?", ["Volatile", "Non-volatile", "Cache", "Register"], 1);
addQ("Technical", "Compilers", "Compiler?", ["Translates code to machine code", "Interprets line by line", "Edits code", "Debugs code"], 0);
addQ("Technical", "Java", "Java is?", ["Procedural", "OOP language", "Scripting", "Markup"], 1);
addQ("Technical", "C", "C is?", ["Procedural", "OOP", "Functional", "Markup"], 0);
addQ("Technical", "Python", "Python is?", ["Compiled", "Interpreted", "Assembly", "Hardware"], 1);
addQ("Technical", "Web", "HTML is?", ["Programming language", "Markup language", "Styling language", "Database"], 1);
addQ("Technical", "Web", "CSS stands for?", ["Computer Style Sheet", "Cascading Style Sheets", "Creative Style System", "Coded Style Sheet"], 1);
addQ("Technical", "Networking", "TCP is?", ["Reliable", "Unreliable", "Datagram", "Stateless"], 0);
addQ("Technical", "Networking", "IP is for?", ["Addressing", "Routing", "Translation", "Style"], 0);
addQ("Technical", "Networking", "DNS?", ["Domain to IP", "IP to MAC", "MAC to IP", "Port to IP"], 0);
addQ("Technical", "Networking", "HTTP is?", ["Web protocol", "Mail protocol", "File transfer protocol", "Terminal protocol"], 0);
addQ("Technical", "Networking", "HTTPS is?", ["Insecure HTTP", "Secure HTTP", "HyperText Protocol", "Hyper Transfer"], 1);
addQ("Technical", "Data Structures", "Linked list is?", ["Static size", "Dynamic size", "Primitive type", "Immutable"], 1);
addQ("Technical", "Data Structures", "Array is?", ["Fixed size", "Dynamic size", "Unordered", "Tree-based"], 0);
addQ("Technical", "Data Structures", "Tree root means?", ["Bottom node", "Leaf node", "Top node", "Middle node"], 2);
addQ("Technical", "Data Structures", "Graph contains?", ["Nodes + edges", "Roots + leaves", "Arrays + lists", "Stacks + queues"], 0);
addQ("Technical", "Algorithms", "Recursion is?", ["Looping construct", "Function calling itself", "Variable declaration", "Data structure"], 1);
addQ("Technical", "SQL", "SQL SELECT does?", ["Add data", "Modify data", "Remove data", "Retrieve data"], 3);
addQ("Technical", "SQL", "SQL INSERT does?", ["Add data", "Update data", "Delete data", "Order data"], 0);
addQ("Technical", "SQL", "SQL UPDATE does?", ["Delete data", "Modify data", "Read data", "Sort data"], 1);
addQ("Technical", "SQL", "SQL DELETE does?", ["Update data", "Insert data", "Remove data", "Select data"], 2);
addQ("Technical", "SQL", "SQL JOIN is used to?", ["Split tables", "Combine tables", "Drop tables", "Create tables"], 1);

fs.writeFileSync(path, JSON.stringify(qs, null, 2), 'utf-8');
console.log(`Added questions successfully. Total questions: ${qs.length}`);
