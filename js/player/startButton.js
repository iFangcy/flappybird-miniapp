import { Sprite } from "../base/sprite";
import { DataStore } from '../base/dataStore';

// 开始按钮
export class StartButton extends Sprite {
  constructor() {
    const image = Sprite.getImage('startButton');
    super(
      image, 
      0, 0, 
      image.width, image.height,
      (DataStore.getInstance().canvas.width - image.width) / 2,
      (DataStore.getInstance().canvas.height - image.height) / 2.5,
      image.width, image.height
    );
  }
}