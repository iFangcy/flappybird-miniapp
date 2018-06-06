import { Sprite } from '../base/sprite';
import { DataStore } from '../base/dataStore';

// 铅笔基类
export class Pencil extends Sprite {
  constructor(image, top) {
    super(image, 0, 0, image.width, image.height, DataStore.getInstance().canvas.width, 0, image.width, image.height);
    this.top = top;
    this.moveSpeed = 2;
  }

  draw() {
    // 移动速度
    this.x = this.x - this.moveSpeed;
    super.draw(
        this.img,
        0, 0,
        this.width, this.height,
        this.x, this.y,
        this.width, this.height
    );
  }
}