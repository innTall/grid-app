<script setup>
import { TrashIcon, XCircleIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import Binance from '../composables/useBinance';

const { pairs } = Binance
</script>

<template>
	<div class="">
		<ul id="ulFound" class="">
			<li v-for="symbol in pairs" :key="symbol.symbol" :class="{ impClass: symbol.important }"
				@click.self="symbol.found = !symbol.found" v-show="symbol.found" class="mt-1">
				<div class="flex justify-between pl-2 p-1 rounded-xl border-2 hover:bg-gray-800 border-red-800 items-center">
					<div class="flex items-center gap-2">
						<input type="checkbox" name="check" id="fb"
							class="form-check-input appearance-none h-6 w-4 border border-green-600 rounded-lg bg-red-600 checked:bg-green-700 checked:border-2 checked:border-white focus:outline-none align-top">
						<img class="w-10 h-10 rounded-full" src="../public/images/user.png">
						<div class="text-md">
							<div class="font-bold">{{ symbol.symbol }}</div>
							<div class="">token name</div>
						</div>
					</div>
					<div class="flex items-center gap-2">
						<div class="text-md text-right">
							<div class="font-bold">{{ symbol.price * 1 }}</div>
							<div class="">volume</div>
						</div>
						<TrashIcon @click="" class="flex h-8 w-6 text-red-700" />
					</div>
				</div>
			</li>
		</ul>
		<ul id="ulToFind" class="">
			<li v-for="symbol in pairs" :key="symbol.symbol" :class="{ impClass: symbol.important }"
				@click="symbol.found = !symbol.found" v-show="!symbol.found" class="mt-1">
				<div class="flex justify-between pl-2 p-1 rounded-xl border hover:bg-gray-600 border-green-600 items-center">
					<div class="flex items-center gap-2">
						<input type="checkbox" name="check" id="fb"
							class="form-check-input appearance-none h-6 w-4 border border-green-600 rounded-lg bg-gray-600 checked:bg-green-700 checked:border-2 checked:border-white focus:outline-none align-top">
						<img class="w-10 h-10 rounded-full" src="../public/images/user.png">
						<div class="text-md">
							<div class="font-bold">{{ symbol.symbol }}</div>
							<div class="">token name</div>
						</div>
					</div>
					<div class="flex items-center gap-2">
						<div class="text-md text-right">
							<div class="font-bold">{{ symbol.price * 1 }}</div>
							<div class="">volume</div>
						</div>
						<TrashIcon @click="" class="flex h-8 w-6 text-red-700" />
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<style scoped></style>