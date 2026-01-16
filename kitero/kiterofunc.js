function Student(name){
    this.name = name;
    this.askedQuestionNumber = 0;
}

Student.prototype.askQuestion = function(){
    console.log("???");
    this.askedQuestionNumber++;
}

const stu1 = new Student("Mátung");

console.log(stu1);
stu1.askQuestion();
console.log(stu1);

const stu2 = new Student("Br br patapim");
console.log(stu2);

function StudentWithWork(name){
    Student.call(this, name);
    this.workDone = 0;
}

StudentWithWork.prototype.doWork = function(){
    this.workDone++;
}

Object.setPrototypeOf(StudentWithWork.prototype, Student.prototype);

const stu3 = new StudentWithWork("Tung tung tung sahur");
stu3.askQuestion();
console.log(stu3);

stu3.doWork();
console.log(stu3);