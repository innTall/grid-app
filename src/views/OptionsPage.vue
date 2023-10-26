<script setup>
import KlineChart from '../components/KlineChart.vue';
import TableTrade from '../components/TableTrade.vue';
</script>

<template>
	<div class="h-max">
		<KlineChart class="h-max" />
		<TableTrade class="bg-gray-900 left-0 bottom-14 fixed" />
	</div>
</template>

<style scoped></style>