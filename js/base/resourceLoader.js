import { Resources } from "./resource.js";

// 这是资源加载器，需要确保 canvas 在资源图片加载完成之后在进行渲染
export class ResourceLoader {
  constructor() {
    this.map = new Map(Resources);
    for (let [key, value] of this.map) {
      const image = wx.createImage();
      image.src = value;
      this.map.set(key, image);
    }
  }

  // 所有资源加载完成后回调
  onLoaded(callback) {
    let loadedCount = 0; 
    for (let value of this.map.values()) {
      value.onload = () => {
        loadedCount++;
        // 判断是否加载了所有的资源，只有加载了所有的资源之后才能执行回调
        if (loadedCount >= this.map.size) {
          callback(this.map);
        }
      }
    }
  }

  static create() {
    return new ResourceLoader();
  }
}