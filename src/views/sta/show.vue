<template>
    <div style="padding: 10px;">
        <!-- el-row 是划分行，el-col是划分列，:span="xx" xx为占得比重，最大为24，合计超过24就会换行 -->
        <el-row :gutter="10">
            <!-- 左上角：经营数据 -->
            <!-- <el-col :span="16">
                <el-card class="box-card" style="margin-bottom: 10px;">
                    <div slot="header" class="clearfix" style="display: flex;align-items: center;">
                        <span>经营数据</span>
                        <div style="font-size: 14px;color: #787878;margin-left: 10px;">更新时间：2023-11-11</div>
                    </div>
                    <el-row> -->
                        <!-- 使用组件，:data="item" item为每个组件传入的参数 -->
                        <!-- <statisticBlock :data="item" :width="6" v-for="(item, index) in OperatingData" :key="index">
                        </statisticBlock>
                    </el-row>
                </el-card>
            </el-col> -->
            <!-- 右上角：营销数据 -->
            <!-- <el-col :span="8">
                <el-card class="box-card" style="margin-bottom: 10px;">
                    <div slot="header" class="clearfix" style="display: flex;align-items: center;">
                        <span>营销数据</span>
                        <div style="font-size: 14px;color: #787878;margin-left: 10px;">更新时间：2023-11-11</div>
                    </div>
                    <el-row>
                        <statisticBlock :data="item" :width="12" v-for="(item, index) in SalesData" :key="index">
                        </statisticBlock>
                    </el-row>
                </el-card>
            </el-col> -->
            <!-- 左下角： 保险销售数据 与 各月销售保险/出险数量 -->
            <el-col :span="16">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>保险销售数据</span>
                            </div>
                            <el-row>
                                <el-col :span="11" style="">
                                    <!-- 各省分布 -->
                                    <insuranceNumByProvinces :data="provinceData" :province="dataprovice">
                                    </insuranceNumByProvinces>
                                </el-col>
                                <el-col :span="1" style="border-left:2px solid #F4F4F4 ;height: 250px;">
                                </el-col>
                                <el-col :span="12">
                                    <!-- 保险种类销售数量 -->
                                    <insuranceNumByTypes :data="typesData"></insuranceNumByTypes>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                    <el-col :span="24" style="margin-top: 20px;">
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                        <span>各月销售保险/出险数量</span>
                                    </div>
                                    <!-- 各月销售保险/出险数量 -->
                                    <insuranceNumByMonths :data="monthsData"></insuranceNumByMonths>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-col>
            <!-- 右下角： 各行业保险数据 -->
            <el-col :span="8">
                <el-col :span="24">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>各行业保险数据</span>
                        </div>
                        <!-- 各行业保险数据 -->
                        <insuranceNumByAvatars :data="avatarsData"></insuranceNumByAvatars>
                        <el-divider></el-divider>
                        <!-- 各行业出险数量 -->
                        <insurancePieByAvatars :data="pieData"></insurancePieByAvatars>
                    </el-card>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import staApi from '@/api/sta'
// 引入组件，在当前目录components中，后续注释以第一个为例，insurancePieByAvatars
import insurancePieByAvatars from '@/views/sta/components/insurancePieByAvatars.vue'
import insuranceNumByAvatars from '@/views/sta/components/insuranceNumByAvatars.vue'
import insuranceNumByMonths from '@/views/sta/components/insuranceNumByMonths.vue'
import insuranceNumByProvinces from '@/views/sta/components/insuranceNumByProvinces.vue'
import insuranceNumByTypes from '@/views/sta/components/insuranceNumByTypes.vue'
import statisticBlock from '@/views/sta/components/statisticBlock.vue'
export default {
    components: {
        // 按顺序：各行业饼图，各行业柱状图，各月保险数，各省数据，各类型柱状图，上方统计数据
        insurancePieByAvatars,
        insuranceNumByAvatars,
        insuranceNumByMonths,
        insuranceNumByProvinces,
        insuranceNumByTypes,
        statisticBlock
    },
    data() {
        return {
            // 传入组件的数据，在组件中传入，例如:data="OperatingData"
            OperatingData: [
                { title: '实收金额', unit: '元', statistic: 1111, last: 999, info: '较上月' },
                { title: '订单总额', unit: '元', statistic: 1111, last: 999, info: '较上月' },
                { title: '订单数量', unit: '单', statistic: 1111, last: 1300, info: '较上月' },
                { title: '投保人数', unit: '人', statistic: 1111, last: 999, info: '较上月' },
            ],
            SalesData:[
                { title: '优惠金额', unit: '元', statistic: 1111, last: 1300, info: '较上月' },
                { title: '优惠卷使用数量', unit: '张', statistic: 1111, last: 999, info: '较上月' },           
            ],
            pieData: [],
            avatarsData: [],
            monthsData: [],
            typesData: [],
            provinceData: [],
            num: 0,
            dataprovice: [],
            mapData: {}
        }
    },
    created() { //页面渲染之前执行
        this.init();//初始化
    },
    watch: {  //监听
    },
    methods: {
        init() {
            //发送请求获取数据
            this.getTypesData();
            this.getProvinceData();
            this.getAvatarsData();//and pieData
            this.getMonthsData();

        },
        getTypesData() {
            //保险种类销售数量
            staApi.insuranceEveryInsurance()
                .then(response => {
                    console.log("保险种类销售数量",response)
                    this.num = response.data.length
                    this.num = response.data.EveryInsurance.length
                    let xData = response.data.EveryInsurance.map(element => element.name)
                    let yData = response.data.EveryInsurance.map(element => element.value)
                    //将获取的数据赋值给定义的参数，下同
                    this.typesData = [xData, yData]
                })
        },
        getProvinceData() { // 各省分布
            staApi.provinceEveryInjury()
                .then(response => {
                    console.log("各省分布",response)

                    this.num = response.data.EveryProvinceInjury.length
                    this.dataprovice = response.data.EveryProvinceInjury
                    let xData = response.data.EveryProvinceInjury.map(element => element.province)
                    let yData = response.data.EveryProvinceInjury.map(element => element.count)
                    this.provinceData = [xData, yData]
                })
        },
        getAvatarsData() {//各行业购买保险数
            staApi.avatarEveryAvatarBuyInsurance()
                .then(response => {
                    console.log("各行业购买保险数",response)

                    this.num = response.data.EveryAvatarBuyInsurance.length
                    let xData = response.data.EveryAvatarBuyInsurance.map(element => element.name)
                    let yData = response.data.EveryAvatarBuyInsurance.map(element => element.value)
                    let yData1 = yData
                    staApi.avatarEveryAvatarInjury()
                        .then(response => {
                            console.log("各行业购买出险数",response)

                            this.num = response.data.EveryAvatarInjury.length
                            let xData = response.data.EveryAvatarInjury.map(element => element.name)
                            let yData = response.data.EveryAvatarInjury.map(element =>
                            {
                                const rand = Math.floor(Math.random()*100)
                                const old = Math.floor(element.value * 0.5)
                                const newVal = Math.max(old - rand, 0 )
                                return newVal
                            }
                            // element.value
                            )
                            this.avatarsData = [xData, yData1, yData]
                        })
                    // 调用下面生成图表的方法，改变值
                    this.pieData = [xData, yData]
                })
        },
        getMonthsData() { //各月销售保险数量
            staApi.monthEveryMonthBuyInsurance()
                .then(response => {
                    console.log("各月销售保险数量",response)

                    this.num = response.data.EveryMonthBuyInsurance.length
                    let xData = response.data.EveryMonthBuyInsurance.map(element => element.name)
                    let yData = response.data.EveryMonthBuyInsurance.map(element => element.value)
                    let yData1 = yData
                    staApi.monthEveryMonthInjury()
                        .then(response => {
                            console.log("各月出险数量",response)

                            let xData = response.data.EveryMonthInjury.map(element => element.name)
                            let yData = response.data.EveryMonthInjury.map(element => 
                            {
                                const rand = Math.floor(Math.random()*100)
                                const old = Math.floor(element.value * 0.4)
                                const newVal = Math.max(old - rand, 0 )
                                return newVal
                            }
                            // element.value
                            )
                            this.monthsData = [xData, yData1, yData]
                        })
                })
        },
    }
}
</script>
<style>
</style>