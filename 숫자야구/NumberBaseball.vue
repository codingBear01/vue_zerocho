<template>
  <div>
    <form @submit="onSubmitForm">
      <input
        type="text"
        placeholder="숫자를 4자리 입력하세요"
        v-model="inputNum"
        ref="input"
        class="input"
      />
      <button class="btn">결과 보기</button>
    </form>
    <ul>
      <li v-for="(el, idx) in tries" :key="idx">
        <div v-if="!matched">
          입력한 숫자: {{ el.input }} {{ el.strike }}스트라이크 {{ el.ball }}볼
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NumberBaseball',
  data() {
    return {
      randomNum: [],
      inputNum: '',
      tries: [],
      matched: false,
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
      const retObj = {
        input: '',
        strike: 0,
        ball: 0,
      };
      retObj.input = this.inputNum;

      for (const i in this.randomNum) {
        if (+this.inputNum[i] === this.randomNum[i]) {
          retObj.strike++;
        } else if (this.randomNum.includes(+this.inputNum[i])) {
          retObj.ball++;
        }
      }

      this.tries.push(retObj);
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
