const app = Vue.createApp({
  data() {
    return {
      liked: false,
    };
  },
  methods: {
    onClickButton() {
      this.liked = true;
    },
  },
});
