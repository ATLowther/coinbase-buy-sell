let buyCoins = [];

module.exports = (coins) => {
	coins.forEach(coin => {
		if(coin.price && coin.amount)
			buyCoins.push(coin);
	});	
	return buyCoins;
};