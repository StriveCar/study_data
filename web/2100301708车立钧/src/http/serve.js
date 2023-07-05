import axios from "axios";

let instance = axios.create({
    baseURL:'/api',
    timeout:1000
})

//  响应拦截器
instance.interceptors.response.use(    
    response => {   
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        if (response.status === 200) {            
            return Promise.resolve(response);        
        } else {            
            return Promise.reject(response);        
        }    
    },    
);

instance.interceptors.request.use(function (config) {
    return config
},function (error) {
    return Promise.reject(error); 
})

export function httpConfig(url,data){   
    return new Promise((resolve, reject) =>{        
        instance.get(url,{
            params:data
        })  
        .then(res => {            
            resolve(res);        
        })        
        .catch(err => {            
            reject(err)        
        })  
})
}