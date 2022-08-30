<script setup>
  import DetailSection from '@/components/detail-section/DetailSection.vue'

  defineProps({
    houseFacility: {
      type: Object,
      default: () => ({})
    }
  })
</script>

<template>
  <div class="facility">
    <DetailSection
      title="房屋设施"
      more-text="查看全部设施"
    >
    <div class="inner">
      <template v-for="(itemA, indexA) in houseFacility.houseFacilitys" :key="indexA">
        <div class="itemA" v-if="houseFacility.facilitySort?.includes(indexA)">
          <div class="head">
            <img :src="itemA.icon" alt="">
            <div class="text">{{ itemA.groupName }}</div>
          </div>
          <div class="list">
            <template v-for="(itemB, indexB) in itemA.facilitys.slice(0, 4)" :key="indexB">
              <div class="itemB">
                <i class="icon-check icon"></i>
                <span>{{ itemB.name }}</span>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
    </DetailSection>
  </div>
</template>

<style lang="less" scoped>
  .inner {
    padding: 5px 0;
    border-radius: 6px;
    font-size: 12px;
    background-color: #f7f9fb;

    .itemA {
      display: flex;
      margin: 25px 0;

      .head {
        width: 90px;
        text-align: center;

        img {
          width: 20px;
          height: 20px;
        }

        .text {
          margin-top: 5px;
          color: #000;
        }
      }

      .list {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .itemB {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          width: 50%;
          margin: 4px 0;

          .icon {
            margin: 0 6px;
          }

          .text {
            color: #333;
          }
        }
      }
    }
  }
</style>
