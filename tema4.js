class Person{
    constructor(name,age,heightincm)
    {
        this.name = name;
        this.age = age;
        
    }
    introduce(){
        console.log('Hi, my name is ' + this.name + 'and I m ' + this.age + 'years old.');
    }
    ask(){
        console.log(`${this.freetime()} but ${this.money()}` );
    }
    freetime(){
        return 'I have a lot of free time';
    }
    money(){
        return 'I don t have enough money.';
    }




}
class Employee extends Person{
    freetime(){
        return 'I spend a lt of time with my job';
    }

    money(){
        return 'It s worth it because I earn a lot of money.'
    }

    job(){
        return 'programmer';
    }
    jobmessage(){
        console.log(`I am a ${this.job()} and I have no life`);
    }
    
}
let person1 = new Person('Karin','22');

person1.introduce();
person1.ask();

let emplolee1 = new Employee('Johnny', '25');

emplolee1.introduce();
emplolee1.ask();
emplolee1.jobmessage();

let emplolee2 = new Employee('Mala','23');

emplolee2.introduce();
emplolee2.jobmessage();

//ex 4
var arr = [1 ,-2, 6, -7,10, 9, 14, true, false, null, undefined];
const s = document.getElementById('ex4');
const e = document.createElement('p');
e.innerHTML = arr;

s.appendChild(e);

let copy = arr.filter(function(value) {
    return typeof value === 'number'
  });
const c = document.createElement('p');
c.innerHTML = 'Valorile numerice din array: ' + copy;

s.appendChild(c);

let inmultire = arr.map(value => value * 10);
const i = document.createElement('p');
i.innerHTML = 'Valorile din array inultite cu 10 sunt: ' + inmultire;

s.appendChild(i);

let result = copy.reduce((acc, value) => acc += value);
const r = document.createElement('p');
r.innerHTML = 'Suma valorilor este: ' + result;
      
s.appendChild(r);
      


