const { observable, autorun, toJS } = require("mobx");
const { EventEmitter } = require("events");

const history = [];

class MobxEvent extends EventEmitter {
    constructor(init) {
        super();
        if (init) this.reset(init);
    }
    history() {
        return history;
    }
    backTo(index) {
        const current = history[index - 1] || history[0];
        for (let i = history.length - 1; i >= index - 1; i -= 1) {
            history.splice(i, 1);
        }
        Object.keys(current).forEach((k) => {
            this.state[k] = current[k];
        });
    }
    rollback(times = 1) {
      this.backTo(history.length - times);
    }
    getState() {
        return toJS(this.state);    
    }
    reset(obj) {
        this.state = observable(obj || {});

        autorun(() => {
            const prev = history[history.length - 1];
            const current = this.getState();
            this.emit('change', current );

            if (prev && current && JSON.stringify(current) === JSON.stringify(prev)) return false;
            history.push(this.getState());
        });
    }
}
module.exports = MobxEvent;