let sellCoins = [];

module.exports = (coins) => {
	coins.forEach(coin => {
		if(coin.price && coin.amount)
			sellCoins.push(coin);
	});		
	return sellCoins;
};