/*
 * @Descripttion: 
 * @version: 
 * @Author: terry
 * @Date: 2020-09-28 10:20:59
 * @LastEditors: terry
 * @LastEditTime: 2020-09-28 10:52:47
 */

 // 类的内部和类的外部
//  class Person {
//      // public 类的外部和内部都可以使用
//      public name: string
//      public say() {
//          console.log(this.name + 'Hello')
//      }
//      // private 只能在类的内部使用不可以在外部使用
//      private uname: string
//      private uSay() {}
//      // protected 也只能在类的内部使用 && 子类中使用（继承）
//      protected pname: string
//  }

//  class Teacher extends Person {
//      public sayBye() {
//          this.pname
//      }
//  }

//  const person = new Person()
// //  person.uname = 'terry'
// //  person.pname = 'ice'
//  person.say()
// //  person.uSay()
// //  console.log(person.uname)