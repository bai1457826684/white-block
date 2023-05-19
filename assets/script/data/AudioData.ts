// 音阶1-7简谱
export class AudioData {
  // 起风了
  static QI_FENG_LE = '1236565652365656532161216113323212365656523656565321632161163216321611';
  // 小星星
  static XIAO_XING_XING = '115566544332215544332554433211556654433221';
  // 卡农
  static KA_NONG = '534534556712343123345654517161765454545175617171712123671';

  static get allMusic(): string {
    const musics = [this.QI_FENG_LE, this.XIAO_XING_XING, this.KA_NONG];
    return musics.join('');
  }
}
