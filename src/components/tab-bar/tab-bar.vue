<script setup>
import tabbarData from "@/assets/data/tabbar.js"
import { getAssetURL } from "@/utils/load_assets"
import { ref, watch } from "vue"
import { useRoute } from "vue-router";
// import { useRouter } from "vue-router"

const currentIndex = ref(0)
const route = useRoute()
watch(route, (newRoute) => {
  const index = tabbarData.findIndex(item => item.path === newRoute.path)
  if (index === -1) return
  currentIndex.value = index
})
// const router = useRouter()
// const itemClick = (index, item) => {
//   currentIndex.value = index
//   router.push(item.path)
// }
</script>

<template>
  <div class="tab-bar">
    <!-- <template v-for="(item, index) in tabbarData">
      <div 
        class="tab-bar-item" 
        :class="{active: currentIndex === index}"
        @click="itemClick(index, item)"
      >
        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
        <img v-else :src="getAssetURL(item.imageActive)" alt="">
        <span class="text">{{item.text}}</span>
      </div>
    </template> -->
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <span>{{item.text}}</span>
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
            <img v-else :src="getAssetURL(item.imageActive)" alt="">
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<style lang="less" scoped>
  .tab-bar {
    img {
      height: 26px;
    }
    // 局部定义一个变量：只针对.tab-bar子元素才生效
    // --van-tabbar-item-icon-size: 30px;
    // 找到子组件的类，让子组件的类也可以生效
    // :deep(.van-tabbar-item__icon) {
    //   font-size: 50px;
    // }
  //   display: flex;
  //   position: fixed;
  //   bottom: 0;
  //   left: 0;
  //   right: 0;
  //   height: 50px;

  //   border-top: 1px solid #f3f3f3;
  // }
  // .tab-bar-item {
  //   flex: 1;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;

  //   &.active {
  //     color: var(--primary-color);
  //   }
    
  //   .text {
  //     font-size: 12px;
  //     margin-top: 2px;
  //   }
    
  //   img {
  //     width: 36px;
  //   }
  }
</style>
