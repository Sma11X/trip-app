<script setup>
import HomeNavBar from './cpns/home-nav-bar.vue'
import HomeSearchBox from './cpns/home-search-box.vue'
import useHomeStore from "@/stores/modules/home"

const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
// homeStore.fetchCategoriesData()
// homeStore.fetchHouselistData()
</script>

<template>
  <div class="home">
    <HomeNavBar></HomeNavBar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <HomeSearchBox></HomeSearchBox>
  </div>
</template>

<style lang="less" scoped>
  .banner {
    img {
      width: 100%;
    }
  }
</style>
