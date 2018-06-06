// 下部分铅笔
import { Sprite } from '../base/sprite';
import { Pencil } from './pencil';

export class BelowPencil extends Pencil {
  constructor(top) {
    const image = Sprite.getImage('pencilDown'); 
    super(image, top);
  }

  draw() {
    // 上下铅笔之间的间距是屏幕高度的五分之一
    const gap = this.dataStore.canvas.height / 5;
    this.y = this.top + gap;
    super.draw();
  }
}