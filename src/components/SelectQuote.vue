<script setup>
import { ref, watch } from 'vue';
const assets = ref([]);
async function getQuoteAsset() {
	try {
		const url = 'src/data/quoteAssets.json';
		const response = await fetch(url);
		const data = await response.json();
		assets.value = data;
	} catch (err) {
		console.error('error ocurred', err);
	}
}
getQuoteAsset().then((data) => {
	data;
})
const selected = ref('');
const optionSelect = (e) => {
	selected.value = e.target.value
}
selected.value = localStorage.getItem('selected');
watch(selected, (newValue) => {
	if (newValue)
		localStorage.setItem('selected', newValue)
});
</script>

<template>
	<div class="h-8 text-sm text-gray-300">
		<select @change="optionSelect" v-model="selected" class="bg-gray-800">
			<option v-for="asset in assets" :key="asset">
				{{ asset }}
			</option>
		</select>
		<!--p>Selected value: {{ selected }}</p-->
	</div>
</template>
<style scoped></style>