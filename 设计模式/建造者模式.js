//* 建造者模式的基本结构

//? 模块一
function Model1() {}
//? 模块二
function Model2() {}
//? 最终的使用类
function Final() {
    this.model1 = new Model1()
    this.model2 = new Model2()
}