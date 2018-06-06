// 背景
import { Sprite } from '../base/sprite'
import { DataStore } from '../base/dataStore';

export class Background extends Sprite {
  constructor() {
    const image = Sprite.getImage('background');
    super(image, 0, 0, image.width, image.height, 0, 0, DataStore.getInstance().canvas.width, DataStore.getInstance().canvas.height);
  }
}