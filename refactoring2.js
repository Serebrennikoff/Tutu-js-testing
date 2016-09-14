function drawRating(vote) {
  vote = (vote === 0) ? vote + 0.1 : vote; 
  return '★'.repeat(Math.ceil(vote/20)) + '☆'.repeat(5-Math.ceil(vote/20));
}