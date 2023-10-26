<script setup>
import { ref } from 'vue';
const order = ref({
	symbol: '',
	price: ''
});
const emit = defineEmits(['add']);
function addOrder() {
	order.id = Date.now(),
	emit('add', order.value),
	order.value = {
		symbol: '',
		price: ''
	}		
}
</script>

<template>
	<form @submit.prevent class="p-2">
	  <div class="font-bold">Create new order</div>
	  <input v-model="order.symbol" id="symbol" type="text" placeholder="Symbol" class="bg-gray-600 border-2 border-green-600 rounded-lg p-1 w-1/3 mr-5">
	  <input v-model="order.price" id="price" type="number" placeholder="Price" class="bg-gray-600 border-2 border-green-600 rounded-lg p-1 w-1/3 mr-5">
	  <button @click="addOrder" class="bg-green-700 p-1 border-2 rounded-lg right-2 items-center">
	    Create
	  </button>
	</form>
</template>

<style scoped></style>