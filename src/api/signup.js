import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url: '/pmsSignup/listPage',
    method:'GET',
    params:params
  })
}
export function createSignup(data) {
  return request({
    url:'/pmsSignup/create',
    method:'POST',
    data:data
  })
}

export function deleteSignup(id) {
  return request({
    url:'/pmsSignup/delete/'+id,
    method:'DELETE',
  })
}

export function getSignup(id) {
  return request({
    url:'/pmsSignup/view/'+id,
    method:'GET',
  })
}

export function updateSignup(id,data) {
  return request({
    url:'/pmsSignup/update/'+id,
    method:'PUT',
    data:data
  })
}
export function verify(data) {
  return request({
    url:'/pmsSignup/verify/',
    method:'PUT',
    data:data
  })
}

