// 不断移动的陆地
import { Sprite } from '../base/sprite';
import { DataStore } from '../base/dataStore';

export class Land extends Sprite {
  constructor() {
    const image = Sprite.getImage('land');
    super(image, 0, 0, image.width, image.height, 0, DataStore.getInstance().canvas.height - image.height, image.width, image.height);

    // 地板水平变化坐标
    this.landX = 0;
    // 地板移动速度
    this.landSpeed = DataStore.getInstance().moveSpeed;
  }

  draw() {
    // 移动地板
    this.landX = this.landX + this.landSpeed;
    if (this.landX > this.img.width - DataStore.getInstance().canvas.width) {
      this.landX = 0;
    }
    super.draw(this.img,
                this.srcX,
                this.srcY,
                this.srcW,
                this.srcH,
                -this.landX,
                this.y,
                this.width,
                this.height
    );
  }
}