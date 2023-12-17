<template>
    <div id="insuranceNumByProvinces" class="chart" style="height:300px;width:100%" />
</template>
<script>
import * as echarts from 'echarts'
import dataJson from "@/assets/china"
import { getProvinceMapInfo } from '@/utils/map_utils'
export default {
    name: 'insuranceNumByProvinces',
    props: {
        data: {
            type: Array,
        },
        province: {
            type: Array
        }
    },
    data() {
        return {
            id: 'insuranceNumByProvinces',
            xData: [],
            yData: [],
            dataprovice: [],
            mapData: {},
            chart2: ""

        }
    },
    created() {

    },
    mounted() {
        this.xData = this.data[0]
        this.yData = this.data[1]
        this.dataprovice = this.province
        this.showChart()
    },
    watch: {
        data(nval) {
            this.xData = nval[0]
            this.yData = nval[1]
            this.showChart()
        },
        province(nval) {
            this.dataprovice = nval
            this.showChart()
        }
    },
    methods: {
        showChart() {  // 基于准备好的dom，初始化echarts实例
            // 基于准备好的dom，初始化echarts实例
            this.chart2 = echarts.init(document.getElementById('insuranceNumByProvinces'))
            // console.log(this.chart)
            let chinadata = dataJson
            console.log(chinadata)
            echarts.registerMap("china", chinadata)
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '▎各省分布'
                },
                tooltip: {
                    triggerOn: "mousemove",   //mousemove、click
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#409eff',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    textStyle: {
                        color: '#000000',
                        fontSize: 13
                    },

                },
                visualMap: {
                    show: true,
                    left: 5,
                    bottom: 40,
                    showLabel: true,
                    min: 0,
                    max: 5000,
                    // inRange: {
                    //     color: ['yellow', 'red']
                    // },
                    calculable: true
                },
                geo: {
                    map: "china",
                    scaleLimit: {
                        min: 1,
                        max: 2
                    },
                    zoom: 1,

                    roam: true,
                    top: 'middle',
                    //bottom:'%5',
                    label: {
                        normal: {
                            //show:true,
                            fontSize: "14",
                            color: "rgba(0,0,0,0.7)"
                        }
                    },
                    itemStyle: {

                        normal: {
                            shadowBlur: 50,
                            //areaColor:'#2E72BF',
                            shadowColor: 'rgba(0, 0, 0, 0.2)',
                            borderColor: "rgba(0, 0, 0, 0.2)"
                        },
                        emphasis: {
                            areaColor: "#f2d5ad",
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            borderWidth: 0
                        }
                    }
                },
                series: [
                    {
                        type: "map",
                        geoIndex: 0,
                        data: this.dataprovice
                    }
                ]
            }
            //echart data
            this.chart2.setOption(option)
            this.chart2.on('click', async arg => {
                const provinceInfo = getProvinceMapInfo(arg.name)
                console.log(provinceInfo)
                if (!this.mapData[provinceInfo.key]) {
                    const ret = await axios.get('http://localhost:9528' + provinceInfo.path)
                    console.log(ret)
                    echarts.registerMap(provinceInfo.key, ret.data)
                }
                const changeOption = {
                    geo: {
                        map: provinceInfo.key,
                        zoom: 1,

                        roam: true,
                        top: 'middle',
                        //bottom:'%5'
                    }
                }

                this.chart2.setOption(changeOption)
            })
        },
        revertMap() {
            const revertOption = {
                geo: {
                    map: 'china'
                }
            }
            this.chart2.setOption(revertOption)
            window.onresize = function () {//用于使chart自适应高度和宽度

                resizeWorldMapContainer();//重置容器高宽
                this.chart2.resize();
            }
        },
    }
}
</script>
  
<style lang="scss" scoped></style>
  