function stateFactor(state) {
    var stateObject = {
        _status: '',
        state: {
            state1: () => {},
            state2: () => {},
        },
        run: () => {
            return this.state[this._status]();
        }
    }
    stateObject._status = state;
    return stateObject;
}
stateFactor('state1').run();