module.exports = (buyCoins, sellCoins, wallet) => {
	if(buyCoins) {
		buyCoins.forEach(coin => {
			if(wallet[`${currency}`].balance < (coin.buyAmount * coin.buyPrice) * 1.149) 
				throw new Error("You don't not have enough funds in your wallet to purchase " + coin.type);
		});
	}	
	if(sellCoins) {
		sellCoins.forEach(coin => {
			if (!coin.balance || coin.balance < coin.sellAmount) 
				throw new Error("You don't have " + coin.amount + " " + coin.type + " in your wallet to sell");
		});
	}	
};