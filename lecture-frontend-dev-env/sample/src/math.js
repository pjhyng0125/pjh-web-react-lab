// IIFE
/*
var math = math || {};

(function () {
  function sum(a, b) {
    return a + b;
  }

  math.sum = sum;
})();
*/

// ES2015 표준 모델 시스템 : export 만 추가
export function sum(a, b) {
  return a + b;
}
