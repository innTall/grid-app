<script setup>
const props = defineProps({
	order: {
		type: Object,
		requred: true,
	}
});
const emit = defineEmits(['remove']);
</script>

<template>
	<div class="flex p-2 mb-1 border-2 border-green-600">
		<div id="order" class="">
			<div class=""><strong>Symbol</strong> {{ order.symbol }}</div>
			<div class=""><strong>Price</strong> {{ order.price }}</div>
		</div>
		<div clsass="">
			<button @click="$emit('remove', order)" class="bg-red-700 p-1 absolute right-2 border-2 rounded-lg items-center">
				Delete
			</button> 
		</div>
	</div>
</template>
<style scoped></style>