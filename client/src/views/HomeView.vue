<script setup>
import Card from "@/components/CardComponent.vue";
import banner from "../assets/banner.png";
</script>

<template>
  <img class="w-full" :src="banner" alt="" />
  <div class="flex bg-black h-80 w-1/2">
    <div></div>
    <div></div>
    <div></div>
  </div>
  <container class="w-4/5 grid mx-auto">
    <Card></Card>
  </container>
</template>
