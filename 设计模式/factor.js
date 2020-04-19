//* 工厂模式
function Factor(typr) {
    switch (type) {
        case 'type1':
            return new Type1();
        case 'type2':
            return new Type2();
        case 'type3':
            return new Type3();
    }
}


//* 建造者模式
let Singleton = function(name) {
    this.name = name
}
Singleton.getInstance = function(name) {
    if (this.instance) {
        return this.instance
    }
    return this.instance = new Singleton(name)
}