function parseUrl(string) {
  var url = document.createElement('a');
  url.href = string;
  return url;
}