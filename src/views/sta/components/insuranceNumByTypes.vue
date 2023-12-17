<template>
    <div id="insuranceNumByTypes" class="chart" style="height:300px;width:100%" />
</template>
<script>
import * as echarts from 'echarts'
export default {
    name: 'insuranceNumByTypes',
    props: {
        data: {
            type: Array,
        },
    },
    data() {
        return {
            id: 'insuranceNumByTypes',
            xData: [],
            yData: [],
            combinedChart: ""

        }
    },
    created() {

    },
    mounted() {
        this.xData = this.data[0]
        this.yData = this.data[1]
        this.showChart()
    },
    watch: {
        data(nval) {
            this.xData = nval[0]
            this.yData = nval[1]
            this.showChart()
        }
    },
    methods: {
        showChart() {  // 基于准备好的dom，初始化echarts实例
            // 基于准备好的dom，初始化echarts实例
            this.chart = echarts.init(document.getElementById('insuranceNumByTypes'), null, { width: 400, height: 300 })
            // console.log(this.chart)

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '▎保险种类销售数量'
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
                // 系列列表。每个系列通过 type 决定自己的图表类型
                series: [{
                    // 系列中的数据内容数组
                    data: this.yData,
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#000'
                        }
                    },
                    // 折线图
                    type: 'bar'
                }]
            }

            this.chart.setOption(option)
            window.onresize = function () {//用于使chart自适应高度和宽度

                resizeWorldMapContainer();//重置容器高宽
                this.chart.resize();
            }

        }
    }
}
</script>
  
<style lang="scss" scoped></style>
  