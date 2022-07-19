<template>
  <div>
    <div id="screen" :class="state" @click="onClickScreen">{{ msg }}</div>
    <!-- template은 rendering 시 없는 요소 취급 -->
    <template v-if="result.length">
      <div>평균 시간: {{ getAvg }}ms</div>
      <button @click="onReset">RESET</button>
    </template>
  </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;

export default {
  name: 'ResponseCheck',
  data() {
    return {
      result: [],
      state: 'waiting',
      msg: '클릭하면 시작됩니다!',
      avg: 0,
    };
  },
  // 계산해야 하는 값이 있으면 template에 직접 입력하지 않고 computed에서 처리. computed를 쓰는 이유는 computed를 통한 data는 caching되기 때문. 따라서 불필요한 연산을 막아 성능 개선할 수 있음.
  computed: {
    getAvg() {
      const avgTime =
        this.result.reduce((a, c) => a + c, 0) / this.result.length;
      return this.result.length ? avgTime.toFixed(1) : 0;
    },
  },
  methods: {
    onReset() {
      this.result = [];
      this.avg = 0;
    },
    onClickScreen() {
      if (this.state === 'waiting') {
        this.state = 'ready';
        this.msg = '초록색이 되면 클릭하세요!';
        timeout = setTimeout(() => {
          this.state = 'now';
          this.msg = '지금 클릭!';
          startTime = new Date();
        }, Math.floor(Math.random() * 1000 + 2000));
      } else if (this.state === 'ready') {
        clearTimeout(timeout);
        this.state = 'waiting';
        this.msg = '너무 급했어요! 다시 도전하시려면 클릭하세요!';
      } else if (this.state === 'now') {
        endTime = new Date();
        this.state = 'waiting';
        this.msg = '클릭하면 시작됩니다!';
        this.result.push(endTime - startTime);
      }
    },
  },
};
</script>

<style scoped>
#screen {
  width: 300px;
  height: 300px;
  text-align: center;
  user-select: none;
}

#screen.waiting {
  background-color: aqua;
}
#screen.ready {
  background-color: red;
  color: white;
}
#screen.now {
  background-color: greenyellow;
}
</style>
