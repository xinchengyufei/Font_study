import axios from 'axios';

// 创建 Axios 实例
const instance = axios.create({
  baseURL: 'https://api.example.com', // 设置默认的基础 URL
  timeout: 10000, // 设置默认超时时间
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加 token 到 headers
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 根据错误码做一些事情，例如错误通知
    return Promise.reject(error);
  }
);

// 创建一个通用的 fetch 方法
async function fetch<T>(url: string, method: 'GET' | 'POST' = 'GET', data?: object, config?: object): Promise<T> {
  const response = await instance({ url, method, data, ...config });
  return method === "POST"? response.data.problemsetQuestionList : response;
}

export default fetch;