<script setup>
import { ref, watch } from 'vue';
const open = ref(false);
const Deposit = ref('');
Deposit.value = localStorage.getItem('deposit');
watch(Deposit, (newValue) => {
	if (newValue)
		localStorage.setItem('deposit', newValue)
});
const Grids = ref('');
Grids.value = localStorage.getItem('grids');
watch(Grids, (newValue) => {
	if (newValue)
		localStorage.setItem('grids', newValue)
});
const Grid_freq = ref('');
Grid_freq.value = localStorage.getItem('grid_freq');
watch(Grid_freq, (newValue) => {
	if (newValue)
		localStorage.setItem('grid_freq', newValue)
});
const Level_first = ref('');
Level_first.value = localStorage.getItem('level_first');
watch(Level_first, (newValue) => {
	if (newValue)
		localStorage.setItem('level_first', newValue)
});
const Order_min = ref('');
Order_min.value = localStorage.getItem('order_min');
watch(Order_min, (newValue) => {
	if (newValue)
		localStorage.setItem('order_min', newValue)
});
const Order_coef = ref('');
Order_coef.value = localStorage.getItem('order_coef');
watch(Order_coef, (newValue) => {
	if (newValue)
		localStorage.setItem('order_coef', newValue)
});
</script>

<template>
	<button @click="open = true"
		class="bg-gray-700 text-green-500 text-xs only:p-1 rounded-lg border-2 border-green-600">Options</button>
	<Teleport to="body">
		<div v-show="open" class="container fixed top-20 left-10 bg-gray-800 text-gray-300 z-10 rounded-lg p-2 w-2/3">
			<div class="text-right">
				<label>Deposit:
					<input type="number" id="deposit" v-model.number="Deposit" step="100" required class="w-1/3">
				</label><br>
				<label>Grids:
					<input type="number" v-model.number="Grids" step="1" required class="w-1/3">
				</label><br>
				<label>Grid_freq:
					<input type="number" v-model.number="Grid_freq" step="0.5" required class="w-1/3">
				</label><br>
				<label>Level_first:
					<input type="number" v-model.number="Level_first" step="0.1" required class="w-1/3">
				</label><br>
				<label>Order_min:
					<input type="number" v-model.number="Order_min" step="0.05" required class="w-1/3">
				</label><br>
				<label>Order_coef:
					<input type="number" v-model.number="Order_coef" step="0.05" required class="w-1/3">
				</label><br>
			</div>
			<div>
				<button @click="open = false" class="bg-gray-700">Close</button>
			</div>
		</div>
	</Teleport>
</template>

<style scoped></style>