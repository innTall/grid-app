<script setup>
import { QuestionMarkCircleIcon, WrenchScrewdriverIcon, CurrencyDollarIcon, ShoppingCartIcon } from "@heroicons/vue/24/outline";
</script>

<template>
	<footer class="sticky bottom-0 z-10 bg-gray-900">
		<ul class="flex justify-around p-1 border-t border-green-600">
			<li class="flex-1">
				<a href="#" class="flex flex-col text-xs capitalize items-center">
					<QuestionMarkCircleIcon class="h-6 w-6" /> about
				</a> 
			</li>
			<li class="flex-1">
				<a href="#" class="flex flex-col text-xs capitalize items-center">
					<WrenchScrewdriverIcon class="h-6 w-6" /> settings
				</a>
			</li>
			<li class="flex-1">
				<a href="#" class="flex flex-col text-xs capitaize items-center">
					<CurrencyDollarIcon class="h-6 w-6" /> info
				</a>
			</li>
			<li class="flex-1">
				<a href="/trade" class="flex flex-col text-xs capitalize items-center active:border">
					<ShoppingCartIcon class="h-6 w-6" /> trade
				</a>
			</li>
		</ul>
	</footer>
</template>

<style scoped></style>