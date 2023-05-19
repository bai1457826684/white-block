import { _decorator, Component, Vec3 } from 'cc';
import { block } from './block';
import { BLOCK_TYPE, Constants } from '../data/constants';
const { ccclass, property } = _decorator;

@ccclass('group')
export class group extends Component {
  // 当前组黑块数量
  blackNum: number = 0;

  // start() {}

  /**
   * 初始化方块属性
   */
  init() {
    // console.log('group init', this.node.uuid);
    // 随机设置一个黑块
    this.blackNum++;
    const randomIndex = Math.floor(Math.random() * 4);
    const blockComp = this.node.children[randomIndex].getComponent(block);
    blockComp.setBlockType(BLOCK_TYPE.BLACK);

    // 监听黑块点击事件
    Constants.Game.node.on(Constants.EVENT_CLICK_BLACK, this.clickBlack.bind(this), this);
  }

  // 黑块点击
  clickBlack(uuid: string) {
    if (uuid === this.node.uuid) {
      this.blackNum--;
      // console.log('this.blackNum', this.node.uuid, this.blackNum);
    }
  }

  // 销毁
  protected onDestroy(): void {
    Constants.Game.node?.off(Constants.EVENT_CLICK_BLACK, this.clickBlack.bind(this), this);
  }

  // 更新
  update(deltaTime: number) {
    // 游戏中
    // if (Constants.Game.isPlaying()) {
    //   this.node.translate(new Vec3(0, -deltaTime * 300));
    //   const pos = this.node.getPosition().clone();
    //   const { y } = pos;
    //   if (y < Constants.BLOCK_HEIGHT * -3) {
    //     // 游戏结束
    //     // if (this.blackNum > 0) {
    //       // Constants.Game.gameOver();
    //     // }
    //     // 销毁节点
    //     if (y < -500) {
    //       this.node.destroy();
    //       // this.node.getWorldPosition().clone();
    //       Constants.Game.node.emit(Constants.EVENT_GROUP_DESTROY);
    //     }
    //   }
    // }

    // 游戏中
    if (Constants.Game.isPlaying()) {
      const pos = this.node.getWorldPosition();
      const { y } = pos;
      // console.log(y);

      // 销毁节点
      if (y < -Constants.BLOCK_HEIGHT * 2 / 3) {
        // console.log(this.blackNum, y, this.node.uuid, '< -200');
        if (this.blackNum > 0) {
          Constants.Game.gameOver();
        }
        // 超出屏幕
        if (y < -Constants.BLOCK_HEIGHT - 50) {
          this.node.destroy();
          Constants.Game.node.emit(Constants.EVENT_GROUP_DESTROY);
          // this.node.getWorldPosition().clone();
        }
      }
    }
  }
}
