<script setup>
import { useRoute, useRouter } from 'vue-router'
import { getDetailInfos } from "@/services"
import { computed, ref } from 'vue'

import TabControl from '@/components/tab-control/TabControl.vue'
import DetailSwipe from './cpns/DetailSwipe.vue'
import DetailInfos from './cpns/DetailInfos.vue'
import DetailFacility from './cpns/DetailFacility.vue'
import DetailLandlord from './cpns/DetailLandlord.vue'
import DetailComment from './cpns/DetailComment.vue'
import DetailNotice from './cpns/DetailNotice.vue'
import DetailMap from './cpns/DetailMap.vue'
import DetailIntro from './cpns/DetailIntro.vue'
import useScroll from '@/hooks/useScroll'

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

const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const ShowTabControl = computed(() => {
  return scrollTop.value >= 300
})

// const sectionEls = []
// const getSectionRef = (value) => {
//   sectionEls.push(value.$el)
// }
// const tabClick = (index) => {
//   let instance = sectionEls[index].offsetTop
//   if(index !== 0) {
//     instance = instance - 44
//   }
//   detailRef.value.scrollTo({
//     top: instance,
//     behavior: "smooth"
//   })
// }
const sectionEls = ref({})
const names = computed(() => Object.keys(sectionEls.value))
const getSectionRef = (value) => {
  const name = value.$el.getAttribute('name')
  sectionEls.value[name] = value.$el
}
const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let instance = el.offsetTop
  if(index !== 0) {
    instance = instance - 44
  }
  detailRef.value.scrollTo({
    top: instance,
    behavior: "smooth"
  })
}
</script>

<template>
  <div class="detail top-page" ref="detailRef">
    <TabControl
      v-if="ShowTabControl"
      class="tabs"
      :titles="names"
      @tabItemClick="tabClick"
    />
    <van-nav-bar
      title="房屋详情"
      left-text="返回旅途中..."
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <DetailSwipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <DetailInfos :ref="getSectionRef" :top-infos="mainPart.topModule"></DetailInfos>
      <DetailFacility :ref="getSectionRef" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
      <DetailLandlord :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule" />
      <DetailComment :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule" />
      <DetailNotice :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
      <DetailMap :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule" />
      <DetailIntro :price-intro="mainPart.introductionModule" />
    </div> -->
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <DetailSwipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <DetailInfos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule"></DetailInfos>
      <DetailFacility name="设施" :ref="getSectionRef" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
      <DetailLandlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule" />
      <DetailComment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule" />
      <DetailNotice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
      <DetailMap name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule" />
      <DetailIntro :price-intro="mainPart.introductionModule" />
    </div>

    <div class="footer">  
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">在路上吗...</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .tabs {
    position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0;
  }
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;

    img {
      width: 123px;
    }

    .text {
      margin-top: 12px;
      font-size: 12px;
      color: #7688a7;
    }
  }
</style>
