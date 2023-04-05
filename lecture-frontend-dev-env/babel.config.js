module.exports = {
  // presets: ["./my-babel-preset.js"],
  presets: [
    [
      "@babel/preset-env",
      {
        // 상세 타겟 버젼 설정
        targets: {
          // chrome: "79",
          ie: "11",
        },
        // 폴리필
        useBuiltIns: "usage",
        corejs: {
          version: 2,
        },
      },
    ],
  ],
};
