<template>
  <div style="padding: 10px;">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card" style="margin-bottom: 10px;text-align: center;">
          <el-row>
            <!--表单value-format="yyyy-MM-dd"-->
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item>
                <el-select v-model="gender" placeholder="性别" @change="$forceUpdate()">
                  <!-- <el-option :value="null" label="未出险"/> -->
                  <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="avatar" placeholder="行业" @change="$forceUpdate()">
                  <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="province" placeholder="省份" @change="$forceUpdate()">
                  <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="sta" placeholder="选择要统计的保险种类" @change="$forceUpdate()">
                  <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.label" />
                </el-select>
              </el-form-item>
              <el-button type="primary" @click="showChart5()">生成</el-button>
            </el-form>

          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" style="margin-bottom: 10px;text-align: center;">
          <div slot="header" class="clearfix" style="display: flex;align-items: center;">
            <span>数据比例</span>
            <div style="font-size: 14px;color: #787878;margin-left: 10px;">更新时间：2023-11-11</div>
          </div>
          <el-row>
            <div id="chart" class="chart" style="height:500px;width: 100%;" />
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" style="margin-bottom: 10px;text-align: center;">
          <div slot="header" class="clearfix" style="display: flex;align-items: center;">
            <span>数据表格</span>
            <div style="font-size: 14px;color: #787878;margin-left: 10px;">更新时间：2023-11-11</div>
          </div>
          <el-row>
            <el-table :data="tabelDate" style="width: 100%;height: 100%;text-align: center;" show-summary border
              :default-sort="{ prop: 'perp', order: 'descending' }">
              <el-table-column type="index" width="50">
              </el-table-column>
              <el-table-column prop="name" label="类型">
              </el-table-column>
              <el-table-column prop="pct" label="百分比（%）" sortable>
                <template slot-scope="scope">
                  {{ scope.row.pct }}%
                </template>
              </el-table-column>
              <el-table-column prop="value" label="数量">
              </el-table-column>


            </el-table>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import staApi from '@/api/buy'
import staApi from '@/api/sta'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      options1: [{
        value: 'a',
        label: '全部'
      }, {
        value: '男',
        label: '男'
      },
      {
        value: '女',
        label: '女'
      }],
      options2: [
        {
          value: 'a',
          label: '全部'
        }, {

          value: '一般职业',
          label: '一般职业'
        },
        {
          value: '农牧业',
          label: '农牧业'
        },
        {
          value: '出版广告业',
          label: '出版广告业'
        },
        {
          value: '制造、维修业',
          label: '制造、维修业'
        },
        {
          value: '娱乐业',
          label: '娱乐业'
        },
        {
          value: '建筑行业',
          label: '建筑行业'
        },
        {
          value: '文化教育',
          label: '文化教育'
        },
        {
          value: '木材加工业',
          label: '木材加工业'
        },
        {
          value: '渔业',
          label: '渔业'
        },
        {
          value: '水力燃气事业',
          label: '水力燃气事业'
        },
        {
          value: '道路运输业',
          label: '道路运输业'
        },
        {
          value: '金融、服务业',
          label: '金融、服务业'
        },
        {
          value: '零售批发业',
          label: '零售批发业'
        },
        {
          value: '餐饮旅游业',
          label: '餐饮旅游业'
        }],
      options3: [{
        value: 'a',
        label: '全部'
      }, {
        value: '安徽',
        label: '安徽'
      },
      {
        value: '陕西',
        label: '陕西'
      },
      {
        value: '澳门',
        label: '澳门'
      },
      {
        value: '北京',
        label: '北京'
      },
      {
        value: '重庆',
        label: '重庆'
      },
      {
        value: '福建',
        label: '福建'
      },
      {
        value: '甘肃',
        label: '甘肃'
      },
      {
        value: '广东',
        label: '广东'
      },
      {
        value: '广西',
        label: '广西'
      },
      {
        value: '海南',
        label: '海南'
      },
      {
        value: '河北',
        label: '河北'
      },
      {
        value: '黑龙江',
        label: '黑龙江'
      },
      {
        value: '河南',
        label: '河南'
      },
      {
        value: '湖北',
        label: '湖北'
      },
      {
        value: '湖南',
        label: '湖南'
      },
      {
        value: '江苏',
        label: '江苏'
      },
      {
        value: '江西',
        label: '江西'
      },
      {
        value: '吉林',
        label: '吉林'
      },
      {
        value: '辽宁',
        label: '辽宁'
      },
      {
        value: '内蒙古',
        label: '内蒙古'
      },
      {
        value: '宁夏',
        label: '宁夏'
      },
      {
        value: '青海',
        label: '青海'
      },
      {
        value: '山东',
        label: '山东'
      },
      {
        value: '上海',
        label: '上海'
      },
      {
        value: '山西',
        label: '山西'
      },
      {
        value: '台湾',
        label: '台湾'
      },
      {
        value: '天津',
        label: '天津'
      },
      {
        value: '香港',
        label: '香港'
      },
      {
        value: '新疆',
        label: '新疆'
      },
      {
        value: '西藏',
        label: '西藏'
      }, {
        value: '云南',
        label: '云南'
      },
      {
        value: '浙江',
        label: '浙江'
      }],
      options4: [{
        value: '天天保',
        label: '天天保'
      },
      {
        value: '雇主保',
        label: '雇主保'
      },
      {
        value: '全球保',
        label: '全球保'
      },
      {
        value: '灵工小保',
        label: '灵工小保'
      },
      {
        value: '即时保',
        label: '即时保'
      },
      {
        value: '保险种类',
        label: '保险种类'
      }],
      //insurance:'',

      xData: [],
      yData: [],
      pieData: [],
      num: 0,
      dataList: [],
      dataprovice: [],
      mapData: {},
      gender: '',
      avatar: '',
      province: '',
      sta: '',
      genderInit: 'a',
      avatarInit: 'a',
      provinceInit: 'a',
      staInit: '',
      sum: 0,
      tabelDate: []

    }
  },
  created() { //页面渲染之前执行
    this.showdefault();
    // this.showChart6();
  },
  watch: {  //监听
  },
  methods: {
    showdefault() {
      staApi.insuranceEveryInsurance()
        .then(response => {
          console.log("保险种类销售数量", response)
          let xData = response.data.EveryInsurance.map(element => element.name)
          let yData = response.data.EveryInsurance.map(element => element.value)
          this.pieData = response.data.EveryInsurance
          this.tabelDate = []
          this.sum = this.pieData.reduce((sum, e) => sum + Number(e.value || 0), 0)
          this.pieData.map((item, index) => {
            this.tabelDate.push(Object.assign({}, item, { pct: ((item.value / this.sum) * 100).toFixed(2) }))
          })
          this.setChart6()
        })
    },
    showChart5() {
      staApi.createUserCommend(this.gender, this.avatar, this.province, this.sta)
        .then(response => {
          console.log(response)
          console.log(response.data.UserCommend.length)
          this.num = response.data.UserCommend.length
          this.pieData = response.data.UserCommend
          //调用下面生成图表的方法，改变值
          this.setChart5()
        })
    },
    showChart6() {
      staApi.createUserCommend(this.genderInit, this.avatarInit, this.provinceInit, this.staInit)
        .then(response => {
          console.log(response)
          console.log(response.data.UserCommend.length)
          this.num = response.data.UserCommend.length
          this.pieData = response.data.UserCommend
          console.log(response.data.UserCommend)
          this.sum = this.pieData.reduce((sum, e) => sum + Number(e.value || 0), 0)
          this.tabelDate = []
          this.pieData.map((item, index) => {
            this.tabelDate.push(Object.assign({}, item, { pct: ((item.value / this.sum) * 100).toFixed(2) }))
          })
          //调用下面生成图表的方法，改变值
          this.setChart6()
        })
    },
    setChart5() {
      // 基于准备好的dom，初始化echarts实例
      this.chart5 = echarts.init(document.getElementById('chart'), 'light')
      // console.log(this.chart)

      // 指定图表的配置项和数据
      var option = {
        //backgroundColor: '#2c343c',
        // title: {
        //     text: '▎性别分布'
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        //系列列表。每个系列通过 type 决定自己的图表类型
        series: [{
          // 系列中的数据内容数组
          data: this.pieData,
          // 折线图
          type: 'pie',
          label: {
            show: true
          },
          center: ["50%", '50%']
        }]
      }

      this.chart5.setOption(option)
    },
    setChart6() {
      // 基于准备好的dom，初始化echarts实例
      this.chart6 = echarts.init(document.getElementById('chart'), 'light')
      // console.log(this.chart)

      // 指定图表的配置项和数据
      var option = {
        //backgroundColor: '#2c343c',
        // title: {
        //     text: '▎性别分布'
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        //系列列表。每个系列通过 type 决定自己的图表类型
        series: [{
          // 系列中的数据内容数组
          data: this.pieData,
          // 折线图
          type: 'pie',
          label: {
            show: true
          },
          center: ["50%", '50%']
        }]
      }

      this.chart6.setOption(option)
    }
  }
}
</script>
