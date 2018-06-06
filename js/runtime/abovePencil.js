// 上部分铅笔
import { Sprite } from '../base/sprite';
import { Pencil } from './pencil';

export class AbovePencil extends Pencil {
  constructor(top) {
    const image = Sprite.getImage('pencilUp'); 
    super(image, top);
  }

  draw() {
    this.y = this.top - this.height;
    super.draw();
  }
}