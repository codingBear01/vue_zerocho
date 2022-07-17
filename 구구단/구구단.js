const app = Vue.createApp({
  template: /*html*/ `
  <div style="">
    <div>
      <span>{{ leftNum }}</span> 곱하기 <span>{{ rightNum }}</span>은?
    </div>
    <div>
      <input type="number" v-model="ansNum"/>
      <button @click="checkNums">결과 보기</button>
    </div>
    <div v-if="point < 0" style="color: red;">병신이세여?ㅋ</div>
    <div v-else-if="point > 10" style="color: blue;">와우 님 쫌 짱인듯?ㅎ</div>
    <div v-else>{{ retMsg }}</div>
    <div>점수: {{ point }}</div>
    <button v-if="point < 0 || point > 10" @click="resetGame">재도전?</button>
  </div>
  `,
  data() {
    return {
      leftNum: Math.floor(Math.random() * 9 + 2),
      rightNum: Math.floor(Math.random() * 9 + 1),
      ansNum: 0,
      retMsg: '',
      bonusPoint: 0,
      point: 0,
    };
  },
  methods: {
    checkNums() {
      const retNum = this.leftNum * this.rightNum;
      if (retNum === this.ansNum) {
        this.leftNum = Math.floor(Math.random() * 9 + 2);
        this.rightNum = Math.floor(Math.random() * 9 + 1);
        this.retMsg = '같당!ㅋ';
        this.bonusPoint++;
        this.point += this.bonusPoint;
      } else {
        this.retMsg = '엌ㅋ틀림ㅋ';
        this.bonusPoint = 0;
        this.point--;
      }
    },
    resetGame() {
      this.leftNum = Math.floor(Math.random() * 9 + 2);
      this.rightNum = Math.floor(Math.random() * 9 + 1);
      this.ansNum = 0;
      this.retMsg = '';
      this.bonusPoint = 0;
      this.point = 0;
    },
  },
});
