class Student{
    constructor(name){
        this.name = "povmát";
        this.askedQuestionNumber = 0;
    }
    askQuestion(){
        console.log("???");
        this.askedQuestionNumber++;
    }
}

class StudentWithWork extends Student{
    constructor(name){
        super(name)
        this.workDone = 0;
    }
    doWork(){
        console.log("*does work*");
        this.workDone++;
    }
}

const stu1 = new Student("Mátung");

console.log(stu1);
stu1.askQuestion();
console.log(stu1);

const stu2 = new StudentWithWork("IJJÁIJJÁÉ");

console.log(stu2);
stu2.doWork();
stu2.askQuestion();
console.log(stu2);