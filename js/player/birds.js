// 小鸟类
// 小鸟煽动翅膀是靠一张图片上的三个状态的切换完成的
import { Sprite } from '../base/sprite';

export class Birds extends Sprite {
  constructor() {
    const image = Sprite.getImage('birds');
    super(
      image,
      0, 0, 
      image.width, image.height,
      0, 0, 
      image.width, image.height
    );

    // 小鸟三种状态需要一个数组存储，小鸟宽 34 高 24，上下边距 10， 左右边距 9
    // clippingX 存储每张图 x 位置
    this.clippingX = [9, 9 + 34 + 18, 9 + 34 + 18 + 34 + 18];
    this.clippingY = [10, 10, 10];
    this.clippingWidth = [34, 34, 34];
    this.clippingHeight = [24, 24, 24];

    // 小鸟初始状态
    this.birdX = this.dataStore.canvas.width / 4;
    this.birdsX = [this.birdX, this.birdX, this.birdX];
    this.birdY = this.dataStore.canvas.height / 2;
    this.birdsY = [this.birdY, this.birdY, this.birdY];
    this.birdWidth = 34;
    this.birdsWidth = [this.birdWidth, this.birdWidth, this.birdWidth];
    this.birdHeight = 24;
    this.birdsHeight = [this.birdHeight, this.birdHeight, this.birdHeight];
    this.y = [this.birdY, this.birdY, this.birdY];

    // 当前小鸟是哪一个
    this.index = 0;
    this.count = 0;
    this.time = 0;
  }

  draw() {
    // 切换小鸟的速度
    const speed = 0.2;
    this.count = this.count + speed;
    if (this.count > 2) {
      this.count = 0;
    }
    // speed 使用整数 1 时不需要舍，这里使用 Math.floor 舍弃是为了起到减速的作用
    this.index = Math.floor(this.count);

    // 模拟重力加速度
    const g = 0.98 / 2.4;
    // 向上移动一段距离
    const offsetUp = 30;
    // 小鸟位移
    const offsetY = (g * this.time * (this.time - offsetUp)) / 2;
    for (let i = 0; i <= 2; i++) {
      this.birdsY[i] = this.y[i] + offsetY;
    }
    this.time++;

    super.draw(this.img,
              this.clippingX[this.index], this.clippingY[this.index],
              this.clippingWidth[this.index], this.clippingHeight[this.index],
              this.birdsX[this.index], this.birdsY[this.index],
              this.birdsWidth[this.index], this.birdsHeight[this.index]
    );
  }
}