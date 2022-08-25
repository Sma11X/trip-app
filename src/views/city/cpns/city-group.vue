<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import useCityStore from "@/stores/modules/city";

const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})
//动态的索引
const indexList = computed(() => {
  let list = props.groupData.cities.map(item => item.group)
  list.unshift('#')
  return list
})
const router = useRouter()
const cityStore = useCityStore()
//监听城市的点击
const cityClick = (city) => {
  // 选中当前城市
  cityStore.currentCity = city
  // 返回上一级
  router.back()
}
</script>

<template>
  <div class="city-group">
    <van-index-bar :sticky="false" :index-list="indexList" highlight-color="#ff9854">
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(city, index) in groupData.hotCities" @click="cityClick(city)">
          <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
        </template>
      </div>
      <template v-for="(group, index) in groupData.cities" :key="index">
        <van-index-anchor :index="group.group"/>
          <template v-for="(city, idx) in group.cities" :key="idx">
            <van-cell :title="city.cityName" @click="cityClick(city)" />
          </template>
      </template>
    </van-index-bar>
  </div>
</template>

<style lang="less" scoped>
 .list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  padding-right: 25px;
  .city {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    margin: 6px 0;
  }
 }
</style>
