function deseneaza()
{
    const canvas = document.getElementById("canvastema");
    const context = canvas.getContext('2d');

    let x = Math.floor(Math.random()*(560-1+1) )+1;
    let y = Math.floor(Math.random()*(360-1+1) )+1;

    context.fillStyle = "pink";
    context.fillRect(x, y, 40, 40 );
}

class student {
    constructor(fname,lname,gender,college,program,yearofbirth,city)
    {
        this.fname = fname;
        this.lname = lname;
        this.gender = gender;
        this.college = college;
        this.program = program;
        this.yearofbirth = yearofbirth;
        this.city=city;

    }
    fullname()
    {
        console.log("Hello, I'm " + this.fname + " " + this.lname);
    }
    age()
    {
      
        let age = 2020 - this.yearofbirth;
        console.log("My name is " + this.fname + " and I'm " + age + " years old");
    }
    collegeandinterest()
    {
        console.log( "I'm studying " + this.program + " at " + this.college + " college, in " + this.city);
    }
    

}

let me = new student('Karin', 'Polgari','F','FSEGA','Economic informatics', 1998,'Cluj Napoca');
me.age();
me.fullname();
me.collegeandinterest();

let student2 = new student('Andrea', 'Pop', 'F', 'UBB', 'Dental Medicine', '1999','Cluj Napoca');
student2.age();
student2.collegeandinterest();

let student3 = new student('Dan', 'Alb', 'M','FSEGA','Bachelor in management', 1997, 'Cluj');
student3.fullname();
student3.collegeandinterest();
student3.age();