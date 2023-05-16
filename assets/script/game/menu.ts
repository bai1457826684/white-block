import { _decorator, Component, director, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('menu')
export class menu extends Component {
  // 开始游戏按钮
  @property(Node)
  startBtn: Node = null;
  // 菜单主页
  @property(Node)
  menu: Node = null;
  // 游戏结束页
  @property(Node)
  over: Node = null;
  @property(Label)
  score: Label = null;

  start() {
    this.startBtn.on(Node.EventType.TOUCH_START, this.startGame.bind(this), this);
  }

  // 进入菜单主页
  enterMenu() {
    this.menu.active = true;
    this.over.active = false;
  }

  // 游戏结束页
  enterOver(score: string = '') {
    console.log('分数', score);

    this.menu.active = false;
    this.over.active = true;
    this.score.string = score;
  }

  // 开始游戏
  startGame() {
    director.loadScene('main');
  }
}
