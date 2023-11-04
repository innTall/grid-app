<script setup>
import pairs from '../data/tickers.json';
import { ref, reactive } from 'vue';
const stLocal = window.localStorage;
const asset = stLocal.getItem('selected');
const symbols = ref(null);
const data = pairs;
const result = data.filter((item) => item.symbol.endsWith(asset));
function sortArray(x, y) {
	return x.symbol.localeCompare(y.symbol);
}
let list = result.sort(sortArray);
symbols.value = reactive(list);
</script>

<template>
	<div>
		<a href="#" class="mt-1 text-right">
			<article v-for="symbol in symbols" :key="symbol" :="asset"
				class="h-12 w-30 flex justify-end hover:bg-gray-600">
				<div class="flex p-2 gap-2 border-b items-center border-green-600">
					<div class="text-xs/[6px] text-white">
						<p class="font-bold mb-2">{{ symbol.symbol }}</p>
						<p class="font-thin">{{ symbol.price * 1 }}</p>
					</div>
					<input type="checkbox" name="check">
				</div>
			</article>
		</a>
	</div>
</template>

<style scoped></style>