import { _decorator, Component, Node } from 'cc';
import { BLOCK_TYPE, Constants } from '../data/constants';
const { ccclass } = _decorator;

@ccclass('block')
export class block extends Component {
  // 方块类型
  _blockType: BLOCK_TYPE = BLOCK_TYPE.WHITE;

  start() {
    this.node.on(Node.EventType.TOUCH_START, this.onClick, this);
  }

  /**
   * 方块点击
   */
  onClick() {
    if (Constants.Game.isPlaying() && Constants.Game.isTheFrontGroup(this.node.parent.uuid)) {
      const processor = {
        // 点击黑块
        [BLOCK_TYPE.BLACK]: this.clickBlack.bind(this),
        // 点击白块
        [BLOCK_TYPE.WHITE]: this.clickWhite.bind(this),
      };
      processor[this._blockType] && processor[this._blockType]();
    }
  }

  // 点击黑块
  clickBlack() {
    this.setBlockType(BLOCK_TYPE.GRAY);
    // 加分
    Constants.Game.node.emit(Constants.EVENT_CLICK_BLACK, this.node.parent.uuid);
  }

  // 点击白块
  clickWhite() {
    this.setBlockType(BLOCK_TYPE.RED);
    Constants.Game.gameOver();
  }

  /**
   * 设置方块类型
   * @param type 方块类型
   */
  setBlockType(type: BLOCK_TYPE) {
    this._blockType = type;
    this.node.children.forEach((item) => {
      item.active = false;
    });
    this.node.getChildByName(type).active = true;
  }
}
