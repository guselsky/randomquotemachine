$('#quote-button').on('click', function() {
	var randomNumber = Math.floor(Math.random()* quotes.length);
	var randomQuote = quotes[randomNumber];
	$('#quote-area').text(randomQuote.Quote);
	$('#author-area').text(randomQuote.Author);

});