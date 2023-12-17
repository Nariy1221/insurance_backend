<style>
/* .el-header {
    background-color: #d9caaf6f;
    color: rgb(49, 135, 182);
    text-align: center;
    line-height: 60px;
  } */
.el-footer {
    background-color: #20252c;
    color: rgba(39, 27, 126, 0.132);
    text-align: center;
    line-height: 500px;
}

.el-aside {
    background-color: #fafbfc;
    color: rgb(255, 253, 253);
    text-align: center;
    line-height: 695px;
}

.el-main {
    background-color: #f7fafd;
    color: rgb(255, 253, 253);
    text-align: center;
    line-height: 120px;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>
<template>
    <div style="padding: 10px;">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-row>
                    <el-col :span="24">
                        <el-card class="box-card" style="margin-bottom: 10px;">
                            <el-row>
                                <div id="chart" class="chart" style="height:300px;width:100%" />
                            </el-row>
                        </el-card>
                    </el-col>
                    <el-col :span="24">
                        <el-card class="box-card" style="margin-bottom: 10px;">
                            <el-row>
                                <div id="chart4" class="chart" style="height:300px;width:100%" />
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="16">
                <el-card class="box-card" style="margin-bottom: 10px;">
                    <div slot="header" class="clearfix">
                                <span style="font-weight: 700;">各类保险出险占比</span>
                            </div>
                    <el-row>
                        <div id="chart3" class="chart" style="height:650px;width:100%" />
                    </el-row>
                </el-card>

            </el-col>
        </el-row>
    </div>
    <!-- <el-container>
        <el-aside width="750px" height="100%">
            <el-main height="50px">
                <div id="chart" class="chart" style="height:300px;width:100%" />
            </el-main>
            <el-main height="50px">
                <div id="map" class="chart" style="height:300px;width:100%"> </div>
            </el-main>
        </el-aside>
        <el-aside width="750px">
            <el-main height="50px">
                <div id="chart3" class="chart" style="height:300px;width:100%" />
            </el-main>
            <el-main height="50px">
                <div id="chart4" class="chart" style="height:300px;width:100%" />
            </el-main>
        </el-aside>
    </el-container> -->
</template>
<script>
//import 'echarts/map/js/china.js' 
import staApi from '@/api/injury'
import * as echarts from 'echarts'
export default {
    data() {
        return {
            searchObj: {},
            btnDisabled: false,
            xData: [],
            yData: [],
            xData1: [2],
            yData1: [2],
            pieData: [],
            num: 0,
            dataList: [],
            dataprovice: [],
            mapData: {},
            source: []

        }
    },
    created() { //页面渲染之前执行
        this.showChart(),
            //this.showChart1(), 
            this.showChart4(),
            this.showChart5()
    },
    watch: {  //监听
    },
    methods: {
        showChart() {
            staApi.avatarEveryAvatarInjuryAll()
                .then(response => {
                    console.log(response)
                    console.log(response.data.EveryAvatarInjuryAll.length)
                    this.num = response.data.EveryAvatarInjuryAll.length
                    let xData = response.data.EveryAvatarInjuryAll.map(element => element.name)
                    let yData = response.data.EveryAvatarInjuryAll.map(element => element.value)
                    let Data = response.data.EveryAvatarInjuryAll.map(element => element.EveryInsurance)
                    let xData1 = response.data.EveryAvatarInjuryAll.map(element => element.name)

                    console.log(xData1)
                    //console.log(yData)
                    this.xData = xData
                    this.yData = yData
                    //调用下面生成图表的方法，改变值
                    this.setChart()
                })
        },
        showChart5() {
            staApi.insuranceEveryInjuryInsurance()
                .then(response => {
                    console.log(response)
                    console.log(response.data.EveryInjuryInsurance.length)
                    this.num = response.data.EveryInjuryInsurance.length
                    let xData = response.data.EveryInjuryInsurance.map(element => element.name)
                    let yData = response.data.EveryInjuryInsurance.map(element => element.value)
                    console.log(xData)
                    console.log(yData)
                    this.xData = xData
                    this.yData = yData
                    //调用下面生成图表的方法，改变值
                    this.setChart5()
                })
        },
        showChart4() {
            staApi.insuranceEveryInsuranceBeInjury()
                .then(response => {
                    console.log(response)
                    console.log(response.data.EveryInsuranceBeInjury.length)
                    this.num = response.data.EveryInsuranceBeInjury.length
                    this.source = response.data.EveryInsuranceBeInjury.map(element => {
                        return {
                            insurance: element.insurance,
                            name: element.name == '销售' ? '未出险' : '已出险',
                            value: element.value
                        }
                    })
                    let xData = response.data.EveryInsuranceBeInjury.map(element => element.name == '销售' ? '未出险' : '已出险')
                    let yData = response.data.EveryInsuranceBeInjury.map(element => element.value)
                    console.log(xData)
                    console.log(yData)
                    this.xData = xData
                    this.yData = yData

                    //调用下面生成图表的方法，改变值
                    this.setChart4()
                })
        },
        setChart5() {
            // 基于准备好的dom，初始化echarts实例
            this.chart5 = echarts.init(document.getElementById('chart4'), 'light')
            // console.log(this.chart)

            // 指定图表的配置项和数据
            var option = {

                title: {
                    text: '▎各保险种类理赔数量',

                },
                grid: {
                    top: '20%',
                    left: '3%',
                    right: '6%',
                    bottom: '3%',
                    containLabel: true // 距离是包含坐标轴上的文字
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
                    // 折线图
                    type: 'bar',
                    label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: 'black'
                            }
                        },
                }]
            }

            this.chart5.setOption(option)
        },
        setChart4() {
            // 基于准备好的dom，初始化echarts实例
            this.chart4 = echarts.init(document.getElementById('chart3'))
            // console.log(this.chart)

            // 指定图表的配置项和数据
            var option = {
                title: [{
                    text: '▎天天保',
                    left: '15%',//居中显示
                    top: '20%',//底部显示
                },
                {
                    text: '▎全球保',
                    left: '45%',//居中显示
                    top: '20%',//底部显示
                },
                {
                    text: '▎及时保',
                    left: '75%',//居中显示
                    top: '20%',//底部显示
                },
                {
                    text: '▎雇主保',
                    left: '30%',//居中显示
                    top: '60%',//底部显示
                },
                ],
                legend: {
                    formatter: '未出险',
                    formatter: '已出险',
                    // 使用回调函数
                    // formatter: function (name) {
                    //     return 'Legend ' + name;
                    // },
                    top: '5%',
                    left: 'center'
                },
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: {
                    show: false
                },
                tooltip: {
                    trigger: 'item'
                },
                dataset: [
                    {
                        source: this.source
                    },
                    {
                        transform: {
                            type: 'filter',
                            config: { dimension: 'insurance', value: '天天保' }
                        }
                    },
                    {
                        transform: {
                            type: 'filter',
                            config: { dimension: 'insurance', value: '全球保' }
                        }
                    },
                    {
                        transform: {
                            type: 'filter',
                            config: { dimension: 'insurance', value: '即时保' }
                        }
                    },
                    {
                        transform: {
                            type: 'filter',
                            config: { dimension: 'insurance', value: '雇主保' }
                        }
                    },
                    // {
                    //     transform: {
                    //         type: 'filter',
                    //         config: { dimension: 'insurance', value: '灵工小保' }
                    //     }
                    // }
                ],
                series: [
                    {
                        type: 'pie',
                        name: '天天保',
                        radius: 70,
                        center: ['20%', '20%'],
                        datasetIndex: 1,
                        label: {
                            alignTo: 'edge',
                            position: 'inner',
                            formatter: '{b}',
                            fontSize: 16,
                            textStyle: {
                                fontWeight: 'bold',
                                textShadowColor: '(0,0,0,.1)', // 文字阴影
                                textShadowBlur: 1,
                                textShadowOffsetX: 1
                            }
                        },
                    },
                    {
                        type: 'pie',
                        name: '全球保',
                        radius: 70,
                        center: ['50%', '30%'],
                        datasetIndex: 2,
                        label: {
                            alignTo: 'edge',
                            position: 'inner',
                            formatter: '{b}',
                            fontSize: 16,
                            textStyle: {
                                fontWeight: 'bold',
                                textShadowColor: '(0,0,0,.1)', // 文字阴影
                                textShadowBlur: 1,
                                textShadowOffsetX: 1
                            }
                        },
                    },
                    {
                        type: 'pie',
                        name: '即时保',
                        radius: 70,
                        center: ['50%', '30%'],
                        datasetIndex: 3,
                        label: {
                            alignTo: 'edge',
                            position: 'inner',
                            formatter: '{b}',
                            fontSize: 16,
                            textStyle: {
                                fontWeight: 'bold',
                                textShadowColor: '(0,0,0,.1)', // 文字阴影
                                textShadowBlur: 1,
                                textShadowOffsetX: 1
                            }
                        },
                    },
                    {
                        type: 'pie',
                        name: '雇主保',
                        radius: 70,
                        center: ['37%', '80%'],
                        datasetIndex: 4,
                        label: {
                            alignTo: 'edge',
                            position: 'inner',
                            formatter: '{b}',
                            fontSize: 16,
                            textStyle: {
                                fontWeight: 'bold',
                                textShadowColor: '(0,0,0,.1)', // 文字阴影
                                textShadowBlur: 1,
                                textShadowOffsetX: 1
                            }
                        },
                    },
                    // {
                    //     type: 'pie',
                    //     name: '灵工小保',
                    //     radius: 70,
                    //     center: ['65%', '80%'],
                    //     datasetIndex: 5
                    // }
                ],
                // Optional. Only for responsive layout:
                media: [
                    {
                        query: { minAspectRatio: 1 },
                        option: {
                            series: [
                                { center: ['20%', '40%'] },
                                { center: ['50%', '40%'] },
                                { center: ['80%', '40%'] }
                            ]
                        }
                    },
                    {
                        option: {
                            series: [
                                { center: ['50%', '25%'] },
                                { center: ['50%', '50%'] },
                                { center: ['50%', '75%'] }
                            ]
                        }
                    }
                ]
            }
            this.chart4.setOption(option)
        },
        setChart() {
            // 基于准备好的dom，初始化echarts实例
            this.chart = echarts.init(document.getElementById('chart'))
            // console.log(this.chart)

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '▎各行业理赔保险数量'
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
                    // 折线图
                    type: 'bar',
                    label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: 'black'
                            }
                        },
                }]
            }

            this.chart.setOption(option)
        }
    },


}
</script>
