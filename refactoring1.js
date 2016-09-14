function func(s, a, b) {
    if (!s) return -1;
    for(var i = s.length-1; i >= 0; i--) {
        if(s[i] == a || s[i] == b) return i;
    }
    return -1;
}