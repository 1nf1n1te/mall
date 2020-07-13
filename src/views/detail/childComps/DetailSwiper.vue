<template>
  <div class="detail-swiper">
    <!-- 下面这里最好不要取名为swiper 关键词容易出错 -->
    <swiper class="swipers">
      <swiper-item v-for="item in topImages" :key="item.index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name:'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
     
    }
  },
};
</script>
 
<style scoped>
  .swipers {
    height: 300px;
    overflow: hidden;
  }
</style>