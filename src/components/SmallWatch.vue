<script setup>
import pairs from '../data/watchList.json';
import { reactive, computed } from 'vue';
function sortArray(x, y) {
	return x.symbol.localeCompare(y.symbol);
}
let list = pairs.sort(sortArray);
const symbols = reactive(list);
</script>

<template>
	<div class="w-20">
		<a href="" class="container bg-gray-900 mt-1">
			<article v-for="symbol in symbols" :key="symbol.symbol"
				class="flex justify-between rounded-lg border hover:bg-gray-600 border-green-600">
				<div class="flex items-center">
					<div class="mr-1">
						<input type="checkbox" name="check"
							class="bg-gray-600 rounded-l ml-1 h-8 items-center border-2 border-green-600 text-green-400">
					</div>
					<div class="text-xs/[6px] text-white">
						<p class="font-bold mb-2">{{ symbol.symbol }}</p>
						<p class="font-thin">{{ symbol.price * 1 }}</p>
					</div>
				</div>
			</article>
		</a>
	</div>
</template>

<style scoped></style>