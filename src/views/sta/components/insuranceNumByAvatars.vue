<template>
    <div id="insuranceNumByAvatars" class="chart" style="height:300px;width:100%" />
</template>
<script>
import * as echarts from 'echarts'
export default {
    name: 'insuranceNumByAvatars',
    props: {
        data: {
            type: Array,
        },
    },
    data() {
        return {
            id: 'insuranceNumByAvatars',
            xData: [],
            yData: [],
            yData1:[],
            combinedChart: ""

        }
    },
    created() {

    },
    mounted() {
        this.init(this.data)
    },
    watch: {
        data(nval) {
            this.init(nval)
        }
    },
    methods: {
        init(nval){
            this.xData = nval[0]
            this.yData = nval[1]
            this.yData1 = nval[2]
            this.showChart()
        },
        showChart() {  // 基于准备好的dom，初始化echarts实例
            if(this.xData == null||this.yData1 == null)
                return;
            this.yData1 = this.yData1.map(item => 0 - item)

            this.combinedChart = echarts.init(document.getElementById('insuranceNumByAvatars'));

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '▎各月销售保险数量',
                    show: false
                },
                tooltip: {
                    trigger: 'axis'
                },
                // x轴是类目轴（离散数据）,必须通过data设置类目数据
                xAxis: {
                    type: 'category',
                    data: this.xData,
                    axisLabel: {
                        interval: 0,
                        rotate: 60,
                        fontSize: 10,
                        color: "rgba(40, 37, 37, 1)",
                        fontWeight: "bolder"
                    }
                },
                // y轴是数据轴（连续数据）
                yAxis: {
                    type: 'value'
                },
                legend: {  // 添加图例
                    data: ['各行业销售保险数量', '各行业出险数量'],
                },
                // 系列列表。每个系列通过 type 决定自己的图表类型
                series: [
                    {
                        // 系列中的数据内容数组
                        data: this.yData,
                        // 折线图
                        type: 'bar',
                        stack: 'Total',
                        barWidth: 30,
                        label: {
                            show: true,
                            position: 'inside',
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        areaStyle: {},
                        itemStyle: {
                            barBorderRadius: [0, 0, 0, 0],
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        name: '各行业销售保险数量',  // 设置图例名称
                    },
                    {
                        // 系列中的数据内容数组
                        data: this.yData1,  // 使用相同的数据或者替换成另一组数据
                        // 折线图
                        type: 'bar',
                        stack: 'Total',
                        barWidth: 30,
                        label: {
                            show: true,
                            position: 'inside',
                            textStyle: {
                                color: 'black'
                            }
                        },
                        areaStyle: {},
                        itemStyle: {
                            barBorderRadius: [0, 0, 0, 0],
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        name: '各行业出险数量',  // 设置图例名称
                    }
                ]
            };

            this.combinedChart.setOption(option);

            window.onresize = () => {
                // 用于使chart自适应高度和宽度
                resizeWorldMapContainer();
                this.combinedChart.resize();
            };
        }
    }
}
</script>
  
<style lang="scss" scoped></style>
  