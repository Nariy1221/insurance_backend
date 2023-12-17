

const axios = require("axios")
// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
// mock一组数据
console.log(1111)
// insuranceEveryInsurance() {
//     return request({
//         url: '/eduservice/teacher/EveryInsurance',
//         method: 'get'
//       })

// },

// avatarEveryAvatarBuyInsurance() {
//     return request({
//         url: '/eduservice/teacher/EveryAvatarBuyInsurance',
//         method: 'get'
//       })

// },
// monthEveryMonthInjury() {
//     return request({
//         url: '/eduservice/teacher/EveryMonthInjury',
//         method: 'get'
//       })

// },
// monthEveryMonthBuyInsurance() {
//     return request({
//         url: '/eduservice/teacher/EveryMonthBuyInsurance',
//         method: 'get'
//       })

// },


// 用于接受生成数据的数组
let EveryInsurance = []
let insurance = ['天天保', '全球保', '即时保', '雇主保', '灵工小保']
for (let i = 0; i < 5; i++) {
  let newObject = {
    title: Random.csentence(2, 5), //  Random.csentence( min, max )
    name: insurance[i],
    value: Mock.mock('@integer(1, 100)'), // Random.cname() 随机生成一个常见的中文姓名
    url: Random.url(), // 生成web地址
    date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
  }
  EveryInsurance.push(newObject)
}

let EveryInsuranceInjury = []
for (let i = 0; i < 5; i++) {
  let newObject = {
    title: Random.csentence(2, 5), //  Random.csentence( min, max )
    name: insurance[i],
    value: Mock.mock('@integer(1, 100)'), // Random.cname() 随机生成一个常见的中文姓名
    url: Random.url(), // 生成web地址
    date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
  }
  EveryInsuranceInjury.push(newObject)
}

let EveryInsuranceByMonths = []
for (let i = 1; i < 13; i++) {
  let newObject = {
    name: i + '月',
    value: Mock.mock('@integer(1, 100)'), // Random.cname() 随机生成一个常见的中文姓名
  }
  EveryInsuranceByMonths.push(newObject)
}
let EveryInsuranceByMonthsInjury = []
for (let i = 1; i < 13; i++) {
  let newObject = {
    name: i + '月',
    value: Mock.mock('@integer(1, 100)'), // Random.cname() 随机生成一个常见的中文姓名
  }
  EveryInsuranceByMonthsInjury.push(newObject)
}
let EveryProvinceInjury = [
  { name: "西藏", value: 2333 },
  { name: "黑龙江", value: 1111 },
]
let EveryInsurancePlan = [
  { insurance: '天天保', name: '方案一', value: 111 },
  { insurance: '天天保', name: '方案二', value: 111 },
  { insurance: '全球保', name: '方案一', value: 111 },
  { insurance: '全球保', name: '方案二', value: 222 },
  { insurance: '即时保', name: '方案一', value: 111 },
  { insurance: '即时保', name: '方案二', value: 444 },
  { insurance: '雇主保', name: '方案一', value: 111 },
  { insurance: '雇主保', name: '方案二', value: 111 },
  { insurance: '灵工小保', name: '方案二', value: 222 },
]

let tableList = {
  EveryInsurance: EveryInsurance,
  EveryMonthInjury: EveryInsuranceByMonthsInjury,
  EveryProvinceInjury: EveryProvinceInjury,
  EveryAvatarBuyInsurance: EveryInsurance,
  EveryMonthBuyInsurance: EveryInsuranceByMonths,
  EveryAvatarInjury: EveryInsuranceInjury,
  EveryInsurancePlan: EveryInsurancePlan,
  UserCommend: EveryInsurance,
  EveryAvatarInjuryAll: EveryInsuranceInjury,
  EveryInjuryInsurance: EveryInsuranceInjury,
  EveryInsuranceBeInjury: EveryInsurancePlan,
  EveryUserAvatar: EveryInsurance,
  EveryUserAge: EveryInsurance,
  EveryUserGender: EveryInsurance,
  EveryUserInjury: EveryInsuranceInjury,
  MadeChart: EveryInsurance,
}
// }
// console.log(tableList, 'tableList')
// 拦截ajax请求，配置mock的数据
// get请求
Mock.mock('http://localhost:9528/eduservice/teacher/EveryInsurance', 'get', tableList) //
Mock.mock('http://localhost:9528/eduservice/teacher/EveryAvatarBuyInsurance', 'get', tableList)
Mock.mock('http://localhost:9528/eduservice/teacher/EveryMonthInjury', 'get', tableList)
Mock.mock('http://localhost:9528/eduservice/teacher/EveryProvinceInjury', 'get', tableList)
Mock.mock('http://localhost:9528/eduservice/teacher/EveryMonthBuyInsurance', 'get', tableList)
Mock.mock('http://localhost:9528/eduservice/teacher/EveryAvatarInjury', 'get', tableList)
Mock.mock('http://localhost:9528/eduservice/teacher/EveryInsurancePlan', 'get', tableList)

Mock.mock('http://localhost:9528/eduservice/teacher/EveryAvatarInjuryAll', 'get', tableList)
Mock.mock('http://localhost:9528/eduservice/teacher/EveryInjuryInsurance', 'get', tableList)
Mock.mock('http://localhost:9528/eduservice/teacher/EveryInsuranceBeInjury', 'get', tableList)

Mock.mock('http://localhost:9528/eduservice/teacher/EveryUserAvatar/', 'get', tableList)
Mock.mock('http://localhost:9528/eduservice/teacher/EveryUserAge/', 'get', tableList)
Mock.mock('http://localhost:9528/eduservice/teacher/EveryUserGender/', 'get', tableList)
Mock.mock('http://localhost:9528/eduservice/teacher/EveryUserInjury/', 'get', tableList)
Mock.mock('http://localhost:9528/eduservice/teacher/MadeChart/null/null/null/null/null/null/null/null/avatar', 'get', tableList)
Mock.mock('http://localhost:9528/eduservice/teacher/MadeChart/////////', 'get', tableList)

Mock.mock('http://localhost:9528/eduservice/teacher/UserCommend/a/a/a/', 'get', tableList)

Mock.mock('http://localhost:9528/eduservice/ucenter-member/getMemberInfo', 'get', (params) => {
  return {
    userInfo: {
      sign: '管理员'
    },

  }
})
Mock.mock('http://localhost:9528/eduservice/ucenter-member/login', 'post', (params) => {
  console.log(params, 'params')
  let data = {

    token: 'ASD342DASD324245',

  }
  return data
})
// post请求分页
Mock.mock('http://localhost:9528/eduservice/ucenter-member/pageTeacherCondition/1/10', 'post', (params) => {
  console.log(params, 'params')
  // const [index, size, total] = [JSON.parse(params.body).page, JSON.parse(params.body).size, tableList.length]
  // let len = total / size
  // console.log(index, size, total, 'index, size, total')
  // const totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
  // 截取list
  // const newProduceNewsData = tableList.slice(index * size, (index + 1) * size)
  let tableList = [
    {
      nickname:'111',
      mobile:"1111",
      password:'1111',
      sex:1,
      age:21,
      avatar:'学术',
    },
    {
      nickname:'222',
      mobile:"222",
      password:'1122211',
      sex:2,
      age:21,
      avatar:'学术',
    }
  ]
  let total = 10
  // const newProduceNewsData = tableList.slice((index - 1) * size, index * size)
  // console.log(newProduceNewsData, 'newProduceNewsData')
  return {
    code: '0',
    message: 'success',
    data: {
      // page: index,
      // size: size,
      rows: tableList,
      total: total,
      // totalPages: totalPages
    }
  }
})

