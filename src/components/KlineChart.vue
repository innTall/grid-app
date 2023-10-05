<script setup>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
//import * as am5stock from "@amcharts/amcharts5/stock";
import am5dark from '@amcharts/amcharts5/themes/Dark';
import am5animated from '@amcharts/amcharts5/themes/Animated';
import { onMounted } from 'vue';

let root;
onMounted(() => {
	// ---------------------------
	// ROOT ELEMENT, THEMES, CHART
	// ---------------------------
	root = am5.Root.new("chartdiv");

	root.setThemes([
		am5dark.new(root),
		am5animated.new(root)
	]);

	let chart = root.container.children.push(
		am5xy.XYChart.new(root, {})
	);
	// ---------------
	// X-AXIS & Y-AXIS
	// ---------------
	const xAxis = chart.xAxes.push(
		am5xy.DateAxis.new(root, {
			baseInterval: { timeUnit: "day", count: 1 },
			renderer: am5xy.AxisRendererX.new(root, {})
		})
	);
	const yAxis = chart.yAxes.push(
		am5xy.ValueAxis.new(root, {
			renderer: am5xy.AxisRendererY.new(root, {})
		})
	);
	// -------------
	// CREATE SERIES
	// -------------
	let series = chart.series.push(
		am5xy.CandlestickSeries.new(root, {
			name: "Series",
			xAxis: xAxis,
			yAxis: yAxis,
			openValueYField: "open",
			highValueYField: "high",
			lowValueYField: "low",
			valueYField: "close",
			valueXField: "date",
		})
	);
	// ------------------
	// DEFINE SOURCE DATA
	// ------------------
	let data;
	am5.net.load('src/data/klines1d.json').then((result) => {
		data = am5.JSONParser.parse(result.response);
		series.data.setAll(data);
	}).catch((result) => {
		console.log("Error loading " + result.xhr.responseURL);
	});	
});
</script>

<template>
	<div id="chartdiv" class="h-96"></div>
</template>

<style scoped></style>