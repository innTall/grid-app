<script setup>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5stock from "@amcharts/amcharts5/stock";
import am5dark from '@amcharts/amcharts5/themes/Dark';
import am5animated from '@amcharts/amcharts5/themes/Animated';
import { onMounted } from 'vue';

let root;
onMounted(() => {
	// ===========================
	// ROOT ELEMENT, THEMES, CHART
	// ===========================
	root = am5.Root.new("chartdiv");

	root.setThemes([
		am5dark.new(root),
		am5animated.new(root)
	]);

	let stockChart = root.container.children.push(
		am5stock.StockChart.new(root, {})
	);
	// ================
	// MAIN STOCK PANEL
	// ================
	let mainPanel = stockChart.panels.push(
		am5stock.StockPanel.new(root, {
			wheelY: "zoomX", // scale big/small
			panX: true // <- move ->
		})
	);
	// ==============================
	// X-AXIS (date) & Y-AXIS (value)
	// ==============================
	const dateAxis = mainPanel.xAxes.push(
		am5xy.DateAxis.new(root, {
			baseInterval: { timeUnit: "day", count: 1 },
			renderer: am5xy.AxisRendererX.new(root, {
				minGridDistance: 30 // |-|-|-|-|
			})
		})
	);
	const valueAxis = mainPanel.yAxes.push(
		am5xy.ValueAxis.new(root, {
			renderer: am5xy.AxisRendererY.new(root, {
				opposite: true // right-scale
			})
		})
	);
	// =====================
	// CREATE -VALUE- SERIES
	// =====================
	let valueSeries = mainPanel.series.push(
		am5xy.CandlestickSeries.new(root, {
			name: "valueSeries",
			xAxis: dateAxis,
			yAxis: valueAxis,
			openValueYField: "open",
			highValueYField: "high",
			lowValueYField: "low",
			valueYField: "close",
			valueXField: "date",
		})
	);
	// Set main value series
	mainPanel.set("CandlestickSeries", valueSeries); //??? stockChart.set("stockSeries", valueSeies)
	// ==================
	// DEFINE SOURCE DATA
	// ==================
	let data;
	am5.net.load('src/data/klines1d.json').then((result) => {
		data = am5.JSONParser.parse(result.response);
		valueSeries.data.setAll(data);
	}).catch((result) => {
		console.log("Error loading " + result.xhr.responseURL);
	});
	// ======
	// CURSOR
	// ======
	mainPanel.set("cursor",
		am5xy.XYCursor.new(root, {
			xAxis: dateAxis,
			yAxis: valueAxis
		})
	);
	dateAxis.set("tooltip",
		am5.Tooltip.new(root, {})
	);
	valueAxis.set("tooltip",
		am5.Tooltip.new(root, {})
	);
});
</script>

<template>
	<div id="chartdiv" class="h-96"></div>
</template>

<style scoped></style>