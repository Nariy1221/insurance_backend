import request from '@/utils/request'
export default {
    //1 讲师列表（条件查询分页）
    //current当前页 limit每页记录数 teacherQuery条件对象
    getUserListPage(current,limit,teacherQuery) {
        return request({
            //url: '/eduservice/teacher/pageTeacherConditionpageTeacherCondition/{current}/{limit}/'+current+"/"+limit,
            url: `/eduservice/ucenter-member/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据
            //data表示把对象转换json进行传递到接口里面
            data: teacherQuery
          })
    },
    deleteUserList(uid){
      return request({
        url: '/rest/users/delete-user',
        method: 'delete',
        params:{
          uid
        }
      })
    },
    updateUser(data){
      return request({
        url: '/rest/users/update-user',
        method: 'post',
        data:data
      })
    },
    getUserrList(offset,limit){
        return request({
          url: '/rest/users/find-users',
          method: 'get',
          params:{
            offset,limit
          }
        })
      },
    //删除讲师
    deleteTeacherId(id) {
        return request({
            url: `/eduservice/teacher/${id}`,
            method: 'delete'
          })
    },
    //添加讲师
    addTeacher(teacher) {
        return request({
            url: `/eduservice/teacher/addTeacher`,
            method: 'post',
            data: teacher
          })
    },
    //根据id查询讲师
    getTeacherInfo(id) {
        return request({
            url: `/eduservice/ucenter-member/getUser/${id}`,
            method: 'get'
          })
    },
    //修改讲师
    updateTeacherInfo(teacher) {
        return request({
            url: `/eduservice/ucenter-member/updateUser`,
            method: 'post',
            data: teacher
          })
    }
}
