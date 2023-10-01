<script setup>
import SelectQuote from './SelectQuote.vue';
</script>

<template>
	<div class="bg-gray-800 text-gray-400 pl-2 flex gap-2 justify-between pr-2">
		<div class="flex items-center">
			<a href="/" class="">
				<img class="w-8" src="../public/logo.png">
			</a>
			<div class="text-center gap-y-0">
				<small class="font-bold">GridApp</small><br />
				<small>Trade is easy</small>
			</div>
		</div>
		<div class="h-8 text-sm text-gray-300">
			<SelectQuote />
		</div>
		<div class="items-center text-sm text-blue-700">
			<RouterLink to="/chart" class=""> Chart |</RouterLink>
			<RouterLink to="/trade" class=""> Trade |</RouterLink>
		</div>
		<div class="items-end">
			<button class="p-1 border-2 border-green-600 rounded-lg bg-gray-700 text-green-500">Trade</button>
		</div>
	</div>
</template>
<style scoped></style>