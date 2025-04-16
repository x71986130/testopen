<template>
    <div class="report-container">
      <!-- 查询条件 -->
      <div class="filter-area">
        <el-form :inline="true">
          <el-form-item label="日期范围">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              value-format="YYYY-MM-DD"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"/>
          </el-form-item>
          
          <el-form-item label="选择部门">
            <el-select 
              v-model="selectedDept" 
              placeholder="请选择部门"
              filterable
              clearable>
              <el-option
                v-for="dept in departments"
                :key="dept.id"
                :label="dept.name"
                :value="dept.id"/>
            </el-select>
          </el-form-item>
  
          <el-button 
            type="primary" 
            @click="handleSearch"
            :loading="loading">
            查询
          </el-button>
        </el-form>
      </div>
  
      <!-- 数据表格 -->
      <el-table 
        :data="taskList" 
        border 
        stripe
        highlight-current-row
        style="width: 100%">
        <el-table-column prop="任务名称" label="任务名称" width="180"/>
        <el-table-column prop="状态" label="状态" width="100"/>
        <el-table-column prop="创建者" label="创建人"/>
        <el-table-column prop="所属项目" label="项目"/>
        <el-table-column prop="指派人" label="指派人"/>
        <el-table-column prop="截止日期" label="截止日期"/>
        <el-table-column prop="预计工时" label="预计(h)"/>
        <el-table-column prop="消耗工时" label="已耗(h)"/>
        <el-table-column prop="剩余工时" label="剩余(h)"/>
      </el-table>
  
      <!-- 导出按钮 -->
      <div class="export-wrapper">
        <el-button 
          type="success" 
          @click="handleExport"
          :disabled="taskList.length === 0">
          导出Excel
        </el-button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import reportApi from '@/api/report'
  import { ElMessage } from 'element-plus'
  
  // 响应式数据
  const dateRange = ref([])
  const selectedDept = ref(null)
  const departments = ref([])
  const taskList = ref([])
  const loading = ref(false)
  
  // 生命周期钩子
  onMounted(async () => {
    try {
      const { data } = await reportApi.getDepartments()
      departments.value = data
    } catch (error) {
      ElMessage.error('部门信息获取失败')
    }
  })
  
  // 查询处理
  const handleSearch = async () => {
    if (!validateParams()) return
    
    loading.value = true
    try {
      const params = {
        start_date: dateRange.value[0],
        end_date: dateRange.value[1],
        dept_id: selectedDept.value
      }
      
      const { data } = await reportApi.getTasks(params)
      taskList.value = data
    } catch (error) {
      ElMessage.error('数据获取失败')
    } finally {
      loading.value = false
    }
  }
  
  // 导出处理
  const handleExport = async () => {
    try {
      const params = {
        start_date: dateRange.value[0],
        end_date: dateRange.value[1],
        dept_id: selectedDept.value
      }
      
      const res = await reportApi.exportExcel(params)
      const blob = new Blob([res.data])
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = '任务报表.xlsx'
      link.click()
    } catch (error) {
      ElMessage.error('导出失败')
    }
  }
  
  // 参数校验
  const validateParams = () => {
    if (!dateRange.value?.length) {
      ElMessage.warning('请选择日期范围')
      return false
    }
    if (!selectedDept.value) {
      ElMessage.warning('请选择部门')
      return false
    }
    return true
  }
  </script>
  
  <style scoped>
  .report-container {
    padding: 20px;
    background: #fff;
  }
  
  .filter-area {
    margin-bottom: 20px;
  }
  
  .export-wrapper {
    margin-top: 20px;
    text-align: right;
  }
  
  .el-form--inline .el-form-item {
    margin-right: 30px;
  }
  </style>