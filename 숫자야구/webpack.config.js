module.exports = {
  // webpacking에서는 entry, module, plugins, output 4가지 옵션이 중요
  // webpack을 쓰는 이유? 방대해진 js 파일을 관리하기 위해
  entry: {
    // 여러 스크립트를 하나로 합칠 파일명 입력
    app: './main.js',
  },
  module: {
    rules: [{}],
  },
  plugins: [],
  output: {
    filename: 'app.js',
    path: './dist',
  },
};
