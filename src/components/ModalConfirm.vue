<script setup>
import { ref } from 'vue';
const open = ref(false);
defineProps(['deposit', 'orders', 'first_level', 'first_order', 'profit']);

</script>
<template>
	<button @click="open = true" class="bg-gray-700 text-green-500 text-xs p-1 rounded-lg border-2 border-green-600">Trade</button>
	<Teleport to="body">
		<div v-show="open" class="container fixed top-20 left-10 bg-gray-800 text-gray-300 z-10 rounded-lg p-2 w-1/2">
			<p class="text-center underline">Grid to Trade</p>
			<form @submit="submitForm">
				<div class="text-right">
					Deposit: {{ deposit }}<br>
					Orders: {{ orders }}<br>
					First level: {{ first_level }}
				</div>
				<p class="text-green-700 bg-yellow-300 text-center">! Grid data for trade is OK?</p>
				<div class="flex">
					<button @click="open = false" type="submit" class="bg-green-600 white">Submit</button>
					<button @click="open = false" class="bg-red-600  white">Cancel</button>
				</div>
			</form>
		</div>
	</Teleport>
</template>

<style scoped></style>