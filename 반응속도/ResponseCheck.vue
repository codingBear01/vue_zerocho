<template>
  <div>
    <div id="screen" :class="state">{{ msg }}</div>
    <div>
      <div>평균 시간: {{}}</div>
      <button @click="onReset">RESET</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResponseCheck',
  data() {
    return {
      result: [],
      state: 'waiting',
      msg: '클릭하면 시작됩니다!',
    };
  },
  methods: {
    onReset() {

    }
    onClickScreen() {

    }
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
