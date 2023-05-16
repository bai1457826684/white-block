import { _decorator, Component, Label, Node } from 'cc';
import { Constants } from '../data/constants';
const { ccclass, property } = _decorator;

@ccclass('score')
export class score extends Component {
  @property(Label)
  score: Label = null;

  start() {
    Constants.Game.node.on(Constants.EVENT_CLICK_BLACK, this.addScore, this);
  }

  /**
   * 增加分数
   */
  addScore() {
    this.score.string = String(Number(this.score.string) + 1);
  }

  protected onDestroy(): void {
    // Constants.Game.node?.off(Constants.EVENT_CLICK_BLACK, this.addScore, this);
  }
}
