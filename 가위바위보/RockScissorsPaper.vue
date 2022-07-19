<template>
  <div>
    <div id="computer" :style="computedStyleObj"></div>
    <div>
      <button @click="onClickBtn('가위')">가위</button>
      <button @click="onClickBtn('바위')">바위</button>
      <button @click="onClickBtn('보')">보</button>
    </div>
    <div>{{ result }}</div>
    <div>현재 {{ score }}점</div>
  </div>
</template>

<script>
const rspCoords = {
  가위: '-142px',
  바위: '0',
  보: '-284px',
};

let interval = null;

export default {
  name: 'RockScissorsPaper',
  data() {
    return {
      imgCoord: rspCoords.가위,
      result: '',
      score: 0,
    };
  },
  computed: {
    computedStyleObj() {
      return {
        background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`,
      };
    },
  },
  methods: {
    onClickBtn(choice) {},
  },
  // Vue Life Cycle: created, mounted, updated, destroyed
  beforeCreate() {
    console.log('beforeCreate');
  },
  created() {
    // component가 화면에 처음 뿌려지는 때. 화면에 없던 요소가 생기는 순간. data는 계산되었지만 화면에 rendering은 안 됐음.(javascript상에서만 존재)
    console.log('created');
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    // computed 등 계산된 data가 요소에 rendering되는 순간. 화면 조작과 관련된 작업 수행.
    console.log('mounted');
    interval = setInterval(() => {
      if (this.imgCoord === rspCoords.가위) {
        this.imgCoord = rspCoords.바위;
      } else if (this.imgCoord === rspCoords.바위) {
        this.imgCoord = rspCoords.보;
      } else if (this.imgCoord === rspCoords.보) {
        this.imgCoord = rspCoords.가위;
      }
    }, 100);
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    // 화면 내 data가 바뀌어 화면이 다시 rendering될 때
    console.log('updated');
  },
  beforeDestroy() {
    // component가 사라졌는데도 계속 실행되는 함수를 정리하여 memory leak 방지
    console.log('beforeDestroy');
    clearInterval(interval);
  },
  destroyed() {
    // 화면 내 있던 요소가 사라졌을 때
    console.log('destroyed');
  },
};
</script>

<style scoped>
#computer {
  width: 142px;
  height: 200px;
  background-position: 0 0;
}
</style>
