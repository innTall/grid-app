<script setup>
import { TrashIcon, XCircleIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import { ref, reactive } from 'vue';
const stLocal = window.localStorage;
const asset = stLocal.getItem('selected');
const symbols = ref(null);
async function getSymbols() {
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
getSymbols().then((data) => {
	data;
})
function removeSymbol(symbol) {
	symbols.value = symbols.value.filter(element => element !== symbol)
}
</script>

<template>
	<div class="">
		<ul id="ulFound" class="">
			<li v-for="symbol in symbols" :key="symbol.symbol"
				:class="{ impClass: symbol.important }"
				@click.self="symbol.found=!symbol.found"
				v-show="symbol.found" class="mt-1">
				<div class="flex justify-between pl-2 p-1 rounded-xl border-2 hover:bg-gray-800 border-red-800 items-center">
					<div class="flex items-center gap-2">
						<input type="checkbox" name="check" id="fb" class="form-check-input appearance-none h-6 w-4 border border-green-600 rounded-lg bg-red-600 checked:bg-green-700 checked:border-2 checked:border-white focus:outline-none align-top">
						<img class="w-10 h-10 rounded-full" src="../public/images/user.png">
						<div class="text-md">
							<div class="font-bold">{{ symbol.symbol }}</div>
							<div class="">token name</div>
						</div>
					</div>
					<div class="flex items-center gap-2">
						<div class="text-md text-right">
							<div class="font-bold">{{ symbol.price * 1 }}</div>
							<div class="">volume</div>
						</div>
						<TrashIcon @click="removeSymbol(symbol)" class="flex h-8 w-6 text-red-700" />
					</div>
				</div>
			</li>
		</ul>
		<ul id="ulToFind" class="">
			<li v-for="symbol in symbols" :key="symbol.symbol"
				:class="{ impClass: symbol.important }"
				@click="symbol.found=!symbol.found"
				v-show="!symbol.found" class="mt-1">
				<div class="flex justify-between pl-2 p-1 rounded-xl border hover:bg-gray-600 border-green-600 items-center">
					<div class="flex items-center gap-2">
						<input type="checkbox" name="check" id="fb" class="form-check-input appearance-none h-6 w-4 border border-green-600 rounded-lg bg-gray-600 checked:bg-green-700 checked:border-2 checked:border-white focus:outline-none align-top">
						<img class="w-10 h-10 rounded-full" src="../public/images/user.png">
						<div class="text-md">
							<div class="font-bold">{{ symbol.symbol }}</div>
							<div class="">token name</div>
						</div>
					</div>
					<div class="flex items-center gap-2">
						<div class="text-md text-right">
							<div class="font-bold">{{ symbol.price * 1 }}</div>
							<div class="">volume</div>
						</div>
						<TrashIcon @click="removeSymbol(symbol)" class="flex h-8 w-6 text-red-700" />
					</div>
				</div>
			</li>
		</ul>		
	</div>
</template>

<style scoped></style>