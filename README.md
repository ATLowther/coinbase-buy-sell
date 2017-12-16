# coinbase-buy-sell

*******************
This script has been tested and is designed to make purchases with your in-app wallet on Coinbase as of API date 2017-12-14. However, bugs are possible. Please make sure you read over the script before using it and make any modifications necessary to be compatible with the API version on your personal Coinbase account.
********************


This is a simple buy/sell script for Coinbase. Fill out the config file with your key/secret as well as your desired
coins to buy/sell and the script will run and execute the order when the conditions are met. Upon starting the script,
it will verify that you have enough funds in your Coinbase wallet to make a single purchase of your desired coins or enough coins in your wallet to fulfill a desired sell.



	{   
		"key": "", //Enter your generated key from Coinbase here.  
		"secret": "", //Enter your generated secret from Coinbase here.  
		"currency": "", //Enter the denomination of currency your Coinbase wallet holds. Ex: "USD".  



			1. Find the object holding the type of coin you wish to purchase.  
			2. Enter the price at which you would like the script to purchase the desired amount of the coin(s).  
			3. Enter the quantity of the coin you would like to purchase at that price.  
			4. Please make sure any quantity and price are entered as numbers and not strings.    
			5. For any coin you do not wish to purchase, leave/modify both the price and amount to null. 

		"buy": [
			{
				"type": "BTC",
				"price": null,
				"amount": null
			},
			{
				"type": "ETH",
				"price": null,
				"amount": null
			},
			{
				"type": "LTC",
				"price": null,
				"amount": null
			}
		],	


			1. Find the object holding the type of coin you would like to sell.
			2. Enter the price at which you would like the script to sell the desired amount of the coin(s).
			3. Enter the quantity of the coin(s) you would like to sell at that price.
			4. Please make sure any quantity and price are entered as numbers and not strings.
			5. For any coin you do not wish to sell, leave/modify both the price and amount to null

		"sell": [
			{
				"type": "BTC",
				"price": null,
				"amount": null
			},
			{
				"type": "ETH",
				"price": null,
				"amount": null
			},
			{
				"type": "LTC",
				"price": null,
				"amount": null
			}
		]
	}
