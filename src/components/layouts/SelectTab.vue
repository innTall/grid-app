<script setup>
import Binance from '../../composables/useBinance.js'

const { quoteAssets, selectedQuoteAsset } = Binance
</script>

<template>
	<div class="h-8 text-sm">
		<select v-model="selectedQuoteAsset" id="sel" class="bg-gray-900 border rounded-lg h-8 text-sm">
			<option v-for="asset in quoteAssets" :key="asset" class="">
				{{ asset }}
			</option>
		</select>
		<!--p>Selected value: {{ selected }}</p-->
	</div>
</template>
<style scoped></style>