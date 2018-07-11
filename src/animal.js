const { observable } = require("mobx");
const { eventBus, subscribe } = require("mobx-event-bus");


class Animal {
    constructor() {
        eventBus.register(this);
        this.state = {
            name: 'Lion',
        }
    }
}

module.exports = new Animal();