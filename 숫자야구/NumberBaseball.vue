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
    <div v-show="isShow">남은 목숨: {{ gameCnt }}</div>
    <ul v-show="isShow">
      <li v-for="(el, idx) in tries" :key="idx">
        입력한 숫자: {{ el.input }} {{ el.strike }}스트라이크 {{ el.ball }}볼
      </li>
    </ul>
    <div v-if="isMatched">🎉홈런!</div>
    <div v-else-if="isGameOver">☠게임 오버</div>
    <div v-if="isMatched || isGameOver">
      다시 시작하시겠습니까?
      <button @click="resetGame">한 판 더!</button>
    </div>
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
      isMatched: false,
      gameCnt: 10,
      isGameOver: false,
      isShow: true,
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

      this.numMatchedChecker();
      this.gameOverChecker();
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
    numMatchedChecker() {
      if (+this.inputNum === +this.randomNum.join('')) {
        this.isMatched = true;
        this.isShow = false;
      }
    },
    gameOverChecker() {
      this.gameCnt--;
      if (this.gameCnt === 0) {
        this.isGameOver = true;
        this.isShow = false;
      }
    },
    resetGame() {
      this.randomNum = [];
      this.inputNum = '';
      this.tries = [];
      this.isMatched = false;
      this.gameCnt = 10;
      this.isGameOver = false;
      this.isShow = true;
      this.init();
    },
  },
  mounted() {
    this.init();
  },
};
</script>
