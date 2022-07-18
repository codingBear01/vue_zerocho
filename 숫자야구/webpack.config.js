const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.vue'],
  },
  // webpacking에서는 entry, module, plugins, output 4가지 설정이 중요
  // webpack을 쓰는 이유? 방대해진 js 파일을 관리하기 위해
  entry: {
    // 여러 스크립트를 하나로 합칠 파일명 입력
    app: path.join(__dirname, 'main.js'),
  },
  module: {
    // webpacking의 핵심. javascirpt 파일 병합 규칙 정의
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  output: {
    filename: 'app.js', // [name].js(entry의 key)
    path: path.join(__dirname, 'dist'), // output의 폴더 경로
  },
};
