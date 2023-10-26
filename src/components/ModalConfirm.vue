<script setup>
import { ref } from 'vue';
const open = ref(false);
defineProps(['deposit', 'orders', 'first_level', 'first_order', 'profit']);

</script>
<template>
	<button @click="open = true" class="text-sm p-2 rounded-lg border hover:bg-gray-700">Trade</button>
	<Teleport to="body">
		<div v-show="open" class="container fixed top-20 left-10 bg-gray-800 text-white z-10 border rounded-3xl p-2 w-1/2">
			<p class="text-center">Grid to Trade</p>
			<form @submit="submitForm">
				<div class="text-right">
					Deposit: {{ deposit }}<br>
					Orders: {{ orders }}<br>
					First level: {{ first_level }}<br>
					First order: {{ first_order }}<br>
					Profit: {{ profit }}
				</div>
				<p class="text-green-700 bg-yellow-300 font-bold text-center">! Grid data is OK?</p>
				<div class="flex justify-between pt-1">
					<button @click="open = false" class="bg-red-700 p-1 border rounded-md">Cancel</button>
					<button @click="open = false" type="submit" class="bg-green-700 p-1 border rounded-md">Submit</button>
				</div>
			</form>
		</div>
	</Teleport>
</template>

<style scoped></style>