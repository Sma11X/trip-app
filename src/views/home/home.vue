<script setup>
import HomeNavBar from '@/views/home/cpns/HomeNavBar.vue'
import HomeSearchBox from '@/views/home/cpns/HomeSearchBox.vue'
import useHomeStore from "@/stores/modules/home"
import HomeCategories from '@/views/home/cpns/HomeCategories.vue'
import HomeContent from '@/views/home/cpns/HomeContent.vue'
import { watch, ref } from 'vue'
import useScroll from '@/hooks/useScroll'
import { computed } from '@vue/reactivity'
import SearchBar from '@/components/search-bar/search-bar.vue'

const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouselistData()

const { isReachBottom, scrollTop } = useScroll()
// 执行其他代码
watch(isReachBottom, (newValue) => {
  if(newValue) {
    homeStore.fetchHouselistData().then(() => {
      isReachBottom.value = false
    })
  }
})

// 定义的可响应式数据依赖另外一个可响应式数据，使用计算属性
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 350
})
</script>

<template>
  <div class="home">
    <HomeNavBar></HomeNavBar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <HomeSearchBox></HomeSearchBox>
    <HomeCategories></HomeCategories>
    <div class="search-bar" v-if="isShowSearchBar">
      <SearchBar></SearchBar>
    </div>
    <HomeContent></HomeContent>
  </div>
</template>

<style lang="less" scoped>
  .home {
    padding-bottom: 60px;
  }
  .banner {
    img {
      width: 100%;
    }
  }

  .search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
  }
</style>
