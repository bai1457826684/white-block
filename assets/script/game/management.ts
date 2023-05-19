import { _decorator, Component, Node } from 'cc';
import { Constants } from '../data/constants';
const { ccclass, property } = _decorator;

@ccclass('management')
export class management extends Component {
  public state: number = Constants.GAME_STATE.READY;

  start() {
    // Constants.Management = this;
  }

  update(deltaTime: number) {}
}
