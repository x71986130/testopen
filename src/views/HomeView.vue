<template>
    <div class="home-container">
      <el-card class="box-card">
        <h2>项目数据统计系统</h2>
        <el-button 
          type="primary" 
          @click="$router.push('/report')"
          class="enter-btn">
          进入报表系统
        </el-button>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  </script>
  
  <style scoped>
  .home-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f0f2f5;
  }
  
  .box-card {
    width: 400px;
    text-align: center;
    padding: 30px;
  }
  
  .enter-btn {
    margin-top: 30px;
    width: 200px;
  }
  </style>