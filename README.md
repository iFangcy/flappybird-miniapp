# Flappy Bird 微信小游戏版

1. 小游戏获取 canvas 的方式 wx.createCanvas() 和 Web 中获取方式 document.getElementById('canvas-id') 不一样，其他的 canvas 使用体验是基本一致的。
2. 小游戏中不同尺寸手机宽高都是不一样的，和小程序中设备宽度固定不同。
3. 屏幕内同一时刻必须保证有两对铅笔；铅笔上下高度是随机的。
4. requestAnimationFrame 和 cancelAnimationFrame 应该配对使用。