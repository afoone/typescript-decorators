console.log("Hello World");
function SelfDriving(constructorFunction: Function) {
  console.log("-- decorator function invoked --");
  constructorFunction.prototype.selfDrivable = true;
}

@SelfDriving
class Car {
  private _make: string;
  constructor(make: string) {
    console.log("-- this constructor invoked --");
    this._make = make;
  }
}
console.log("-- creating an instance --");
let car: Car = new Car("Nissan");
console.log(car);
console.log(`selfDriving: ${car["selfDrivable"]}`);

console.log("-- creating one more instance --");
car = new Car("Toyota");
console.log(car);
console.log(`selfDriving: ${car["selfDrivable"]}`);

// Language: typescript
// con los decoradores de clase podemos devolver una función que se ejecuta
// al crear una clase, en el constructor
// Esto se llama un decorator factory - para pasar parametros
const AddFuelToRocket = (fuel: number): ClassDecorator => {
  return function (constructor: Function): void {
    constructor.prototype.fuel = fuel;
  };
};

@AddFuelToRocket(100)
class Rocket {
  constructor(public name: string) {
    this.name = name;
  }
}

const r = new Rocket("Rocket 1");
console.log("Rocket fuel: ", r["fuel"]);
// console.log(r.fuel)

/// Property decorators

console.log("/// Property decorators");

const printMemberName = (target: any, memberName: string) => {
  console.log(memberName, target);

};

class Person {
  @printMemberName
  name: string = "Jon";
}


function Min(limit: number) {
    return function(target: Object, propertyKey: string) { 
      let value : string;
      const getter = function() {
        return value;
      };
      const setter = function(newVal: string) {
         if(newVal.length < limit) {
          Object.defineProperty(target, 'errors', {
            value: `Your password should be bigger than ${limit}`
          });
        }
        else {
          value = newVal;
        }      
      }; 
      Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter
      }); 
    }
  }


  class User {
    username: string;
    @Min(8)
    password: string;
    constructor(username: string, password: string){
        this.username = username;
        this.password = password;
    }    
}

let danyUser = new User("dany", "pass");
console.log(danyUser);
console.log(danyUser['errors']);


// Method decorators
console.log("/// Method decorators");


const FunctionNameLogger = () => {
    return function (
      target: Object,
      key: string | symbol,
      descriptor: PropertyDescriptor
    ) {
      console.log(key);
      return descriptor;
    };
  }
  
  class Test {
    @FunctionNameLogger()
    Sum(a: number, b: number): number {
      return a + b;
    }
  }
  
  const instance: Test = new Test();
  instance.Sum(1, 4);


  // Parameter decorators
console.log("/// Parameter decorators");

function ParameterDecorator(
    target: Function, // The prototype of the class
    propertyKey: string | symbol, // The name of the method
    parameterIndex: number // The index of parameter in the list of the function's parameters
    ) {
    console.log("ParameterDecorator called on: ", target, propertyKey, parameterIndex);
}

class ParameterDecoratorExample {
    method(@ParameterDecorator param1: string, @ParameterDecorator param2: number) {
    }
}