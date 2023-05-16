import { game } from '../game/game';
import { management } from '../game/management';

// 游戏状态
enum GAME_STATE {
  /**
   * @zh 游戏准备中
   */
  READY = 1,
  /**
   * @zh 游戏中
   */
  PLAYING = 2,
  /**
   * @zh 游戏暂停
   */
  PAUSE = 3,
  /**
   * @zh 游戏结束
   */
  OVER = 4,
}


// 方块类型 这里的值需要跟对应节点name一致
export enum BLOCK_TYPE {
  // 白色, 碰就结束
  WHITE = 'white',
  // 黑色, 不能不碰
  BLACK = 'black',
  // 灰色, 点击无效
  GRAY = 'gray',
  // 红色, 白色点击错误颜色
  RED = 'red',
}

// 常量
export class Constants {
  // game class
  static Game: game;
  // managemant class
  static Management: management;

  // block
  static BLOCK_WIDTH = 187.5; // 方块宽
  static BLOCK_HEIGHT = 280; // 方块高

  // game
  static SPEED = 500; // 初始速度
  // static acceleration
  static ACCELERATION = 10; // 加速度

  // 游戏状态
  static GAME_STATE = GAME_STATE; // 游戏状态枚举
  // static BLOCK_TYPE = BLOCK_TYPE; // 方块类型枚举

  // 自定义事件名
  static EVENT_CLICK_BLACK = 'clickBlack'; // 点击黑块
  static EVENT_GROUP_DESTROY = 'groupDestroy'; // 组节点销毁
}
