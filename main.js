import { ResourceLoader } from "./js/base/resourceLoader";
import { Manager } from './js/manager';
import { Background } from './js/runtime/background'; 
import { DataStore } from './js/base/dataStore';
import { Land } from './js/runtime/land';
import { Birds } from './js/player/birds';
import { StartButton } from "./js/player/startButton";
import { Score } from "./js/player/score";

// 游戏入口，初始化整个游戏
export class Main {
  constructor() {
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.dataStore = DataStore.getInstance();
    this.manager = Manager.getInstance();

    const loader = ResourceLoader.create();
    loader.onLoaded(map => this.onResourceLoaded(map));

  }

  // 资源加载完成后执行
  onResourceLoaded(map) {
    this.dataStore.canvas = this.canvas;
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    this.createBackgroundMusic();

    this.init();
  }

  // 创建背景音乐
  createBackgroundMusic() {
    const bgm = wx.createInnerAudioContext();
    bgm.autoplay = true;
    bgm.loop = true;
    bgm.src = 'res/bgm.mp3';
  }

  init() {
    // 重置游戏
    this.manager.isGameOver = false;
    this.dataStore.put('pencils', [])
                .put('background', new Background())
                .put('land', new Land())
                .put('bird', new Birds())
                .put('startButton', new StartButton())
                .put('score', new Score());
    this.registerEvent();
    this.manager.createPencil();
    this.manager.run();
  }

  // 注册点击事件
  registerEvent() {
    // this.canvas.addEventListener('touchstart', e => {
    //   // 屏蔽事件冒泡
    //   e.preventDefault();
    //   console.log('被摸我');
    // });

    wx.onTouchStart(() => {
      if (this.manager.isGameOver) {
        console.log('游戏开始');
        this.init();
      }else {
        this.manager.birdsEvent();
      }
    });
  }
}