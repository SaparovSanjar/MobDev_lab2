// Part 1

// Given string with format "Student1 - Group1; Student2 - Group2; ..."

// Task 1
// Create dictionary:
// - key is a group name
// - value is sorted array with students

const unique = (value, index, self) => {
  return self.indexOf(value) === index;
};

const randomArr = (len, maxValue) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(randomValue(maxValue));
  }

  return arr;
};

randomValue = (maxValue) => {
  switch (Math.floor(Math.random() * Math.floor(6))) {
    case 1:
      return Math.ceil(maxValue * 0.7);
    case 2:
      return Math.ceil(maxValue * 0.9);
    case (3, 4, 5):
      return maxValue;
    default:
      return 0;
  }
};

const filterByGroup = (arr, groupName) => {
  const newArr = arr.filter((el) => el[1] === groupName);
  return newArr.map((el) => el[0]);
};

const filterTask2 = (arr, groupName) => {
  const newArr = arr.filter((el) => el[1] === groupName);
  return newArr.map((el) => new Map().set(el[0], randomArr(9, 100)));
};

let studentsStr =
  "Бортнік Василь - ІВ-72; Чередніченко Владислав - ІВ-73; Гуменюк Олександр - ІВ-71; Корнійчук Ольга - ІВ-71; Киба Олег - ІВ-72; Капінус Артем - ІВ-73; Овчарова Юстіна - ІВ-72; Науменко Павло - ІВ-73; Трудов Антон - ІВ-71; Музика Олександр - ІВ-71; Давиденко Костянтин - ІВ-73; Андрющенко Данило - ІВ-71; Тимко Андрій - ІВ-72; Феофанов Іван - ІВ-71; Гончар Юрій - ІВ-73";

let groups = [];
let groupsAndStudents = [];
const studentsGroups = new Map();

let studentsArr = studentsStr.split("; ");
studentsArr.forEach((el) => {
  groupsAndStudents.push(el.split(" - "));
  groups.push(el.split(" - ")[1]);
});

const uniqueGroups = groups.filter(unique);

uniqueGroups.map((group) => {
  studentsGroups.set(group, filterByGroup(groupsAndStudents, group));
});

console.log(studentsGroups);

// Task 2
// Create dictionary:
// - key is a group name
// - value is dictionary:
//   - key is student
//   - value is array with points (fill it with random values, useconst studentPoints = new Map();

let points = [5, 8, 12, 12, 12, 12, 12, 12, 15];

uniqueGroups.forEach((group) => {
  studentPoints.set(group, filterTask2(groupsAndStudents, group));
});

console.log(studentPoints);

// Task 3
// Create dictionary:
// - key is a group name
// - value is dictionary:
//   - key is student
//   - value is sum of student's points

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const sumPoints = new Map();

studentPoints.forEach((value, group, map) => {
  let sumMap = new Map();
  value.forEach((mapEl) => {
    mapEl.forEach((value, key, map) => {
      let sumPoints = value.reduce(reducer) / value.length;
      sumMap.set(key, parseFloat(sumPoints.toFixed(2)));
    });
  });

  sumPoints.set(group, sumMap);
});

console.log(sumPoints);

// Task 4
// Create dictionary:
// - key is group name
// - value is average of all students points

const groupAvg = new Map();

sumPoints.forEach((valueMap, group, map) => {
  let avg = 0;
  valueMap.forEach((score, name, map) => {
    avg += score;
  });
  avg = avg / map.size;
  groupAvg.set(group, parseFloat(avg.toFixed(2)));
});

console.log(groupAvg);

// Task 5
// Create dictionary:
// - key is group name
// - value is array of students that have >= 60 points
const passedPerGroup = new Map();

sumPoints.forEach((valueMap, group, map) => {
  const passed = [];

  valueMap.forEach((score, name, map) => {
    if (score >= 60) passed.push(name);
  });

  passedPerGroup.set(group, passed);
});

console.log(passedPerGroup);
