import request from '@/utils/request'
export default {
    //1 生成统计数据
    //2 获取统计数据
    ageEveryUserAge(insurance) {
        return request({
            url: '/eduservice/teacher/EveryUserAge',
            method: 'post',
            data: {
                insurance
            },
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
    },
    genderEveryUserGender(insurance) {
        return request({
            url: '/eduservice/teacher/EveryUserGender',
            method: 'post',
            data: {
                insurance
            },
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })

    },

    avatarEveryUserAvatar(insurance) {
        return request({
            url: '/eduservice/teacher/EveryUserAvatar',
            method: 'post',
            data: {
                insurance
            },
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })

    },
    injuryEveryUserInjury(insurance) {
        return request({
            url: '/eduservice/teacher/EveryUserInjury',
            method: 'post',
            data: {
                insurance
            },
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })

    }
}