<script setup>
import { useRoute, useRouter } from 'vue-router'
import { getDetailInfos } from "@/services"
import { computed, ref } from 'vue'
import DetailSwipe from './cpns/DetailSwipe.vue'

const route = useRoute()
const router = useRouter()
const houseId = route.params.id

const onClickLeft = () => {
  router.back()
}

const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(houseId).then(res => {
  detailInfos.value = res.data
})
</script>

<template>
  <div class="detail top-page">
    <van-nav-bar
      title="房屋详情"
      left-text="返回旅途中..."
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="main" v-if="mainPart">
      <DetailSwipe :swipe-data="mainPart.topModule.housePicture.housePics" />
    </div>
  </div>
</template>

<style lang="less" scoped>
</style>
