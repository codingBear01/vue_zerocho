const app = Vue.createApp({
  template: /*html*/ `
  <div>
    <div>
      {{ leftNum }}</span> 곱하기 <span>{{ rightNum }}</span>은?
    </div>
    <form @submit="checkNums">
      <input type="number" v-model="inputNum" ref="ansInput"/>
      <button type="submit" class="submitBtn">결과 보기</button>
    </form>
    <div>입력값: {{ inputNum }}</div>
    <div v-if="isAns">{{ leftNum }} * {{ rightNum }} = {{ leftNum * rightNum}} {{ retMsg }}</div>
    <div v-if="point < 0" style="color: red;">병신이세여?ㅋ</div>
    <div v-else-if="point >= 10" style="color: blue;">와우 님 쫌 짱인듯?ㅎ</div>
    <div v-if="point >= 0 && point <= 10">점수: {{ point }}</div>
    <button v-if="point < 0 || point >= 10" @click="resetGame">재도전?</button>
  </div>
  `,
  data() {
    return {
      leftNum: Math.floor(Math.random() * 9 + 2),
      rightNum: Math.floor(Math.random() * 9 + 1),
      inputNum: 0,
      retMsg: '',
      bonusPoint: 0,
      point: 0,
      isAns: false,
    };
  },
  methods: {
    checkNums(e) {
      e.preventDefault();
      const submitBtn = document.querySelector('.submitBtn');
      const retNum = this.leftNum * this.rightNum;

      if (retNum === this.inputNum) {
        this.leftNum = Math.floor(Math.random() * 9 + 2);
        this.rightNum = Math.floor(Math.random() * 9 + 1);
        this.retMsg = '같당!ㅋ';
        this.bonusPoint++;
        this.point += this.bonusPoint;
        this.isAns = true;
        this.$refs.ansInput.focus();
      } else {
        this.retMsg = '엌ㅋ틀림ㅋ';
        this.bonusPoint = 0;
        this.point--;
        this.isAns = true;
        this.$refs.ansInput.focus();
      }

      if (this.point >= 10 || this.point < 0) {
        submitBtn.disabled = true;
      }
    },
    resetGame() {
      const submitBtn = document.querySelector('.submitBtn');
      this.leftNum = Math.floor(Math.random() * 9 + 2);
      this.rightNum = Math.floor(Math.random() * 9 + 1);
      this.inputNum = 0;
      this.retMsg = '';
      this.bonusPoint = 0;
      this.point = 0;
      this.isAns = false;
      this.$refs.ansInput.focus();
      submitBtn.disabled = false;
    },
  },
});
