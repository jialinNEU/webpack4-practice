// import lodash in typescript
// 库对应的类型文件（@types/***)可以在叫DefinitelyTyped的github中搜索
// https://microsoft.github.io/TypeSearch/
import * as _ from 'lodash';

class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    // syntax highlight
    // const s = _.join();
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");
console.log(greeter.greet());