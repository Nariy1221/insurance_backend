import request from '@/utils/request'

export default {
  getOrderList(offset,limit){
    return request({
      url: '/rest/orders/find-orders',
      method: 'get',
      params:{
        offset,limit
      }
    })
  },
  deleteOrderList(uid,mid){
    return request({
      url: '/rest/orders/delete-order',
      method: 'delete',
      params:{
        uid,mid
      },
      headers:{
        // 'X-HTTP-Method-Override' : 'DELETE' //同时将method替换为 post
        'Access-Control-Allow-Origin': '*'
      }
    })
  },
  getOrderById(uid){
    return request({
      url: '/rest/orders/find-order',
      method: 'get',
      params:{
        uid
      }
    })
  },


    //生成订单
  createOrders(courseId) {
    return request({
      url: '/eduorder/order/createOrder/'+courseId,
      method: 'post'
    })
  },
  //根据订单id查询订单信息
  getOrdersInfo(id) {
    return request({
      url: '/eduorder/order/getOrderInfo/'+id,
      method: 'get'
    })
  },
  //生成二维码的方法
  createNatvie(orderNo) {
    return request({
      url: '/eduorder/paylog/createNative/'+orderNo,
      method: 'get'
    })
  },

  //查询订单状态的方法
  //生成二维码的方法
  queryPayStatus(orderNo) {
    return request({
      url: '/eduorder/paylog/queryPayStatus/'+orderNo,
      method: 'get'
    })
  }
}