<template>
  <div>
    <form @submit.prevent="onSubmitForm">
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
    <div v-if="isMatched || isGameOver">
      <div>{{ retMsg }}</div>
      다시 시작하시겠습니까?
      <button @click="resetGame">한 판 더!</button>
    </div>
  </div>
</template>

<script>
const genRandomNum = () => {
  const randomNums = [];
  while (true) {
    if (randomNums.length === 4) return randomNums;
    const num = Math.floor(Math.random() * 9 + 1);
    if (!randomNums.includes(num)) {
      randomNums.push(num);
    }
  }
};

const checkInputVal = () => {
  const input = document.querySelector('.input');
  const btn = document.querySelector('.btn');
  input.addEventListener('keyup', () => {
    if (input.value.length > 4) {
      btn.disabled = true;
    } else {
      btn.disabled = false;
    }
  });
};

export default {
  name: 'NumberBaseball',
  // data나 methods에는 화면 rendering과 밀접한 것들만 관리
  data() {
    return {
      randomNum: genRandomNum(),
      inputNum: '',
      tries: [],
      isMatched: false,
      gameCnt: 10,
      isGameOver: false,
      isShow: true,
      retMsg: '',
    };
  },
  methods: {
    onSubmitForm() {
      this.$refs.input.focus();
      this.ballCntChecker();
      this.gameOverChecker();
    },
    ballCntChecker() {
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
    gameOverChecker() {
      const btn = document.querySelector('.btn');
      this.gameCnt--;
      if (+this.inputNum === +this.randomNum.join('')) {
        this.isMatched = true;
        this.isShow = false;
        this.retMsg = '🎉홈런!';
        btn.disabled = true;
      } else if (this.gameCnt === 0 && +this.randomNum !== +this.inputNum) {
        this.isGameOver = true;
        this.isShow = false;
        this.retMsg = '☠게임 오버😭';
        btn.disabled = true;
      }
    },
    resetGame() {
      const btn = document.querySelector('.btn');
      this.randomNum = genRandomNum();
      this.inputNum = '';
      this.tries = [];
      this.isMatched = false;
      this.gameCnt = 10;
      this.isGameOver = false;
      this.isShow = true;
      btn.disabled = false;
      checkInputVal();
      console.log(this.randomNum);
    },
  },
  mounted() {
    console.log(this.randomNum);
    checkInputVal();
  },
};
</script>
