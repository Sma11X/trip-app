<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const searchValue = ref("")
const cancelClick = () => {
  router.back()
}

const tabActive = ref()
</script>

<template>
  <div class="top-page">
    <van-search
      v-model="searchValue"
      placeholder="城市/区域/位置"
      shape="round"
      show-action
      @cancel="cancelClick"
    />
    <van-tabs v-model:active="tabActive" color="#ff9854">
      <van-tab title="国内·港澳台"></van-tab>
      <van-tab title="海外"></van-tab>
    </van-tabs>
  </div>
</template>

<style lang="less" scoped>

</style>
