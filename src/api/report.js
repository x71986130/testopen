import axios from 'axios'

export default {
  /**
   * 获取部门信息
   *
   * @returns 返回部门信息的Promise对象
   */
  /**
   * 获取所有部门信息
   *
   * @returns {Promise<any>} 返回包含部门信息的Promise对象
   */
  /**
   * 获取部门列表
   *
   * @returns Promise<AxiosResponse> 返回获取到的部门列表
   */
  /**
   * 获取部门列表
   *
   * @returns Promise 返回包含部门列表的Promise对象
   */
  /**
   * 获取部门列表
   *
   * @returns 返回一个Promise对象，resolve值为部门列表数据
   */
  getDepartments() {
    return axios.get('/api/departments')
  },
  /**
   * 通过POST请求获取任务列表
   *
   * @param {Object} params 请求参数对象
   * @returns {Promise<AxiosResponse>} 返回axios请求的结果
   */
  getTasks(params) {
    return axios.post('/api/tasks', params)
  },
  /**
   * 导出Excel文件
   *
   * @param {object} params - 请求参数
   * @returns {Promise<AxiosResponse>} - 返回一个Promise对象，包含导出的Excel文件内容
   */
  /**
   * 导出Excel文件
   *
   * @param {Object} params - 导出Excel所需的参数
   * @returns {Promise<AxiosResponse>} 返回包含Excel文件的Promise对象
   */
  exportExcel(params) {
    return axios.post('/api/export', params, {
      responseType: 'blob'
    })
  }
}