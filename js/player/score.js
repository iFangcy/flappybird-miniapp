import { DataStore } from "../base/dataStore";

// 计分器类
export class Score {
  constructor() {
    this.ctx = DataStore.getInstance().ctx;
    this.scoreNumber = 0;

    // 因为 canvas 加分很快，需要一个变量控制加分只加一次
    this.isScore = true; 
  }

  draw() {
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = 'red';
    this.ctx.fillText(
      "得分：" + this.scoreNumber,
      30,
      DataStore.getInstance().canvas.height / 18,
      1000
    );
  }
}