import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url: '/pmsVote/listPage',
    method:'GET',
    params:params
  })
}
export function createVote(data) {
  return request({
    url:'/pmsVote/create',
    method:'POST',
    data:data
  })
}

export function deleteVote(id) {
  return request({
    url:'/pmsVote/delete/'+id,
    method:'DELETE',
  })
}

export function getVote(id) {
  return request({
    url:'/pmsVote/view/'+id,
    method:'GET',
  })
}

export function updateVote(id,data) {
  return request({
    url:'/pmsVote/update/'+id,
    method:'PUT',
    data:data
  })
}
export function verify(data) {
  return request({
    url:'/pmsVote/verify/',
    method:'PUT',
    data:data
  })
}

