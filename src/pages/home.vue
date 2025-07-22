<template>
  <div class="profile-card">
    <div style="flex: 1;display: flex;align-items: center;width: 100%">
      <div style="width: 100%;">
        <div class="header">
          <img class="profile-image" :src="profileImage" alt="profile" />
          <div class="user-info">
            <p class="user-name">{{ userName }}</p>
            <p class="user-location">{{ location }}</p>
          </div>
        </div>

        <!-- QR code section -->
        <div class="qr-code" ref="qrCodeBoxRef">
          <div id="qrCode">

          </div>

          <div style="font-size: .7rem;color: #b1b1b1;text-align: center;margin-top: 20px;">扫一扫上面的二维码图案，加我为朋友。</div>
        </div>
      </div>
    </div>


    <div class="footer">
      <button class="action-btn">扫码</button>
      <span>|</span>
      <button class="action-btn">换个样式</button>
      <span>|</span>
<!--      上传图片-->
      <el-upload :http-request="uploadImage" :show-file-list="false" action="#" class="upload" ref="uploadRef">
        <el-button class="action-btn">保存图片</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import type {UploadInstance, UploadRequestOptions} from "element-plus";
import {ElUpload, ElButton} from "element-plus";
import QRCodeStyling from "qr-code-styling";
import axios from "axios";
import {useRouter} from "vue-router";

const router = useRouter();
const profileImage = ref('./lh/profile.jpg');
const userName = ref('林北北');
const location = ref('四川 达州');
const uploadRef = ref<UploadInstance>()


const qrCodeBoxRef = ref<HTMLDivElement>()
let qrCodeStyling: QRCodeStyling;
/**
 * 1 上传图片
 * 2 将返回的url做成二维码
 * */
const uploadImageUrl = "https://tmpfiles.org"
const uploadImage = async (option: UploadRequestOptions) => {
  const formData = new FormData();
  formData.append("file",option.file)
  const data = await axios.post(uploadImageUrl + "/api/v1/upload", formData);
  const webSiteUrl = data.data.data.url as string
  const imageUrl = webSiteUrl.replace(uploadImageUrl.replace("https","http"), uploadImageUrl + "/dl")
  const path = router.resolve({
    name: "info",
    query: {
      imageUrl
    }
  }).fullPath.replace('/','');
  qrCodeStyling.update({
    data: window.location.href + path,
  })
  uploadRef.value?.clearFiles()
}

onMounted(() => {
  const size = qrCodeBoxRef.value!.getBoundingClientRect().width
  qrCodeStyling = new QRCodeStyling({
    width: size,
    height: size,
    type: "svg",
    data: "哈哈",
    image: "./lh/wechatLogo.png",
    dotsOptions: {
      type: "rounded",
    },
    imageOptions: {
      imageSize: 0.4,
      margin: 5
    },
    qrOptions: {
      typeNumber: 10,
    }
  });
  qrCodeStyling.append(document.getElementById("qrCode") as HTMLDivElement);
})
</script>

<style scoped lang="scss">

.profile-card {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
}

.header {
  display: flex;
  align-items: center;
}

.profile-image {
  width: 4rem; /* 4rem = 64px */
  height: 4rem;
  border-radius: .3rem;
  margin-right: 1rem;
}

.user-info {
  p{
    margin: 5px;
  }
}

.user-name {
  font-size: 1.125rem; /* 1.125rem = 18px */
  font-weight: 600;
}

.user-location {
  font-size: 0.875rem; /* 0.875rem = 14px */
  color: #888;
}

.qr-code {
  margin: 2rem 0;
  .qr-image {
    display: block;
    width: 100%;
    aspect-ratio: 1/1;
  }
}



.footer {
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 3rem;
  width: 90%;
  span{
    font-size: .7rem;
    font-weight: lighter;
    color: #a5a5a5;
  }
}

.action-btn {
  background-color: transparent;
  padding: 0.5rem 1rem;
  color: #5d6b92;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.upload{
  :deep(.el-upload){
    .el-upload__input {
      display: none;
    }
  }

}

</style>
