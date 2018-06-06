// 精灵基类，负载初始化精灵加载的资源和大小以及位置
import { DataStore } from './dataStore';

export class Sprite {
  constructor(img = null,         // 图片
              srcX = 0, srcY = 0, // 剪裁位置
              srcW = 0, srcH = 0, // 剪裁尺寸
              x = 0, y = 0,       // 图片放置位置
              width = 0, height= 0) // 图片放置尺寸
              {
    this.dataStore = DataStore.getInstance();
    this.ctx = this.dataStore.ctx;
    this.img = img;
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcW = srcW;
    this.srcH = srcH;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  static getImage(key) {
    return DataStore.getInstance().res.get(key);
  }

  draw(img = this.img,
       srcX = this.srcX,
       srcY = this.srcY,
       srcW = this.srcW,
       srcH = this.srcH,
       x = this.x,
       y = this.y,
       width = this.width,
       height = this.height
  ) {
    this.ctx.drawImage(
      img,
      srcX,
      srcY,
      srcW,
      srcH,
      x,
      y,
      width,
      height
    );
  }
}