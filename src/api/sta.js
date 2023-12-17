import request from '@/utils/request'

export default {
    //1 生成统计数据
    createStaData(day) {
        return request({
            url: '/staservice/sta/registerCount/'+day,
            method: 'post'
          })
    },
    // 各省分布
    provinceEveryInjury() {
        return request({
            url: '/eduservice/teacher/EveryProvinceInjury',
            method: 'get'
          })
    
    },
    //保险种类销售数量
    insuranceEveryInsurance() {
        return request({
            url: '/eduservice/teacher/EveryInsurance',
            method: 'get'
          })
    
    },
//各行业购买保险数
    avatarEveryAvatarBuyInsurance() {
        return request({
            url: '/eduservice/teacher/EveryAvatarBuyInsurance',
            method: 'get'
          })
    
    },
    // 各月出险数量
    monthEveryMonthInjury() {
        return request({
            url: '/eduservice/teacher/EveryMonthInjury',
            method: 'get'
          })
    
    },
    //各行业购买保险数
    monthEveryMonthBuyInsurance() {
        return request({
            url: '/eduservice/teacher/EveryMonthBuyInsurance',
            method: 'get'
          })
    
    },

    //各行业出险数量
    avatarEveryAvatarInjury() {
        return request({
            url: '/eduservice/teacher/EveryAvatarInjury',
            method: 'get'
          })
    
    }
    //以上为数据大屏接口
    // genderEveryInjury() {
    //     return request({
    //         url: '/eduservice/teacher/EveryGenderInjury',
    //         method: 'get'
    //       })
    
    // },
    // levelEveryInjury() {
    //     return request({
    //         url: '/eduservice/teacher/EveryLevelInjury',
    //         method: 'get'
    //       })
    
    // },
    // careerEveryInjury() {
    //     return request({
    //         url: '/eduservice/teacher/EveryCareerInjury',
    //         method: 'get'
    //       })
    
    // },
    // EveryInjury() {
    //     return request({
    //         url: '/eduservice/teacher/EveryInjury',
    //         method: 'get'
    //       })
    
    // },
    // beEveryInjury() {
    //     return request({
    //         url: '/eduservice/teacher/EveryBeInjury',
    //         method: 'get'
    //       })
    
    // },
    // ageEveryInjury() {
    //     return request({
    //         url: '/eduservice/teacher/EveryAgeInjury',
    //         method: 'get'
    //       })
    
    // }

}