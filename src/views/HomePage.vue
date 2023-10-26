<script setup>
import { computed, ref, reactive } from 'vue';
const stLocal = window.localStorage;
const asset = stLocal.getItem('selected');
const symbols = ref(null);
async function getTickers() {
	try {
		const uri = 'https://api.binance.com/api/v3/ticker/price';
		//const uri = 'src/data/tickers.json';
		const response = await fetch(uri);
		const data = await response.json();
		const result = data.filter((item) => item.symbol.endsWith(asset));
		function sortArray(x, y) {
			return x.symbol.localeCompare(y.symbol);
		}
		let list = result.sort(sortArray);
		symbols.value = reactive(list);
		console.log(symbols);
	} catch (err) {
		console.log("error occured", err);
	}	
}
getTickers().then((data) => {
	data;
})
</script>

<template>
	<div class="">
		<a href="trade" class="space-y-1">
			<article v-for="symbol in symbols" :key="symbol.symbol"	class="flex justify-between pl-2 pr-2 p-1 rounded-xl border hover:bg-gray-600 border-green-600">
				<div class="flex items-center gap-2">
					<input type="checkbox" name="check" class="border border-green-600 text-green-600 ">
					<img class="w-10 h-10 rounded-full" src="../public/images/user.png">
					<div class="text-md">
      			<div class="font-bold">{{ symbol.symbol }}</div>
      			<div class="">token name</div>
    			</div>
				</div>
				<div class="flex justify-end">
					<div class="text-md text-right">
						<div class="font-bold">{{ symbol.price * 1 }}</div>
						<div class="">volume</div>
					</div>
				</div>
			</article>
		</a>
	</div>
</template>

<style scoped></style>