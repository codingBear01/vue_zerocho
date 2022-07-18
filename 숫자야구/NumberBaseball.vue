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
      inputNum: '',
    };
  },
  methods: {
    init() {
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
    onSubmitForm(e) {
      e.preventDefault();
    },
  },
  mounted() {
    this.init();
  },
};
</script>
