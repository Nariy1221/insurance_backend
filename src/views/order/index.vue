
<template>
  <el-row style="padding: 10px;">
    <el-col :span="24">
      <el-card class="box-card">
        <el-form ref="form" :model="form" label-width="80px" :inline="true">
          <el-form-item label="订单搜索" style="width: 100%;">
            <div style="display: flex;align-items: center;">
              <el-select v-model="form.currentSearchOpt">
                <el-option :label="item.label" :value="item.value" v-for="(item, index) in serchOption"
                  :key="index"></el-option>
              </el-select>
              <el-input v-model="form.searchValue" placeholder="请输入完整单号"></el-input>
            </div>
          </el-form-item>
          <div v-show="!isCollapsed">
            <el-form-item label="订单时间" style="width: 100%;">
              <div style="display: flex;align-items: center;">
                <el-select v-model="form.currentTimeOpt">
                  <el-option :label="item.label" :value="item.value" v-for="(item, index) in timeOption"
                    :key="index"></el-option>
                </el-select>
                <el-date-picker v-model="form.time" type="datetimerange" :picker-options="pickerOptions"
                  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="实收金额">
              <div style="display: flex;align-items: center;">
                <el-input v-model="form.money[0]" placeholder="最小金额">
                  <template slot="append">元</template>
                </el-input>
                <div style="padding: 0 10px;">-</div>
                <el-input v-model="form.money[1]" placeholder="最小金额">
                  <template slot="append">元</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="保险名称">
              <el-input v-model="form.insuranceName"></el-input>
            </el-form-item>
            <el-form-item label="保险类型">
              <el-select v-model="form.insuranceType" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单类型">
              <el-select v-model="form.orderType" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-select v-model="form.orderStatus" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item style="width: 100%;padding-left: 80px;">
            <el-button type="primary" @click="onSubmit">筛选</el-button>
            <el-button>导出</el-button>
            <el-button type="text">重置筛选条件</el-button>
            <el-button type="text" @click="collapseSeach">{{ isCollapsed ? '展开 ↓' : '收起 ↑' }}</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="24" style="margin-top: 10px;">
      <el-card class="box-card">
        <el-row>
          <el-col :span="24">
            <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
              <el-tab-pane :label="item.label" :name="item.name" v-for="(item, index) in tabItems"
                :key="index"></el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="24">
            <el-table :data="tableData">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column label="保险名称" width="120">
                <template slot-scope="scope">
                  <el-link style="color:#6a9df7">{{ scope.row.insuranceName }}</el-link>
                </template>
              </el-table-column>
              <el-table-column prop="insuranceStatus" label="状态">
              </el-table-column>
              <el-table-column prop="insurancePrice" label="价格(元)">
              </el-table-column>
              <el-table-column label="下单日期" width="120">
                <template slot-scope="scope">{{ scope.row.orderDate }}</template>
              </el-table-column>
              <el-table-column prop="orderCode" label="订单号" width="150">
              </el-table-column>
              <el-table-column prop="orderMethod" label="付款方式">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.orderMethod == '支付宝' ? '' : 'success'">{{ scope.row.orderMethod }}</el-tag>

                </template>
              </el-table-column>
              <el-table-column prop="payMoney" label="实付金额(元)">
              </el-table-column>
              <el-table-column label="投保人/被投保人姓名" width="150">
                <template slot-scope="scope">{{ scope.row.applicant }} / {{ scope.row.Insured }}</template>

              </el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="24" style="text-align: center;margin-top: 10px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10"
              layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>
          </el-col>
        </el-row>


      </el-card>
    </el-col>

  </el-row>
</template>
<script>

export default {
  data() {
    return {
      form: {
        currentSearchOpt: '交易单号',
        searchValue: '',
        currentTimeOpt: '下单时间',
        time: '',
        money: [0, 1000],
        insuranceName: '',
        insuranceType: '全部',
        orderType: '全部',
        orderStatus: '已完成',
      },
      currentPage:1,
      isCollapsed: true,
      serchOption: [
        { label: "交易单号", value: '交易单号' },
        { label: "订单号", value: '订单号' },
        { label: "商品单号", value: '商品单号' },
        { label: "用户ID", value: '用户ID' },
      ],
      timeOption: [
        { label: '下单时间', value: '下单时间' },
        { label: '结算时间', value: '结算时间' },
        { label: '支付时间', value: '支付时间' },
      ],
      activeTab: '全部',
      tabItems: [
        { label: '全部', name: '全部' },
        { label: '待付款', name: '待付款' },
        { label: '交易成功', name: '交易成功' },
        { label: '交易失败', name: '交易失败' },
        { label: '交易关闭', name: '交易关闭' },
        { label: '投保中', name: '投保中' },
        { label: '已出险', name: '已出险' },
      ],
      tableData: [{
        insuranceName: '全球保',
        insuranceStatus: '在售',
        insurancePrice: '1234.00',
        orderDate: '2023-11-11',
        orderCode: '10086110120118',
        orderMethod: '支付宝',
        payMoney: '1234.00',
        applicant: '张三',
        Insured: '李四',
      }, {
        insuranceName: '全球保',
        insuranceStatus: '在售',
        insurancePrice: '1234.00',
        orderDate: '2023-11-11',
        orderCode: '10086110120118',
        orderMethod: '微信',
        payMoney: '1234.00',
        applicant: '张三',
        Insured: '李四',
      }, {
        insuranceName: '全球保',
        insuranceStatus: '在售',
        insurancePrice: '1234.00',
        orderDate: '2023-11-11',
        orderCode: '10086110120118',
        orderMethod: '支付宝',
        payMoney: '1234.00',
        applicant: '张三',
        Insured: '李四',
      },
      ],
      multipleSelection: [],
      pickerOptions: {
        shortcuts: [{
          text: '昨天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  created() { //页面渲染之前执行

  },
  watch: {  //监听
  },
  methods: {
    collapseSeach() {
      this.isCollapsed = !this.isCollapsed
    },
    handleClick() {

    },
    onSubmit() {

    }

  }
}
</script>
