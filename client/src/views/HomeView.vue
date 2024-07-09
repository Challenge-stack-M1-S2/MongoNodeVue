<script setup>
import Card from "@/components/CardComponent.vue";
import banner from "../assets/banner2.png";
import SideMenu from "@/components/SideMenu.vue";
</script>

<template>
  <img class="w-full" :src="banner" alt="" />
  <div
    class="flex w-5/12 absolute top-28 right-0 justify-between"
    style="height: 340px"
  >
    <div
      class="border-4 bg-black border-white h-full w-5/12 flex items-center justify-center"
    >
      <div style="font-family: papyrus">
        <p class="text-6xl">Flash Art</p>
      </div>
    </div>
    <div
      class="border-t-4 border-b-4 bg-white text-black font-black border-black h-full w-1/4 flex items-center"
    >
      <div style="font-family: papyrus">
        <p class="text-bases">
          Flash Art est un site spécialisé dans les tatouages flash, offrant des
          créations uniques réalisées par des tatoueurs talentueux et
          indépendants. Découvrez une vaste collection de designs originaux et
          éphémères, prêts à être encrés par des artistes passionnés.
        </p>
      </div>
    </div>
    <div
      class="border-t-4 border-b-4 bg-white text-black font-black border-black h-full w-1/4 flex items-center"
    >
      <div style="font-family: papyrus">
        <p class="text-base">
          Chaque tatouage est une œuvre d'art, soigneusement conçue pour vous
          permettre d'exprimer votre style de manière unique et audacieuse.
          Rejoignez notre communauté et trouvez le tatouage parfait qui reflète
          votre personnalité et vos passions.
        </p>
      </div>
    </div>
  </div>
  <container class="w-full flex mx-auto">
    <SideMenu></SideMenu>
    <div
      class="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto"
    >
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </div>
  </container>
</template>
