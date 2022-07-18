<template>
  <form @submit="onSubmitForm">
    <input
      type="text"
      placeholder="숫자를 4자리 입력하세요"
      v-model="inputNum"
      ref="input"
      class="input"
    />
    <button class="btn">결과 보기</button>
    <div>{{ inputNum }}</div>
  </form>
</template>

<script>
export default {
  name: 'NumberBaseball',
  data() {
    return {
      randomNum: [],
      inputNum: '',
      retObj: {
        input: '',
        strike: 0,
        ball: 0,
      },
      tries: [],
    };
  },
  methods: {
    init() {
      this.checkInputVal();
      this.genRandomNum();
      console.log(this.randomNum);
    },
    onSubmitForm(e) {
      e.preventDefault();

      this.retObj.input = this.inputNum;

      for (const i in this.randomNum) {
        if (+this.inputNum[i] === this.randomNum[i]) {
          this.retObj.strike++;
        } else if (
          +this.inputNum[i] !== this.randomNum[i] &&
          this.randomNum.includes(+this.inputNum[i])
        ) {
          this.retObj.ball++;
        }
      }
      console.log(this.retObj);
      this.tries.push(this.retObj);

      this.retObj.strike = 0;
      this.retObj.ball = 0;
      console.log(this.tries);
    },
    genRandomNum() {
      while (true) {
        if (this.randomNum.length === 4) return;
        const num = Math.floor(Math.random() * 9 + 1);
        if (!this.randomNum.includes(num)) {
          this.randomNum.push(num);
        }
      }
    },
    checkInputVal() {
      const input = document.querySelector('.input');
      const btn = document.querySelector('.btn');
      input.addEventListener('keyup', () => {
        if (input.value.length > 4) {
          btn.disabled = true;
        } else {
          btn.disabled = false;
        }
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
