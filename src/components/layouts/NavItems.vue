<script setup>
import {
  QueueListIcon,
  ArrowTrendingUpIcon,
  TableCellsIcon
} from "@heroicons/vue/24/outline";
</script>

<template>
	<ul class="flex items-center gap-5">
		<li class="flex-1">
			<a href="/test" class="flex flex-col text-xs capitalize items-center">
				<QueueListIcon class="h-6 w-6" /> watchlist
			</a>
		</li>
		<li class="flex-1">
			<a href="/chart" class="flex flex-col text-xs capitalize items-center">
				<ArrowTrendingUpIcon class="h-6 w-6" /> chart
			</a>
		</li>
		<li class="flex-1">
			<a href="/options" class="flex flex-col text-xs capitalize items-center">
				<TableCellsIcon class="h-6 w-6" /> options
			</a>
		</li>
	</ul>
</template>
<style scoped></style>