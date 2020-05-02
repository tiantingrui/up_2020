//* 工厂模式基本结构
function Factor(type) {
    switch (type) {
        case 'type1':
            return new Type1();
        case 'type2':
            return new Type2();
        case 'type3':
            return new Type3();
    }
}


