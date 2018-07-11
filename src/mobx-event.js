const { observable, autorun, toJS } = require("mobx");
const { EventEmitter } = require("events");

class MobxEvent extends EventEmitter {
    constructor(init) {
        super();
        this._history = [];
        if (init) this.reset(init);
    }
    history() {
        return this._history;
    }
    backTo(index) {
        const current = this._history[index] || this._history[0];
        for (let i = this._history.length; i >= index; i -= 1) {
            this._history.splice(i, 1);
        }
        Object.keys(current).forEach((k) => {
            this.state[k] = current[k];
        });
    }
    rollback(times = 0) {
      this.backTo(this._history.length - times);
    }
    getState() {
        return toJS(this.state);    
    }
    reset(obj) {
        this.state = observable(obj || {});

        autorun(() => {
            const prev = this._history[this._history.length - 1];
            const current = this.getState();
            this.emit('change', current );

            if (prev && current && JSON.stringify(current) === JSON.stringify(prev)) return false;
            this._history.push(this.getState());
        });
    }
}
module.exports = MobxEvent;