export default class Model {
  constructor() {
    this.totalAmount = 0;
    this.userCoins = { 1: 10, 5: 10, 10: 10, 50: 10, 100: 10 };
    this.machineCoins = { 1: 10, 5: 10, 10: 10, 50: 10, 100: 10 };
    this.items = [
      {
        itemName: '여주',
        price: 155,
        stock: 10,
        image: './src_assets/img11.png',
      },
      {
        itemName: '코순',
        price: 888,
        stock: 10,
        image: './src_assets/img12.png',
      },
      {
        itemName: '루미',
        price: 700,
        stock: 10,
        image: './src_assets/img09.png',
      },
      { itemName: '콩', price: 20, stock: 10, image: './src_assets/img17.png' },
      {
        itemName: '재희',
        price: 95,
        stock: 10,
        image: './src_assets/img10.png',
      },
      { itemName: '번', price: 18, stock: 10, image: './src_assets/img14.png' },
      {
        itemName: '승목',
        price: 1000,
        stock: 10,
        image: './src_assets/img15.png',
      },
      {
        itemName: '죽순',
        price: 500,
        stock: 10,
        image: './src_assets/img16.png',
      },
    ];
    this.myItems = [];
  }

  getTotalAmount() {
    return this.totalAmount;
  }
  getUserCoins() {
    return this.userCoins;
  }
  getMachineCoins() {
    return this.machineCoins;
  }
  getItems() {
    return this.items;
  }
  getMyItems() {
    return this.myItems;
  }
}
