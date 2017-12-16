const coinbase = require('coinbase'),
	  config = require('./config.json'),
	  buyCoins = require('./buy')(config.buy),
	  sellCoins = require('./sell')(config.sell);
	  currency = config.currency;

const client = new coinbase.Client({
	  	'apiKey': config.key,
	  	'apiSecret': config.secret
	  }),
	  cashWallet = {},
 	  coinWallet = {};


/*
	Initial setup, get all accounts
	Separate cash wallet from the coin wallets
	Verify that cash wallet holds enough funds to fulfill wanted purchase
	and/or coin wallet has enough quantity of the coin wanting to be sold
*/

const checkAccounts = (account) => {	
	const type = account.currency;
	if(type == currency) {
		cashWallet[type] = {
		'id': account.id,
		'balance': account.balance.amount
		};
	} else {						
		coinWallet[type] = {
		'id': account.id,		
		'balance': account.balance.amount,		
		};
	}
}


client.getAccounts({}, (err, accounts) => {
	if(err) throw err;
	accounts.forEach((account) => checkAccounts(account));	
	require('./checkBalance')(buyCoins, sellCoins, cashWallet);	
});


//Get the current buy price for each coin passed in, based on the account wallet currency
const buyPrice = (coin) => {	
	client.getBuyPrice({
		'currencyPair': `${coin.type}-${currency}`,			
	}, (err, info) =>  {	
		if(err)  {
			console.log(err);
			return;
		}	
		coin.lastBuyPrice = coin.currentBuyPrice || null;
		coin.currentBuyPrice = info.data.amount;					
	});
};


//Get the current sell price for each coin passed in, based on the account wallet currency
const sellPrice = (coin) => {
	client.getSellPrice({
		'currencyPair': `${coin.type}-${currency}`,			
	}, (err, info) =>  {			
		if(err) {
			console.log(err);
			return;
		} 
		coin.lastSellPrice = coin.currentSellPrice || null;
		coin.currentSellPrice = info.data.amount;					
	});
}


const sendReq = () => { 
	buyCoins.forEach(coin => {
		buyPrice(coin);	
		if(coin.currentBuyPrice < coin.price) 
			executeBuy(coinWallet[coin.type].id, coin.amount, coin.currentBuyPrice, coin.lastBuyPrice);		
	});

	sellCoins.forEach(coin => {
		sellPrice(coin);
		if(coin.currentSellPrice > coin.price) 
			executeSell(coinWallet[coin.type].id, coin.amount, coin.currentSellPrice);
	});
};

const executeBuy = (id, quantity, price, lastPrice) => {	
	client.getAccount(id, (err, account) => {
		account.buy({
		"amount": quantity,		
		"currency": account.currency,
		"commit": false,
		"payment_method": `${cashWallet[`${currency}`].id}` //Cash wallet on account.
	}, (err, tx) => {			
			if(err) throw err;
						
			if(tx.subtotal.amount >= (quantity * price)) {
				tx.commit(function(err, resp) {
					if (err) throw err;
					console.log(resp);
					process.exit();
				})				
			} else {
				console.log("The price was changed and the order not executed");
				console.log(tx);		
				process.exit();		
			}
		});
	});
};

const executeSell = (id, quantity, price) => {	
	client.getAccount(id, (err, account) => {
		account.sell({
		"amount": quantity,		
		"currency": account.currency,
		"commit": false,
		"payment_method": `${cashWallet[`${currency}`].id}` //Cash wallet on account.
	}, (err, tx) => {
			if(err) throw err;	

			if(tx.subtotal.amount <= (quantity * price)) {				
				tx.commit(function(err, resp) {
					if(err) throw err;
					console.log(resp);
					process.exit();
				})				
			} else {
				console.log("The price was changed and the order not executed");
				console.log(tx);
				process.exit();
			}
		});
	});
	
};

setInterval(sendReq, 5000);