// 变量缓存器，方便在不同的类中访问和修改变量
export class DataStore {
    static getInstance() {
      if (!DataStore.instance) {
        DataStore.instance = new DataStore();
      }
      return DataStore.instance; 
    }

    constructor() {
      // map 中存放需要随时销毁的变量，比如图片等，context 等放到 instance 上不需要销毁
      this.map = new Map();
      this.moveSpeed = 2;
    }

    put(key, value) {
      this.map.set(key, value);
      return this;
    }

    get(key) {
      return this.map.get(key);
    }

    // 销毁
    destroy() {
      for (let value of this.map.values()) {
        value = null;
      }
    }
}