<script setup>
import { ref, watch } from 'vue';
const MaxPrice = ref('');
MaxPrice.value = localStorage.getItem('maxPrice');
watch(MaxPrice, (newValue) => {
	if (newValue)
		localStorage.setItem('maxPrice', newValue)
});
const MinPrice = ref('');
MinPrice.value = localStorage.getItem('minPrice');
watch(MinPrice, (newValue) => {
	if (newValue)
		localStorage.setItem('minPrice', newValue)
});
const tp = ref('');
tp.value = localStorage.getItem('tp');
watch(tp, (newValue) => {
	if (newValue)
		localStorage.setItem('tp', newValue)
});
//tp.value = (((Number(MaxPrice.value / MinPrice.value - 1) / 2 + (1 - MinPrice.value / MaxPrice.value) / 2) / 2) * 100).toFixed(2);
function getProfit() {
	if (MaxPrice.value > MinPrice.value) {
		tp.value = (((Number(MaxPrice.value / MinPrice.value - 1) / 2 + (1 - MinPrice.value / MaxPrice.value) / 2) / 2) * 100).toFixed(2);
	} else {
		alert('Prices!');
	};
}
getProfit();
</script>

<template>
	<div class="w-full h-full">
			<div class="flex text-center flex-row text-green-500 text-xs">
				<div class="w-1/3">
					<label class="form-check-label">Max:<br>
						<input type="number" name="max" v-model.number="MaxPrice" step="0.001" required
							class="bg-green-800 text-center text-gray-300 border-2 rounded-md border-gray-300 w-2/3">
					</label>
				</div>
				<div class="w-1/3">
					<label>Min:<br>
						<input type="number" name="min" v-model.number="MinPrice" step="0.001" required
							class="bg-green-800 text-center text-gray-300 border-2 rounded-md border-gray-300 w-2/3">
					</label>
				</div>
				<div class="w-1/3">
					<p class="">TP,%:<br>
						<div :="getProfit()" type="input" class="font-bold">{{ tp }}</div>
					</p>
				</div>
			</div>
	</div>
</template>