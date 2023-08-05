
class Person{
    constructor(firstName,lastName)
    {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    speech()
    {
        console.log("Person speeching");
    }
}

class Student extends Person{
    constructor(firstName,lastName,age)
    {
        super(firstName,lastName);
        this.age = age;
    }
}


let instance = new Student("Anıl","Onay",25);

instance.speech();



