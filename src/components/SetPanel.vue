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
const errorMessage = ref('');
tp.value = localStorage.getItem('tp');
watch(tp, (newValue) => {
	if (newValue)
		localStorage.setItem('tp', newValue)
});
function getProfit() {
	if (MaxPrice.value > MinPrice.value) {
		tp.value = (((Number(MaxPrice.value / MinPrice.value - 1) / 2 + (1 - MinPrice.value / MaxPrice.value) / 2) / 2) * 100).toFixed(1);
		errorMessage.value = '';
	} else {
		errorMessage.value = 'Price !'
	};
}
getProfit();
</script>

<template>
	
	<div class="w-full">
		<p class="w-20 border border-red-700 text-red-700 font-bold text-center bg-red-200 rounded-md">{{ errorMessage }}</p>
		<div class="flex pl-2 pr-2 text-center flex-row text-sm justify-around">
				<div class="">
					<label class="">Min:<br>
						<input type="number" name="min" v-model.number="MinPrice" step="0.001" required
							class="w-20 bg-green-800 text-center border rounded-md">
					</label>
				</div>
				<div class="">
					<label class="">Max:<br>
						<input type="number" name="max" v-model.number="MaxPrice" step="0.001" required
							class="w-20 bg-green-800 text-center border rounded-md ">
					</label>
				</div>
				<div class="">
					<p class="">TP,%:<br>
						<div :="getProfit()" type="input" class="font-bold">{{ tp }}</div>
					</p>
				</div>
		</div>
	</div>
</template>