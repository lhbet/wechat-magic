<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";

const route = useRoute();

const profileImage = ref('./profile.jpg');
const userName = ref('林北北');
const location = ref('四川 达州');
const signature = ref("从前车马很慢，书信很远，一生只够爱一个人")
const imageUrl = route.query.imageUrl as string
const showImageValue = ref(false)
const imageRef = ref<HTMLImageElement>()

const showImage = () => {
  imageRef.value!.style.scale = "0.2"
  showImageValue.value = true
}
let isDragging = false;
let offsetX: number;
let offsetY: number;
onMounted(() => {
  const end = () => {
    isDragging = false
    document.body.style.userSelect = ""
  }

  imageRef.value!.addEventListener("touchstart",(e: TouchEvent) => {
    isDragging = true
    const touch = e.touches[0]
    offsetX = touch.clientX - imageRef.value!.offsetLeft
    offsetY = touch.clientY - imageRef.value!.offsetTop
    document.body.style.userSelect = "none"
  })
  // const innerWidth = window.innerWidth
  document.addEventListener("touchmove", (e) => {
    if (isDragging) {
      e.preventDefault()
      const touch = e.touches[0]
      let x = touch.clientX - offsetX
      let y = touch.clientY - offsetY

      const sizeOfBody = document.body.offsetHeight - y
      if (sizeOfBody<200){
        end()
        showImageValue.value = false;
        imageRef.value!.style.left = `50%`
        imageRef.value!.style.top = `20%`
        return
      }
      // const domRect = imageRef.value!.getBoundingClientRect();
      // const maxLeft = innerWidth - domRect.width
      // if (domRect.left > maxLeft) {
      //   x = maxLeft
      // }

      imageRef.value!.style.left = `${x}px`
      imageRef.value!.style.top = `${y}px`
    }
  })
  document.addEventListener("touchend", end)
})
const onImageClick = () => {
  const scale = Number(imageRef.value!.style.scale)
  if (scale>=1)return;
  imageRef.value!.style.scale = `${scale +0.2}`
}
</script>

<template>
  <div style="background-color: #ededed;height: 100%;width: 100vw;">
    <div style="background-color: white">
      <div style="width: 90%; margin: 0 auto;">
        <div style="display: flex;align-items: center;margin: 20px 0 0">
          <img class="profile-image" :src="profileImage" alt="profile" />
          <div class="user-info">
            <p class="user-name">{{ userName }}</p>
            <p class="user-location">地区: {{ location }}</p>
          </div>
        </div>
        <div style="width: 100%;height: 1px;background-color: #efefef;margin: 20px 0;"></div>
        <div style="display: flex;align-items: center;padding: 15px 0">
          <div style="font-size: .9rem;width: 8ch;">朋友资料</div>
          <div style="color: #bcbcbc;flex: 1;text-align: right">&gt;</div>
        </div>
        <div style="display: flex;align-items: center;padding: 15px 0">
          <div style="font-size: .9rem;width: 8ch;">签名</div>
          <div style="color: #bcbcbc;font-size: .8rem;flex: 1;cursor: pointer" >{{signature}}</div>
        </div>
        <div style="display: flex;align-items: center;padding: 15px 0">
          <div style="font-size: .9rem;width: 8ch;">来源</div>
          <div style="color: #bcbcbc;font-size: .8rem;flex: 1">来自扫一扫</div>
        </div>
      </div>
    </div>

    <div style="background-color: white; margin-top: 10px; text-align: center;padding: 12px 0;">
      <div style="font-size: 1rem;font-weight: bold;color: #596793" @click="showImage">添加到通讯录</div>
    </div>
  </div>

  <img ref="imageRef" :src="imageUrl" alt="" v-show="showImageValue" @click="onImageClick" style="width: 80%;position: absolute;top: 20%;left: 50%;transform: translateX(-50%);transition: scale 0.5s;">

</template>

<style scoped lang="scss">
.profile-image {
  width: 4rem; /* 4rem = 64px */
  height: 4rem;
  border-radius: .3rem;
  margin-right: 1rem;
}
.user-info {
  .user-name {
    font-size: 1.125rem; /* 1.125rem = 18px */
    font-weight: bold;
  }

  p{
    margin: 5px;
  }
}
</style>