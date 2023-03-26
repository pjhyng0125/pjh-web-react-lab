class MyWebpackPlugin {
  apply(compiler) {
    // 플러그인이 종료되었을 때 호출되는 함수
    // compiler.hooks.done.tap("My Plugin", (stats) => {
    //   console.log("MyWebpackPlugin: done");
    // });

    // webpack 4버전 : TypeError: compiler.plugin is not a function
    // compiler.plugin('emit', (compilation, callback) => {
    //   const source = compilation.assets['main.js'].source();
    //   compilation.assets['main.js'].source = () => {
    //     const banner = [
    //       '/**',
    //       ' * 이것은 BannerPlugin이 처리한 결과입니다.',
    //       ' * Build Date: 2019-10-10',
    //       ' */'
    //       ''
    //     ].join('\n');
    //     return banner + '\n' + source;
    //   }
    //   callback();
    // })

    // webpack 5버전 이상
    // sorce() : compilation.assets["main.js"] 객체 자체를 수정하도록 변경
    // size() : webpack이 번들 파일의 크기를 올바르게 계산할 수 있도록 추가
    compiler.hooks.emit.tapAsync("MyWebpackPlugin", (compilation, callback) => {
      const source = compilation.assets["main.js"].source();
      compilation.assets["main.js"] = {
        source: () => {
          const banner = [
            "/**",
            " * 이것은 BannerPlugin이 처리한 결과입니다.",
            " * Build Date: 2023-03-26",
            " */",
          ].join("\n");
          return banner + "\n" + source;
        },
        size: () => {
          return Buffer.byteLength(this.source(), "utf8");
        },
      };

      callback();
    });
  }
}

module.exports = MyWebpackPlugin;
