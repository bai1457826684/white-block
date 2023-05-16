import { _decorator, Component, director, instantiate, Label, Node, Prefab, Vec3 } from 'cc';
import { Constants } from '../data/constants';
import { group } from './group';
import { menu } from './menu';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {
  // @property(Prefab)
  // block: Prefab = null;
  @property(Node)
  panel: Node = null;
  @property(Prefab)
  group: Prefab = null;
  @property(Label)
  score: Label = null!;

  // 游戏状态
  state: number = Constants.GAME_STATE.READY;
  // 游戏初始速度
  speed: number = Constants.SPEED;

  start() {
    Constants.Game = this;

    console.log('game start');

    this.init();
  }

  /**
   * 初始化
   */
  init() {
    // const y = -333.5;
    const y = 667; // 第一行坐标
    for (let index = 0; index < 8; index++) {
      this.generateBlock(-375, y + Constants.BLOCK_HEIGHT * index);
    }

    this.node.on(Constants.EVENT_GROUP_DESTROY, this.generateBlock.bind(this), this);

    this.gameStart();
  }

  /**
   * 生成黑块
   */
  generateBlock(x: number = -375, y?: number) {
    // 没指定坐标，则加到最后一位
    if (!y) {
      const { length } = this.panel.children;
      if (length) {
        y = this.panel.children[length - 1]?.getPosition().clone().y + Constants.BLOCK_HEIGHT;
      }
    }
    // 预制资源Prefab实例化为Node
    const groupNode = instantiate(this.group);
    groupNode.getComponent(group).init();
    groupNode.setPosition(x, y);
    this.panel.addChild(groupNode);
  }

  /**
   * 当前group是否为最底下一行
   */
  isTheFrontGroup(uuid: string): boolean {
    const element = this.panel.children.find((ele) => ele.getComponent(group).blackNum > 0);
    console.log(element?.uuid, uuid);
    return element?.uuid === uuid;
  }

  /**
   * 是否正在游戏
   */
  isPlaying(): boolean {
    return Constants.Game.state === Constants.GAME_STATE.PLAYING;
  }

  /**
   * 开始游戏
   */
  gameStart() {
    this.state = Constants.GAME_STATE.PLAYING;
  }

  /**
   * 暂停游戏
   */
  gamePause() {
    this.state = Constants.GAME_STATE.PAUSE;
  }

  /**
   * 游戏结束
   */
  gameOver() {
    this.state = Constants.GAME_STATE.OVER;
    const score = this.score.string;
    setTimeout(() => {
      // 加载场景
      director.loadScene('menu', (err, scene) => {
        scene.getChildByName('menuManagement').getComponent(menu).enterOver(score);
      });
    }, 500);
  }

  // 更新
  update(deltaTime: number) {
    // 游戏中
    if (this.isPlaying()) {
      this.panel.translate(new Vec3(0, -deltaTime * this.speed));
      this.speed += deltaTime * Constants.ACCELERATION;
    }
  }
}
