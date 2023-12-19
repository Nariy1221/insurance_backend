
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
                  <el-link style="color:#6a9df7">{{ scope.row.insurance_id }}</el-link>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="insuranceStatus" label="状态">
              </el-table-column> -->
              <el-table-column prop="amount" label="价格(元)" sortable width="150">
              </el-table-column>
              <el-table-column label="下单日期" width="200" sortable >
                <template slot-scope="scope">
                  
                  {{ scope.row.create_time||scope.row.create_time==null?'—':scope.row.create_time }}</template>
              </el-table-column>
              <el-table-column prop="code" label="订单号" width="150">
                <template slot-scope="scope">
                  
                  {{ scope.row.code||scope.row.code==null?'—':scope.row.code }}</template>
              </el-table-column>
              <el-table-column label="投保人姓名" width="150">
                <template slot-scope="scope">{{ scope.row.customer_id }}</template>

              </el-table-column>
              <el-table-column prop="payment_type" label="付款方式">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.status == '完成'" :type="scope.row.payment_type == '支付宝' ? '' : 'success'">{{ scope.row.payment_type }}</el-tag>
                  <div v-else>—</div>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.status == '完成' ? '' : 'success'">{{ scope.row.status ? scope.row.status : '未完成'
                  }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="实付金额(元)" sortable width="150">
              </el-table-column>

              <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small" style="color: rgb(249, 131, 110);"
                    @click="handleDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="24" style="text-align: center;margin-top: 10px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit"
              layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </el-col>
        </el-row>


      </el-card>
    </el-col>

  </el-row>
</template>
<script>
import ordersAPI from '@/api/orders'
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
      currentPage: 1,
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
      },
      offset: 0,
      limit: 10,
      total:200
    }
  },
  created() { //页面渲染之前执行
    this.init()
  },
  watch: {  //监听
  },
  methods: {
    init() {
      this.fetchData(this.offset,this.limit)
    },
    handleCurrentChange(val){
      this.offset = val
      let offset = (this.offset - 1)*this.limit
      if(offset < 0) offset = 0
      this.fetchData(offset,this.limit)
      console.log("当前页面",val)
    },
    handleSizeChange(val){
      this.limit = val
      let offset = (this.offset - 1)*this.limit
      if(offset < 0) offset = 0
      this.fetchData(offset,this.limit)
      console.log("大小变为",val)

    },
    fetchData(offset,limit){
      ordersAPI.getOrderList(offset, limit).then(response => {
        console.log("orderList", response)
        this.total = response.data.total?response.data.total:200
        this.num = response.data.order.length
        this.tableData = response.data.order
      })
    },
    handleDelete(item) {
      console.log(item)
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ordersAPI.deleteOrderList(item.customer_id, item.insurance_id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });

        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
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
