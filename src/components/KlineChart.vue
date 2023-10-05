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
	// MAIN -STOCK- PANEL
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
			name: "BNBBUSD, 1D",
			xAxis: dateAxis,
			yAxis: valueAxis,
			openValueYField: "open",
			highValueYField: "high",
			lowValueYField: "low",
			valueYField: "close",
			valueXField: "date",
			legendLabelText: "{name} - {highValueY}"
		})
	);
	// Set main value series
	stockChart.set("stockSeries", valueSeries);
	// ======================
	// CREATE -VOLUME- SERIES
	// ======================
	// Create *volume* axis
	const volumeAxisRenderer = am5xy.AxisRendererY.new(root, {
		inside: true
	});
	volumeAxisRenderer.labels.template.set("forceHidden", true);
	volumeAxisRenderer.grid.template.set("forceHidden", true);
	const volumeValueAxis = mainPanel.yAxes.push(
		am5xy.ValueAxis.new(root, {
			numberFormat: "#.#a",
			height: am5.percent(30),
			y: am5.percent(100),
			centerY: am5.percent(100),
			renderer: volumeAxisRenderer
		})
	);
	// Create *volume* series
	const volumeSeries = mainPanel.series.push(
		am5xy.ColumnSeries.new(root, {
			name: "Volume",
			clustered: false,
			valueXField: "date",
			valueYField: "volume",
			xAxis: dateAxis,
			yAxis: volumeValueAxis
		})
	);
	volumeSeries.columns.template.setAll({
		strokeOpacity: 0,
		fillOpacity: 0.6,
		opacity: 0.5
	});
	// color columns by stock rules
	volumeSeries.columns.template.adapters.add("fill", (fill, target) => {
		const dataItem = target.dataItem;
		if (dataItem) {
			return stockChart.getVolumeColor(dataItem);
		}
		return fill;
	})
	// Set main volume series
	stockChart.set("volumeSeries", volumeSeries);
	// ==================
	// DEFINE SOURCE DATA
	// ==================
	let data;
	am5.net.load('src/data/klines1d.json').then((result) => {
		data = am5.JSONParser.parse(result.response);
		valueSeries.data.setAll(data);
		volumeSeries.data.setAll(data);
		valueLegend.data.setAll([valueSeries]);
	}).catch((result) => {
		console.log("Error loading " + result.xhr.responseURL);
	});
	// ======
	// LEGEND
	// ======
	const valueLegend = mainPanel.children.push(
		am5.Legend.new(root, {
			centerY: am5.percent(0),
			y: am5.percent(0),
			layout: root.verticalLayout
		})
	);
	valueLegend.markers.template.setAll({
		width: 8,
		height: 8
	});
	valueLegend.labels.template.setAll({
		fontSize: 10,
		fill: am5.color(0xffff00)
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
		am5.Tooltip.new(root, {
		})
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