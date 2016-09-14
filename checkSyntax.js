'use strict';
function checkSyntax(str) {
  let brackets = { "{" : "}", "(" : ")", "[" : "]", "<" : ">" },
      reg = /[{([<]/g,
      opening;
  while(reg.exec(str)) {
    opening = reg.lastIndex - 1
  }
  if(opening >= 0) {
    let closing = str.indexOf(brackets[str.charAt(opening)], opening);
    if(closing > 0) {
      return checkSyntax(str.slice(0, opening).concat(str.slice(closing+1)))
    } else {
      return 1;
    }
  }
  return 0;
};