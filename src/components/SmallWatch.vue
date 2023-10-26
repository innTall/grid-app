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
	<div class="">
		<a href="" class="mt-1 text-right">
			<article v-for="symbol in symbols" :key="symbol.symbol"
				class="h-12 w-30 flex justify-end hover:bg-gray-600">
				<div class="flex p-2 gap-2 border-b items-center border-green-600">
					<div class="text-xs/[6px] text-white">
						<p class="font-bold mb-2">{{ symbol.symbol }}</p>
						<p class="font-thin">{{ symbol.price * 1 }}</p>
					</div>
					<input type="checkbox" name="check" class="">
				</div>
			</article>
		</a>
	</div>
</template>

<style scoped></style>