<script setup>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5stock from "@amcharts/amcharts5/stock";
import am5dark from '@amcharts/amcharts5/themes/Dark';
import am5animated from '@amcharts/amcharts5/themes/Animated';
import { shallowRef, onMounted } from 'vue';

let root1;
let root2;
const chartdiv1 = shallowRef(null);
const chartdiv2 = shallowRef(null);
onMounted(() => {
	// ============
	// ROOT ELEMENT
	// ============
	root1 = am5.Root.new(chartdiv1.value);
	root2 = am5.Root.new(chartdiv2.value);
	 // =============
	// my THEME RULE
	// =============
	const myTheme1 = am5.Theme.new(root1);
	myTheme1.rule("AxisLabel").setAll({
		fill: am5.color(0xffffff),
		fontSize: 12
	});
	myTheme1.rule("AxisRenderer").setAll({
		stroke: am5.color(0x008000),
		strokeOpacity: 1,
		//strokeDasharray: [2, 2],
		strokeWidth: 1
	});
	myTheme1.rule("Grid").setAll({
		strokeOpacity: 1,
		stroke: am5.color(0x696969),
		strokeDasharray: [5, 1],
		strokeWidth: 0.2
	});
	myTheme1.rule("Label").setAll({
		fill: am5.color(0xffffff),
		fontSize: 12
	});
	root1.setThemes([
		myTheme1,
		am5dark.new(root1),
		am5animated.new(root1)
	]);
	const myTheme2 = am5.Theme.new(root2);
	myTheme2.rule("AxisLabel").setAll({
		fill: am5.color(0xffffff),
		fontSize: 12
	});
	myTheme2.rule("AxisRenderer").setAll({
		stroke: am5.color(0x008000),
		strokeOpacity: 1,
		//strokeDasharray: [2, 2],
		strokeWidth: 1
	});
	myTheme2.rule("Grid").setAll({
		strokeOpacity: 1,
		stroke: am5.color(0x696969),
		strokeDasharray: [5, 1],
		strokeWidth: 0.2
	});
	myTheme2.rule("Label").setAll({
		fill: am5.color(0xffffff),
		fontSize: 12
	});
	root2.setThemes([
		myTheme2,
		am5dark.new(root2),
		am5animated.new(root2)
	]);
	// ==========
	// STOCKCHART
	// ==========
	let stockChart1 = root1.container.children.push(
		am5stock.StockChart.new(root1, {})
	);
	let stockChart2 = root2.container.children.push(
		am5stock.StockChart.new(root2, {})
	);
	// ================
	// MAIN -STOCK- PANEL
	// ================
	let mainPanel1 = stockChart1.panels.push(
		am5stock.StockPanel.new(root1, {
			wheelY: "zoomX",
			panX: true
		})
	);
	let mainPanel2 = stockChart2.panels.push(
		am5stock.StockPanel.new(root2, {
			wheelY: "zoomX",
			panX: true
		})
	);
	// ==============================
	// X-AXIS (date) & Y-AXIS (value)
	// ==============================
	const dateAxis1 = mainPanel1.xAxes.push(
		am5xy.DateAxis.new(root1, {
			baseInterval: { timeUnit: "day", count: 1 },
			renderer: am5xy.AxisRendererX.new(root1, {
				strokeOpacity: 1,
				strokeWidth: 1,
				stroke: am5.color(0x008000),
				minGridDistance: 30,
				maxDeviation: 0.1 // top-left legend
			})
			//tooltip: am5.Tooltip.new(root1, {})
		})
	);
	const dateAxis2 = mainPanel2.xAxes.push(
		am5xy.DateAxis.new(root2, {
			baseInterval: { timeUnit: "hour", count: 4 },
			renderer: am5xy.AxisRendererX.new(root2, {
				strokeOpacity: 1,
				strokeWidth: 1,
				stroke: am5.color(0x008000),
				minGridDistance: 40,
				maxDeviation: 0.1 // top-left legend
			})
			//tooltip: am5.Tooltip.new(root2, {})
		})
	);
	const valueAxis1 = mainPanel1.yAxes.push(
		am5xy.ValueAxis.new(root1, {
			renderer: am5xy.AxisRendererY.new(root1, {
				opposite: true,
				strokeOpacity: 1,
				strokeWidth: 1,
				stroke: am5.color(0x008000)
			}),
			//tooltip: am5.Tooltip.new(root1, {}),
			numberFormat: "#,###.0"
		})
	);
	const valueAxis2 = mainPanel2.yAxes.push(
		am5xy.ValueAxis.new(root2, {
			renderer: am5xy.AxisRendererY.new(root2, {
				opposite: true,
				strokeOpacity: 1,
				strokeWidth: 1,
				stroke: am5.color(0x008000)
			}),
			//tooltip: am5.Tooltip.new(root2, {}),
			numberFormat: "#,###.0"
		})
	);
	// =====================
	// CREATE -VALUE- SERIES
	// =====================
	let valueSeries1 = mainPanel1.series.push(
		am5xy.CandlestickSeries.new(root1, {
			name: "BNBBUSD, 1D",
			xAxis: dateAxis1,
			yAxis: valueAxis1,
			openValueYField: "open",
			highValueYField: "high",
			lowValueYField: "low",
			valueYField: "close",
			valueXField: "date",
			//clustered: false,
			legendLabelText: "{name} - {highValueY}"
		})
	);
	// Set main value series
	stockChart1.set("stockSeries", valueSeries1);
	let valueSeries2 = mainPanel2.series.push(
		am5xy.CandlestickSeries.new(root2, {
			name: "BNBBUSD, 4h",
			xAxis: dateAxis2,
			yAxis: valueAxis2,
			openValueYField: "open",
			highValueYField: "high",
			lowValueYField: "low",
			valueYField: "close",
			valueXField: "date",
			//clustered: false,
			legendLabelText: "{name} - {highValueY}"
		})
	);
	// Set main value series
	stockChart2.set("stockSeries", valueSeries2);
	// ======================
	// CREATE -VOLUME- SERIES
	// ======================
	// Create *volume* axis
	const volumeAxisRenderer1 = am5xy.AxisRendererY.new(root1, {
		inside: true
	});
	volumeAxisRenderer1.labels.template.set("forceHidden", true);
	volumeAxisRenderer1.grid.template.set("forceHidden", true);
	const volumeValueAxis1 = mainPanel1.yAxes.push(
		am5xy.ValueAxis.new(root1, {
			numberFormat: "#.#a",
			height: am5.percent(30),
			y: am5.percent(100),
			centerY: am5.percent(100),
			renderer: volumeAxisRenderer1
		})
	);
	// Create *volume* series
	const volumeSeries1 = mainPanel1.series.push(
		am5xy.ColumnSeries.new(root1, {
			name: "Volume",
			clustered: false,
			valueXField: "date",
			valueYField: "volume",
			xAxis: dateAxis1,
			yAxis: volumeValueAxis1
		})
	);
	volumeSeries1.columns.template.setAll({
		strokeOpacity: 0,
		fillOpacity: 0.5,
		fill: am5.color(0x898989)
	});
	// *** COLOR COLUMNS by stock rules ***
	//volumeSeries1.columns.template.adapters.add("fill", (fill, target) => {
	//	const dataItem = target.dataItem;
	//	if (dataItem) {
	//		return stockChart1.getVolumeColor(dataItem);
	//	}
	//	return fill;
	//})
	const volumeAxisRenderer2 = am5xy.AxisRendererY.new(root2, {
		inside: true
	});
	volumeAxisRenderer2.labels.template.set("forceHidden", true);
	volumeAxisRenderer2.grid.template.set("forceHidden", true);
	const volumeValueAxis2 = mainPanel2.yAxes.push(
		am5xy.ValueAxis.new(root2, {
			numberFormat: "#.#a",
			height: am5.percent(30),
			y: am5.percent(100),
			centerY: am5.percent(100),
			renderer: volumeAxisRenderer2
		})
	);
	// Create *volume* series
	const volumeSeries2 = mainPanel2.series.push(
		am5xy.ColumnSeries.new(root2, {
			name: "Volume",
			clustered: false,
			valueXField: "date",
			valueYField: "volume",
			xAxis: dateAxis2,
			yAxis: volumeValueAxis2
		})
	);
	volumeSeries2.columns.template.setAll({
		strokeOpacity: 0,
		fillOpacity: 0.5,
		fill: am5.color(0x898989)
	});
	// *** COLOR COLUMNS by stock rules ***
	//volumeSeries2.columns.template.adapters.add("fill", (fill, target) => {
	//	const dataItem = target.dataItem;
	//	if (dataItem) {
	//		return stockChart2.getVolumeColor(dataItem);
	//	}
	//	return fill;
	//})
	// Set main volume series
	stockChart1.set("volumeSeries", volumeSeries1);
	stockChart2.set("volumeSeries", volumeSeries2);
	// ==================
	// DEFINE SOURCE DATA
	// ==================
	let data1;
	am5.net.load('src/data/klines1d.json').then((result) => {
		data1 = am5.JSONParser.parse(result.response);
		dateAxis1.data.setAll(data1);
		valueAxis1.data.setAll(data1); // ?
		valueSeries1.data.setAll(data1);
		volumeSeries1.data.setAll(data1);
		valueLegend1.data.setAll([valueSeries1]);
	}).catch((result) => {
		console.log("Error loading " + result.xhr.responseURL);
	});
	let data2;
	am5.net.load('src/data/klines4h.json').then((result) => {
		data2 = am5.JSONParser.parse(result.response);
		dateAxis2.data.setAll(data2);
		valueAxis2.data.setAll(data2); // ?
		valueSeries2.data.setAll(data2);
		volumeSeries2.data.setAll(data2);
		valueLegend2.data.setAll([valueSeries2]);
	}).catch((result) => {
		console.log("Error loading " + result.xhr.responseURL);
	});
	// ==========
	// ADD LEGEND
	// ==========
	const valueLegend1 = mainPanel1.children.push(
		am5.Legend.new(root1, {
			centerY: am5.percent(0),
			y: am5.percent(0),
			layout: root1.verticalLayout
		})
	);
	valueLegend1.markers.template.setAll({
		width: 8,
		height: 8
	});
	const valueLegend2 = mainPanel2.children.push(
		am5.Legend.new(root2, {
			centerY: am5.percent(0),
			y: am5.percent(0),
			layout: root2.verticalLayout
		})
	);
	valueLegend2.markers.template.setAll({
		width: 8,
		height: 8
	});
	// ============
	// ADD TOOLTIPS
	// ============
	const tooltipX1 = am5.Tooltip.new(root1, {});
	const tooltipY1 = am5.Tooltip.new(root1, {});
	tooltipX1.get("background").setAll({
		fillOpacity: 1,
		fill: am5.color(0x0000FF),
		strokeOpacity: 0
	});
	tooltipY1.get("background").setAll({
		opacity: 1,
		fill: am5.color(0x0000FF),
		strokeOpacity: 0
	});
	tooltipX1.label.setAll({
		fontSize: 12
		//fill: am5.color(0x1E90FF),
	});
	tooltipY1.label.setAll({
		fontSize: 12
		//fill: am5.color(0xffff00),
	});
	const tooltipX2 = am5.Tooltip.new(root2, {});
	const tooltipY2 = am5.Tooltip.new(root2, {});
	tooltipX2.get("background").setAll({
		fillOpacity: 1,
		fill: am5.color(0x0000FF),
		strokeOpacity: 0
	});
	tooltipY2.get("background").setAll({
		opacity: 1,
		fill: am5.color(0x0000FF),
		strokeOpacity: 0
	});
	tooltipX2.label.setAll({
		fontSize: 12
		//fill: am5.color(0x1E90FF),
	});
	tooltipY2.label.setAll({
		fontSize: 12
		//fill: am5.color(0xffff00),
	});
	// ==========
	// ADD CURSOR
	// ==========
	mainPanel1.set("cursor",
		am5xy.XYCursor.new(root1, {
			xAxis: dateAxis1,
			yAxis: valueAxis1,
			//tooltip: am5.Tooltip.new(root1, {})
		})
	);
	let cursor1 = mainPanel1.get("cursor");
	cursor1.lineX.setAll({
		strokeDasharray: [1, 1],
		stroke: am5.color(0xFFFFFF),
		strokeWidth: 1
	});
	cursor1.lineY.setAll({
		strokeOpacity: 1,
		strokeDasharray: [1, 1],
		stroke: am5.color(0xffffff),
		strokeWidth: 0.5
	});
	mainPanel2.set("cursor",
		am5xy.XYCursor.new(root2, {
			xAxis: dateAxis2,
			yAxis: valueAxis2,
			//tooltip: am5.Tooltip.new(root2, {})
		})
	);
	let cursor2 = mainPanel2.get("cursor");
	cursor2.lineX.setAll({
		strokeDasharray: [1, 1],
		stroke: am5.color(0xFFFFFF),
		strokeWidth: 1
	});
	cursor2.lineY.setAll({
		strokeOpacity: 1,
		strokeDasharray: [1, 1],
		stroke: am5.color(0xffffff),
		strokeWidth: 0.5
	});
	dateAxis1.set("tooltip", tooltipX1);
	valueAxis1.set("tooltip", tooltipY1);
	mainPanel1.panelControls.set("forceHidden", true);
	dateAxis2.set("tooltip", tooltipX2);
	valueAxis2.set("tooltip", tooltipY2);
	mainPanel2.panelControls.set("forceHidden", true);
	// ===============================
	// PERIOD SELECTOR TO START SCREEN
	// ===============================
	const periodSelector1 = am5stock.PeriodSelector.new(root1, {
		stockChart: stockChart1
	})
	valueSeries1.events.on("datavalidated", () => {
		periodSelector1.selectPeriod({ timeUnit: "month", count: 3 })
	})
	const periodSelector2 = am5stock.PeriodSelector.new(root2, {
		stockChart: stockChart2
	})
	valueSeries2.events.on("datavalidated", () => {
		periodSelector2.selectPeriod({ timeUnit: "day", count: 15 })
	})
});
</script>

<!--template>
	<div id="chartdiv1" class="h-96"></div>
</template-->

<template>
	<div class="h-full bg-gray-900">
		
			<!--div id="chartcontrols1" class="bg-gray-800"></div-->
			<div ref="chartdiv1" class="h-1/2"></div>
		
			<!--div id="chartcontrols2" class="bg-gray-800"></div-->
			<div ref="chartdiv2" class="h-1/2"></div>
		
	</div>
</template>

<style scoped></style>