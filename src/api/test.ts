import request from "@/utils/request";

export function test1() {
    const _promise = request.get('/test')
    console.log('_promise', _promise);
    _promise.then(response => {
        console.log('test1', response);
    }).catch(error => {
        console.log('test1=error', error);
        
    })
}

export function test2() {
    return request({
        url: '/test',
        method: 'get'
    })
}

export function getList() {
    return request({
        url: '/test',
        method: 'get'
    })
}