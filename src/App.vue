<script setup>
import { useRoute } from 'vue-router'
import TabBar from '@/components/tab-bar/tab-bar.vue'
import Loading from '@/components/loading/loading.vue'

const route = useRoute()
</script>

<template>
  <div class="app">
    <router-view></router-view>
    <TabBar v-if="!route.meta.hideTabBar"></TabBar>
    <Loading></Loading>
    <!-- <TabBar></TabBar> -->
  </div>
</template>

<style scoped>
</style>
