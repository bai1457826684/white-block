import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
import { Constants } from '../data/constants';
import { AudioData } from '../data/AudioData';
const { ccclass, property } = _decorator;

@ccclass('audio')
export class audio extends Component {
  // // 音频 A
  // @property(AudioSource)
  // audioA: AudioSource = null!;
  // // 音频 B
  // @property(AudioSource)
  // audioB: AudioSource = null!;
  // // 音频 C
  // @property(AudioSource)
  // audioC: AudioSource = null!;
  // // 音频 D
  // @property(AudioSource)
  // audioD: AudioSource = null!;
  // // 音频 E
  // @property(AudioSource)
  // audioE: AudioSource = null!;
  // // 音频 F
  // @property(AudioSource)
  // audioF: AudioSource = null!;
  // // 音频 G
  // @property(AudioSource)
  // audioG: AudioSource = null!;

  // 音频列表
  audioList: Array<AudioSource> = [];
  // audioLength = 0;
  // 当前播放音频索引
  pianoIndex = 0;

  start() {
    this.audioList = this.node.getComponents(AudioSource);
    // this.audioLength = this.audioList.length;
    

    Constants.Game.node.on(Constants.EVENT_CLICK_BLACK, this.playPiano.bind(this), this);
  }

  // 播放钢琴音频
  playPiano() {
    const index = Number(AudioData.KA_NONG[this.pianoIndex]) - 1;
    console.log(index);
    
    const audio = this.audioList[index];
    audio.play();
    this.pianoIndex++;
    if (this.pianoIndex >= AudioData.KA_NONG.length) {
      this.pianoIndex = 0;
    }
  }

  onDestroy() {
    // this.audioList.forEach((audio) => {
    //   audio.stop();
    // });
  }

  update(deltaTime: number) {}
}
