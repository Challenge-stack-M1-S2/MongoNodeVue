<script setup>
import Card from "@/components/CardComponent.vue";
import banner from "../assets/banner2.png";
</script>

<template>
  <img class="w-full" :src="banner" alt="" />
  <div class="flex h-80 w-1/2 absolute top-28 right-0 justify-between">
    <div
      class="border-t-4 border-b-4 border-l-4 border-white h-full w-5/12"
    ></div>
    <div class="border-t-4 border-b-4 border-white h-full w-1/5"></div>
    <div class="border-t-4 border-b-4 border-white h-full w-1/5"></div>
  </div>
  <container class="w-4/5 grid mx-auto pt-4">
    <Card></Card>
  </container>
</template>
