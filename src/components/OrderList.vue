<script setup>
import OrderItem from './layouts/OrderItem.vue';
const props = defineProps({
	orders: {
		type: Array,
		required: true
	}
});
const emit = defineEmits(['remove']);
</script>

<template>
	<div v-if="orders.length > 0" class="">
		<h4 class="">Orders list</h4>
		<OrderItem v-for="order in orders" :order="order" :key="order.id" @remove="$emit('remove', order)" class="" />
	</div>
	<h4 v-else class="font-bold text-red-600">
		Order list is empty
	</h4>
</template>

<style scoped></style>