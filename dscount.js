'use strict';
function dscount(str, s1, s2) {
  let res = 0,
      regExp = new RegExp(`${s1}${s2}`, 'gi');
  while(regExp.exec(str)) {
    res++;
    --regExp.lastIndex;
  }
  return res;
}