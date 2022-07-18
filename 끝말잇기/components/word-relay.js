app.component('wordRelay', {
  props: {
    startWord: {
      type: String,
      required: true,
    },
  },
  template: /*html*/ `
  <div>
    <div>{{ word }}</div>
    <form @submit="onSubmitForm">
      <input type="text" v-model="inputVal" ref="ansInput"/>
      <button type="submit" class="submitBtn">결과 보기</button>
    </form>
    <div v-if="isAns">{{ retMsg }}</div>
    <div v-if="point < 0" style="color: red;">병신이세여?ㅋ</div>
    <div v-else-if="point >= 10" style="color: blue;">와우 님 쫌 짱인듯?ㅎ</div>
    <div v-if="point >= 0 && point <= 10">점수: {{ point }}</div>
    <button v-if="point < 0 || point >= 10" @click="resetGame">재도전?</button>
  </div>
  `,
  data() {
    console.log(this);
    return {
      word: this.startWord,
      inputVal: '',
      retMsg: '',
      bonusPoint: 0,
      point: 0,
      isAns: false,
    };
  },
  methods: {
    onSubmitForm(e) {
      e.preventDefault();
      const submitBtn = document.querySelector('.submitBtn');
      const wordLastChar = this.word[this.word.length - 1];
      const inputFirstChar = this.inputVal[0];

      if (wordLastChar === inputFirstChar) {
        this.retMsg = '정답!';
        this.bonusPoint++;
        this.point += this.bonusPoint;
        this.isAns = true;
        this.word = this.inputVal;
        this.inputVal = '';
        this.$refs.ansInput.focus();
      } else {
        this.retMsg = '땡!';
        this.bonusPoint = 0;
        this.point--;
        this.isAns = true;
        this.inputVal = '';
        this.$refs.ansInput.focus();
      }

      if (this.point >= 10 || this.point < 0) {
        submitBtn.disabled = true;
      }
    },
    resetGame() {
      const submitBtn = document.querySelector('.submitBtn');
      this.word = '끝말잇기';
      this.inputVal = '';
      this.bonusPoint = 0;
      this.point = 0;
      this.isAns = false;
      this.$refs.ansInput.focus();
      submitBtn.disabled = false;
    },
  },
});
