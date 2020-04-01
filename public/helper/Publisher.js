export default class Publisher {
  constructor() {
    if (Publisher.instance) {
      return Publisher.instance;
    }

    this.subscribes = {};
    Publisher.instance = this;
    return this;
  }

  get methods() {
    return {
      subscribe: this.subscribe.bind(this),
      notify: this.notify.bind(this),
      unsubscribe: this.unsubscribe.bind(this)
    };
  }

  addEventTypeToSubscription(event) {
    if (!this.subscribes[event]) {
      this.subscribes[event] = [];
    }
  }

  subscribe(event, callBack) {
    this.addEventTypeToSubscription(event);
    this.subscribes[event].push(callBack);
  }

  notify(event, data) {
    this.addEventTypeToSubscription(event);
    this.subscribes[event].forEach(func => func(data));
  }

  unsubscribe(event, callBack) {
    this.addEventTypeToSubscription(event);
    this.subscribes[event] = this.subscribes[event].filter(
      func => func !== callBack
    );
  }
}
