<template>
    <!-- 图表绑定的元素 -->
    <div id="insurancePieByAvatars" class="chart" style="height:300px;width:100%" />
</template>
<script>
// 需要引入echarts
import * as echarts from 'echarts'
export default {
    name: 'insurancePieByAvatars',
    props: {
        // 设置传入的参数，:data
        data: {
            type: Array,
        },
    },
    data() {
        return {
            id: 'insurancePieByAvatars',
            xData: [],
            yData: [],
            combinedChart: ""
        }
    },
    created() {
    },
    mounted() {
        // 将传入的数据绑定到设置的参数上
        this.xData = this.data[0]
        this.yData = this.data[1]
        this.showChart()
    },
    watch: {
        data(nval) {
            // 数据更新，图表也会更新
            this.xData = nval[0]
            this.yData = nval[1]
            this.showChart()
        }
    },
    methods: {
        // 图表的生成，具体看echart中的案例
        showChart() {  // 基于准备好的dom，初始化echarts实例
            // 基于准备好的dom，初始化echarts实例
            let chart = echarts.init(document.getElementById('insurancePieByAvatars'))
            // console.log(this.chart)
            if (this.yData == null)
                return;
            let data = this.yData.map((value, index) => {
                return {
                    name: this.xData[index],
                    value: value,
                };
            })
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '▎各行业购买保险数量',
                },
                legend: {
                    top: 'bottom'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        name: '各行业购买保险数量',
                        type: 'pie',
                        radius: [30, 100],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        data: data,
                        labelLine: {
                            show: false, //隐藏指示线
                        },
                        label: {
                            show: false, //隐藏指示线
                        },
                        emphasis: {
                            label: {
                                show: true,
                            },
                            labelLine: {
                                show: true,
                            },
                        },
                    },
                ],
            };

            chart.setOption(option)
            window.onresize = function () {//用于使chart自适应高度和宽度
                resizeWorldMapContainer();//重置容器高宽
                chart.resize();
            }

        }
    }
}
</script>
  
<style lang="scss" scoped></style>
  