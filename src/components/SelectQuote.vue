<script setup>
//["ARS", "AUD", "BIDR", "BKRW", "BNB", "BRL", "BTC", "BUSD", "BVND", "DAI", "DOGE",
//"DOT", "ETH", "EUR", "FDUSD", "GBP", "IDRT", "NGN", "PAX", "PLN", "RON", "RUB", "TRX",
//"TRY", "TUSD", "UAH", "USDC", "USDP", "USDS", "USDT", "UST", "VAI", "XRP", "ZAR"]
</script>

<template>
	<div class="h-8 text-sm text-gray-300">
		<select name="quoteAssets" class="bg-gray-800">
			<option value="BNB">BNB</option>
			<option value="BTC">BTC</option>
			<option value="BUSD" selected>BUSD</option>
			<option value="ETH">ETH</option>
			<option value="EUR">EUR</option>
			<option value="USDT">USDT</option>
		</select>
	</div>
</template>
<style scoped></style>