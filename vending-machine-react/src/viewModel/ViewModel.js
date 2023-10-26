export default class ViewModel {
  constructor(model) {
    this.model = model;
  }

  getTotalAmount() {
    return this.model.getTotalAmount();
  }
  getUserCoins() {
    return this.model.getUserCoins();
  }
  getMachineCoins() {
    return this.model.getMachineCoins();
  }
  getItems() {
    return this.model.getItems();
  }
  getMyItems() {
    return this.model.getMyItems();
  }
}
