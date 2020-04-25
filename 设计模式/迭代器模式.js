function Iterator(item) {
    this.item = item;
}

Iterator.prototype.dealEach = function(fn) {
    for (var i=0; i < this.item.length; i++) {
        fn(this.item[i], i);
    }
}