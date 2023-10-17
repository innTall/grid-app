<script setup>
import ModalSettings from './ModalSettings.vue';
import SetPanel from './SetPanel.vue';
import ModalConfirm from './ModalConfirm.vue';
import { ref, watch, computed } from 'vue';
const stLocal = window.localStorage;
const $Deposit = stLocal.getItem('deposit');
const $Grids = stLocal.getItem('grids');
const $Grid_freq = stLocal.getItem('grid_freq');
const $Level_first = stLocal.getItem('level_first');
const $Order_min = stLocal.getItem('order_min');
const $Order_coef = stLocal.getItem('order_coef');

const MAX_price = stLocal.getItem('maxPrice');
const MIN_price = stLocal.getItem('minPrice');
const TP = stLocal.getItem('tp');
const Num = Math.ceil(TP / $Grid_freq);
console.log(TP, Num);
const buyLevelN = Number(MIN_price - MIN_price * $Grid_freq / 100).toFixed(4);
const _grid_size = (MAX_price - MIN_price).toFixed(4);
const _set_level = Number(_grid_size - _grid_size * $Level_first).toFixed(4);
const buyLevel1 = MAX_price - _set_level;
let _q_buyGrid = +((buyLevelN / buyLevel1) ** (1 / (Num - 1))).toFixed(4);
console.log(MAX_price, buyLevelN, _grid_size, _set_level);
console.log(buyLevel1, _q_buyGrid);
const nr = Array.from(Array(Num).keys()).join(' ');
const N = Array.from({ length: Num },
	(_, index) => index + 1).join(' ');
console.log(nr);
console.log(N);

const geomProgr = (end, start = buyLevel1, step = _q_buyGrid) =>
	Array.from({
		length: Math.floor(Math.log(end / start) / Math.log(step)) + 2,
	}).map((_, i) => start * step ** i);
const buyArr = geomProgr(buyLevelN);
//console.log(buyArr); // [ 1.5765, 1.5370, 1.4986, 1.4611, 1.4246, 1.3890, 1.3543, 1.3204 ]

// ___________array of diff reverse____________
let subtr = [];
let j;  // *** fixed bugs of number orders ***
if (buyArr.length !== Num) {
	j = 1
} else {
	j = 0
}
for (let i = j; i < buyArr.length - 1; i++)
	subtr[i] = (buyArr[i] - buyArr[i + 1]).toFixed(4);
let subtrRev = subtr.reverse();
subtrRev.unshift(buyArr[0]);
//console.log((" * Subtr: " + subtr));
console.log((" * SubtrRev: " + subtrRev));

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ***** BUY-limit-LEVELS ***** RESULT[]
const x = subtrRev;
const y = buyArr[0] * 2;
let Buy;
let Lev;
function currentSubtr(x) {
	Buy = [];
	x.reduce((subtr, current, i) => {
		return Buy[i] = subtr - current;
	}, y);
	Buy = Buy.map(function (each_element) {
		return Number(each_element.toFixed(4));
	});
	Lev = Buy.join(' ');
}
currentSubtr(x);
console.log(Buy);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ***** BUY-order-$ ***** BUYLIMIT []
const gridCost = ($Deposit / $Grids).toFixed(2);
const buyOrder1 = (gridCost / ((1 - $Order_coef ** Num) / (1 - $Order_coef))).toFixed(2);
if (buyOrder1 < 12) {
	alert('Order too small !!!');
}
else {
	//alert(`Grid: ${gridCost} & 1st order: ${buyOrder1}`)
}
console.log(gridCost, Num, buyOrder1);

const buyOrderNext = buyOrder1 * $Order_coef ** (Num);
const buyOrdersext = (end, start = buyOrder1, step = $Order_coef) =>
	Array.from({
		length: Math.floor(Math.log(end / start) / Math.log(step)),
	}).map((_, Num) => start * step ** Num);
let Buy$ext = buyOrdersext(buyOrderNext);
Buy$ext = Buy$ext.map(function (each_element) {
	return Number(each_element.toFixed(2));
})
const $buyext = Buy$ext.join(' '); // $buyext ?ok?
console.log(buyOrderNext, Buy$ext);
let k;  // *** fixed bugs of number orders ***
if (Buy$ext.length !== Num) {
	k = 1
} else {
	k = 0
}
console.log($buyext, Buy$ext);
const buyOrderN = buyOrder1 * $Order_coef ** (Num);
const buyOrders = (end, start = buyOrder1, step = $Order_coef) =>
	Array.from({
		length: Math.floor(Math.log(end / start) / Math.log(step)) + k,
	}).map((_, Num) => start * step ** Num);
let Buy$ = buyOrders(buyOrderN);
Buy$ = Buy$.map(function (each_element) {
	return Number(each_element.toFixed(2));
})
const $buy = Buy$.join(' ');
console.log(buyOrderN, Buy$);
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ***** BUY-order-$ SUM $ ***** Buy$SUM []
const s = Buy$;
let $$$;
let sum$;
function currentSum(s) {
	$$$ = [];
	s.reduce((sum, current, i) => {
		return $$$[i] = sum + current;
	}, 0);
	$$$ = $$$.map(function (each_element) {
		return Number(each_element.toFixed(2));
	})
	sum$ = $$$.join(' ');
}
currentSum(s);
console.log($$$);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ***** amountOrder ***** AMOUNTORDER []
const arrOrder = Buy$;
const arrLevel = Buy;
const Amnt = arrOrder.map(function (number, index) {
	return +(number / Number(arrLevel[index])).toFixed(2);
});
const Amt = Amnt.join(' ');
console.log(Amnt);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ***** Amnt SUM ***** Amnt SUM []
const a = Amnt;
let Sum;
let Tot;
function amountSum(a) {
	Sum = [];
	a.reduce((sum, current, i) => {
		return Sum[i] = sum + current;
	}, 0);
	Sum = Sum.map(function (each_element) {
		return Number(each_element.toFixed(2));
	})
	Tot = Sum.join(' ');
}
amountSum(a);
console.log(Sum);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ***** Zero ***** Zero []
const arrCash = $$$;
const arrAmount = Sum;
const Zero = arrCash.map(function (number, index) {
	return +(number / Number(arrAmount[index])).toFixed(3);
});
const Lev0 = Zero.join(' ');
console.log(Zero);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ***** levelFix ***** LEVELFIX []
let levelFix = [];
for (let i = 0; i < Num; i++) {
	levelFix.push(Zero[i] * (TP / 100));
}
let Fix = Zero.map(function (number, index) {
	return +(number + levelFix[index]).toFixed(3);
});
const Sell = Fix.join(' ');
console.log(Fix);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ***** profit$ ***** PROFIT $ []
const sold = Fix.map(function (number, index) {
	return number * Number(Sum[index]);
});
const profit$ = sold.map(function (number, index) {
	return +(number - Number($$$[index])).toFixed(2);
});
console.log(profit$);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ***** fiboBuy ***** FIBO BUY []
let fibo = [];
let fiboBuy = [];
for (let i = 0; i < Num; i++) {
	fibo.push(Buy[i] - MIN_price);
}
for (let i = 0; i < Num; i++) {
	fiboBuy.push(fibo[i] / _grid_size);
	fiboBuy = fiboBuy.map(function (each_element) {
		return Number(each_element.toFixed(3));
	});
}
console.log(fiboBuy);

const rows = ref([
	{ N, Lev, Amt, Tot, Lev0, Sell, $buy, sum$, }
]);

const columns = computed(() => {
	if (rows.value.length == 0) {
		return [];
	}
	return Object.keys(rows.value[0])
});
</script>

<template>
	<div>
		<div class="flex justify-between items-center gap-2 pl-2 pr-2">
			<div class="w-1/5 items-center">
				<ModalSettings />
			</div>
			<div class="w-3/5">
				<SetPanel />
			</div>
			<div class="w-1/5 items-center">
				<ModalConfirm :deposit=$Deposit :orders=Num :first_level="buyLevel1" />
			</div>
		</div>
		<div>
			<table id="secondTable">
				<thead class="bg-gray-700 text-xs text-gray-300">
					<tr>
						<th v-for="col in columns" :key="col.id">{{ col }}</th>
					</tr>
				</thead>
				<tbody class="text-gray-300 text-xs">
					<tr v-for="row in rows" :key="row.id">
						<td v-for="col in columns" :key="col.id" class="">{{ row[col] }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<style scoped></style>