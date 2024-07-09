<template>
  <b-card
    title="Card Title"
    img-src="https://static.wixstatic.com/media/a9b2c0_e6971c0b02184a30bfab14ee7cfb84bf~mv2.jpg/v1/fill/w_560,h_560,al_c,q_90,enc_auto/Flash_One_Piece_01.jpg"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem"
    class="mb-2"
  >
    <div class="w-4/5 mx-auto mb-4">
      <div class="flex items-center justify-left py-1">
        <img src="https://cdn-icons-png.flaticon.com/512/674/674292.png" />
        <b-card-text class="px-4">12 février 2023</b-card-text>
      </div>
      <div class="flex items-center justify-left py-1">
        <img src="https://cdn-icons-png.flaticon.com/512/12308/12308225.png" />
        <b-card-text class="px-4">Mateo69</b-card-text>
      </div>
    </div>
    <div class="mb-3 flex flex-wrap">
      <span class="tag">One Piece</span>
      <span class="tag">Animé</span>
    </div>
    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
</template>

<style scoped>
img {
  height: 30px;
}

.tag {
  display: inline-block;
  background-color: #8b5a2b;
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 9999px;
  font-size: 14px;
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
