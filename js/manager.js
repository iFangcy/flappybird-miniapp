// 管理类，控制游戏逻辑
import { DataStore } from './base/dataStore';
import { AbovePencil } from './runtime/abovePencil';
import { BelowPencil } from './runtime/belowPencil';

export class Manager {
  static getInstance() {
    if (!Manager.instance) {
      Manager.instance = new Manager();
    }
    return Manager.instance;
  }

  constructor() {
    this.dataStore = DataStore.getInstance();
  }

  createPencil() {
    const minTop = this.dataStore.canvas.height / 8;  // 铅笔最低高度，屏幕高度八分之一
    const maxTop = this.dataStore.canvas.height / 2;  // 铅笔最高高度，屏幕高度二分之一
    const top = minTop + Math.random() * (maxTop - minTop);
    this.dataStore.get('pencils').push(new AbovePencil(top));
    this.dataStore.get('pencils').push(new BelowPencil(top));
  }

  run() {
    this.check();
    if (!this.isGameOver) {
      // 提取出背景图，然后绘制，这里绘制调用的是 Sprite 的 draw 方法
      this.dataStore.get('background').draw();

      const pencils = this.dataStore.get('pencils');
      if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
        // 屏幕中同时要有 4 支铅笔
        // 第一二两支铅笔为一组，如果第一支铅笔的 x 与 width 和小于 0，则表示第一组铅笔超出屏幕左边界
        // 当第一组铅笔超出边界时，从数组中取出第一组的两支铅笔
        pencils.shift();
        pencils.shift();
        this.dataStore.get('score').isScore = true;
      }

      if (pencils[0].x <= (this.dataStore.canvas.width - pencils[0].width) / 2 && pencils.length === 2 ) {
        // 当第一组超过屏幕宽度一半时，并且屏幕上只有一组时，创建新铅笔
        this.createPencil();
      }
    
      this.dataStore.get('pencils').forEach(value => {
        value.draw();
      });
      this.dataStore.get('land').draw();
      this.dataStore.get('bird').draw();
      this.dataStore.get('score').draw();

      // 刷新，注意每次刷新是整个屏幕内容一起刷新重绘的
      // requestAnimationFrame 刷新频率由浏览器决定，不能自己控制
      // setTimeOut 由自己控制频率
      // cancelAnimationFrame(timer);  需要手动销毁
      const timer = requestAnimationFrame(() => this.run());
      this.dataStore.put('timer', timer);
    }else {
      // 游戏结束
      this.dataStore.get('startButton').draw();
      cancelAnimationFrame(this.dataStore.get('timer'));
      this.dataStore.destroy();
      wx.triggerGC();
    }
  }

  // 点击事件修改小鸟位置
  birdsEvent() {
    for (let i = 0; i < 2; i++) {
      this.dataStore.get('bird').y[i] = this.dataStore.get('bird').birdsY[i];
    }
    this.dataStore.get('bird').time = 0;
  }

  // 判断小鸟是否撞击了铅笔或地板
  check() {
    const birds = this.dataStore.get('bird');
    const land = this.dataStore.get('land');
    const pencils = this.dataStore.get('pencils');
    const score = this.dataStore.get('score');

    // 地板撞击判断，因为三个鸟 y 值一样，所以只需要判断一只鸟
    if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
      console.log('撞击了地板');
      this.isGameOver = true;
      return;
    }

    // 小鸟的边框模型
    const birdsBorder = {
      top: birds.y[0],
      bottom: birds.birdsY[0] + birds.birdsHeight[0],
      left: birds.birdsX[0],
      right: birds.birdsX[0] + birds.birdsWidth[0]
    };

    // 铅笔边框模型
    const length = pencils.length;
    for (let i = 0; i < length; i++) {
      const pencil = pencils[i];
      const pencilBorder = {
        top: pencil.y,
        bottom: pencil.y + pencil.height,
        left: pencil.x,
        right: pencil.x + pencil.width
      };

      if (Manager.isStrike(birdsBorder, pencilBorder)) {
        this.isGameOver = true;
        return;
      }
    }

    // 加分逻辑，如果小鸟 x 大于铅笔 x 加上铅笔 width，表示小鸟越过了铅笔
    if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore) {
      score.isScore = false;
      score.scoreNumber++;
    }
  }

  // 判断小鸟是否和铅笔撞击
  static isStrike(birdsBorder, pencilBorder) {
    let s = false;
    if (birdsBorder.top > pencilBorder.bottom || birdsBorder.bottom < pencilBorder.top || birdsBorder.right < pencilBorder.left || birdsBorder.left > pencilBorder.right) {
      // 小鸟碰到铅笔
      s = true;
    }
    return !s;
  }
}