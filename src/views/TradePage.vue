<script setup>
import KlineChart from '../components/KlineChart.vue';
import TableTrade from '../components/TableTrade.vue';
</script>

<template>
	<div class="w-full h-full bg-gray-900">
		<div class="w-full">
			<KlineChart class="h-60" />
		</div>
		<div class="w-full">
			<TableTrade class="bg-gray-900 left-0 bottom-10 fixed" />
		</div>
	</div>
</template>

<style scoped></style>