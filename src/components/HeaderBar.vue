<script setup>
import LogoItem from './layouts/LogoItem.vue';
import SelectTab from './layouts/SelectTab.vue';
import NavItems from './layouts/NavItems.vue';
</script>

<template>
	<div class="sticky top-0 p-2 z-20 flex justify-between items-center bg-gray-900 border-b border-green-600">
		<LogoItem />
		<SelectTab />
		<NavItems />
	</div>
</template>
<style scoped></style>