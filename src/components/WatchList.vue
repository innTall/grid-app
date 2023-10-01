<script setup>
import { ref } from 'vue';
const symbols = ref(null);
async function getTickers() {
	try {
		const uri = 'https://api.binance.com/api/v3/ticker/price';
		const response = await fetch(uri);
		const data = await response.json();
		const filtered = (list, key, value) => {
			let filArr = [];
			let i = data.length;
			let reg = /(?<=\w)BUSD$/;
			while (i--) {
				if (reg.test(list[i][key])) {
					filArr.push(list[i]);
				}
			}
			return filArr;
		};
		const tickerList = filtered(data, "symbol");
		const sortArray = (x, y) => {
			return x.symbol.localeCompare(y.symbol);
		};
		symbols.value = tickerList.sort(sortArray);
	} catch (err) {
		console.log("error occured", err);
	}
}
getTickers().then((data) => {
	data;
})
</script>

<template>
	<div class="bg-gray-800">
		<a href="trade" class="container bg-gray-800 rounded-full space-y-1">
			<article v-for="symbol in symbols" :key="symbol.symbol"
				class="flex justify-between rounded-2xl border hover:bg-gray-600 border-green-600">
				<div class="flex items-center">
					<div class="">
						<input type="checkbox" class="bg-gray-600 rounded-l ml-2 h-8 border-2 border-green-600 text-green-400 w-3">
					</div>
					<figure class="p-2">
						<img class="w-8 h-8 rounded-full" src="../public/images/user.png">
					</figure>
					<div class="text-md text-white">
						<p class="">
							<strong>
								<span class="">{{ symbol.symbol }}</span>
							</strong>
							<br>
							<small class="">token name</small>
						</p>
					</div>
				</div>
				<div class="flex justify-end mr-2">
					<p class="text-md text-white text-right">
						<strong>
							<span class="">{{ symbol.price }}</span>
						</strong>
						<br>
						<small class="">volume</small>
					</p>
				</div>
			</article>
		</a>
	</div>
</template>

<style scoped></style>