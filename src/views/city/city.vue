<script setup>
import { computed } from '@vue/reactivity'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city'

import CityGroup from './cpns/CityGroup.vue'

const router = useRouter()

const searchValue = ref("")
const cancelClick = () => {
  router.back()
}

const tabActive = ref()

// store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

// 目的是为了获取其中一组数据并展示
// 1.获取正确的key
// 2.根据key获取数据，但是这个数据不是响应式的，需要用computed进行包裹
const currentGroup = computed(() => allCities.value[tabActive.value])
// console.log(cityStore)

</script>

<template>
  <div class="city top-page">
    <div class="top">
      <van-search
        v-model="searchValue"
        placeholder="城市/区域/位置"
        shape="round"
        show-action
        @cancel="cancelClick"
      />
      <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value, key, index) in allCities">
        <CityGroup v-show="tabActive === key" :group-data="value" />
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .city {
    --van-tab-line-height: 30px;
    // top固定定位
    // .top {
    //   position: fixed;
    //   top: 0;
    //   left: 0;
    //   right: 0;
    // }
    // .content {
    //   padding-top: 98px;
    // }
    // 局部滚动
    .content {
      height: calc(100vh - 98px);
      overflow-y: auto;
    }
  }
</style>
