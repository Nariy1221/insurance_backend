<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <!-- <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="姓名"/>
      </el-form-item> -->
      <el-form-item>
        <el-input v-model="teacherQuery.mobile" clearable placeholder="手机号" />

      </el-form-item>
      <el-form-item>
        <el-input v-model="teacherQuery.avatar" clearable placeholder="所属行业">
          <!-- <el-option 
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value" />    -->
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-select v-model="teacherQuery.sex" clearable placeholder="性别">
          <el-option :value="1" label="男" />
          <el-option :value="2" label="女" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item>
        <el-input v-model="teacherQuery.sign" clearable placeholder="角色" >
 <el-option :value="管理员" label="管理员"/>
          <el-option :value="普通用户" label="普通用户"/> 
        </el-input>
      </el-form-item> -->
      <br>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <br>
    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>

      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <!-- <el-table-column prop="name" label="姓名" width="80" /> -->

      <el-table-column prop="uid" label="用户id">
        <!-- <template slot-scope="scope">
          {{ scope.row.level===1?'1类':'2类' }}
        </template> -->
      </el-table-column>

      <el-table-column prop="username" label="用户名" width="140">
        <!-- <template slot-scope="scope">
          {{ scope.row.level===1?'制造业':'服务业' }}
        </template> -->
      </el-table-column>

      <el-table-column prop="password" label="密码" width="150" />
      <!-- <el-table-column prop="sex" label="性别" width="80">
        <template slot-scope="scope">
          {{ scope.row.sex === 1 ? '男' : '女' }}
        </template>
      </el-table-column> -->
      <el-table-column prop="timestamp" label="最后登录">
        <template slot-scope="scope">
          {{ formattedDate(scope.row.timestamp) }}
        </template>
      </el-table-column>
      <el-table-column prop="prefGenres" label="兴趣">
        <template slot-scope="scope">
          <el-tag type="success" v-for="(item, index) in scope.row.prefGenres" :key="index" size="small"
            style="margin: 5px;">{{ item }}</el-tag>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="age" label="年龄" width="60" />
      <el-table-column prop="avatar" label="行业" width="150" /> -->
      <!-- <el-table-column prop="sign" label="用户角色" width="120" /> -->

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="warning" size="mini" icon="el-icon-edit" @click="handleDelete(scope.row)">删除</el-button>
          <!-- //<el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="limit" style="padding: 30px 0; text-align: center;"
              layout="total, sizes, prev, pager, next, jumper" :total="total" />

    <el-dialog title="用户信息" :visible.sync="dialogTableVisible">
      <el-row>
        <el-col :span="24">
          <el-form label-width="80px" label-height="30px">
            <el-form-item label="用户id">
              <el-input v-model="person.uid" disabled>
              </el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="person.username">
              </el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="person.password">
              </el-input>
            </el-form-item>
            <el-form-item label="兴趣">
              <el-input v-model="person.prefGenres" />
            </el-form-item>
            <el-form-item>
              <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

    </el-dialog>
  </div>
</template>
<script>
//引入调用teacher.js文件
import teacher from '@/api/userManager'
import userAPI from '@/api/userManager'

export default {
  //写核心代码位置
  // data:{
  // },
  data() { //定义变量和初始值
    return {
      list: null,//查询之后接口返回集合
      offset: 0,//当前页
      page:1,
      limit: 10,//每页记录数
      total: 100,//总记录数
      teacherQuery: {},//条件封装对象
      dialogTableVisible: false,
      person: {}
    }
  },
  created() { //页面渲染之前执行，一般调用methods定义的方法
    //调用
    // this.getList()
    this.init()
  },
  methods: {  //创建具体的方法，调用teacher.js定义的方法
    //讲师列表的方法
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
      userAPI.getUserrList(offset, limit).then(response => {
        // console.log("orderList", response)
        this.total = response.data.total?response.data.total:200
        this.num = response.data.order.length
        this.list = response.data.order
      })
    },
    handleEdit(item) {
      this.dialogTableVisible = true
      this.person = item
    },
    handleDelete(item) {
      console.log(item)
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userAPI.deleteUserList(item.uid).then(response => {
          console.log("", response)
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
    saveOrUpdate() {
      let data = {
        uid: this.person.uid,
        newUser: {
          username: this.person.username,
          password: this.person.password,
          prefGenres: this.person.prefGenres
        }
      }
      userAPI.updateUser(data).then(response => {
        console.log("", response)

      })
    },
    getList(page = 1) {
      this.page = page
      teacher.getUserListPage(this.page, this.limit, this.teacherQuery)
        .then(response => {//请求成功
          //response接口返回的数据
          console.log(response)
          this.list = response.data.data.rows
          this.total = response.data.data.total
          console.log(this.list)
          console.log(this.total)
          console.log(this.teacherQuery)
        })
    },
    resetData() {//清空的方法
      //表单输入项数据清空
      this.teacherQuery = {}
      //查询所有讲师数据
      this.getList()
    },
    formattedDate(originalDateString) {
      // 原始日期时间字符串
      // const originalDateString =  this.nowTime;

      // 解析日期时间字符串为 JavaScript Date 对象
      const date = new Date(originalDateString);

      // 提取日期和时间的各个部分
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');

      return year + '-' + month + '-' + day + '-  ' + hours + ':' + minutes + ':' + seconds;
    },
    go() {
      this.$router.push({ path: '/teacher/saveUser' })
    }
  }
}
</script>
