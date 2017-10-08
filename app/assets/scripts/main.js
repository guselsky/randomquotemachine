// (function(){

// var quotesGenerator = {
	
// 	init: function() {
// 		this.events();
// 	},
	
// 	cacheDom: function() {
// 		this.$el = $('.quote-machine');
// 		this.quoteButton = this.$el.find('#quote-button');
// 		this.quoteArea = this.$el.find('#quote-area');
// 		this.authorArea = this.$el.find('#author-area');
// 	},

// 	render: function() {
// 		this.cacheDom();
// 		var randomNumber = Math.floor(Math.random()* quotes.length);
// 		var randomQuote = quotes[randomNumber];
// 		this.quoteArea.text(randomQuote.Quote);
// 		this.authorArea.text(randomQuote.Author);
// 	},

// 	events: function() {
// 		console.log(this.render());
// 		this.quoteButton.click(this.render());
// 	}
// };

// quotesGenerator.init();
// })()

(function(){
	var quoteMachine = $('#quote-machine');
	var quoteButton = quoteMachine.find('#quote-button');
	var tweetButton = quoteMachine.find('#tweet-button');
	var quoteArea = quoteMachine.find('#quote-area');
	var authorArea = quoteMachine.find('#author-area');
	var randomQuote = '';

	quoteButton.on('click', function() {
	var randomNumber = Math.floor(Math.random()* quotes.length);
	randomQuote = quotes[randomNumber];
	quoteArea.text(randomQuote.Quote);
	authorArea.text(randomQuote.Author);
	tweetButton.removeClass('is-invisible');
	});

	tweetButton.on('click', function() {
		if (randomQuote != '') {
			tweetText = randomQuote.Quote + ' - ' + randomQuote.Author;
			console.log(tweetText);
			window.open('https://twitter.com/intent/tweet?text='+tweetText);
		} else {
			alert('Please generate a Quote!');
		}
	});

})()