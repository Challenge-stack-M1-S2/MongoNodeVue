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
      <Card
        v-for="(card, index) in cards"
        :key="index"
        :titre="card.titre"
        :image-src="card.imageSrc"
        :localisation="card.localisation"
        :nom-artiste="card.nomArtiste"
        :tags="card.tags"
      />
    </div>
  </container>
</template>

<script>
export default {
  components: {
    Card,
    SideMenu,
  },
  data() {
    return {
      cards: [
        {
          titre: "Card 1",
          imageSrc:
            "https://static.wixstatic.com/media/a9b2c0_e3e34e56200b4744a9d823657228f8ec~mv2.jpg/v1/fill/w_560,h_560,al_c,q_90,enc_auto/Flash_One_Piece_04.jpg",
          localisation: "Paris",
          nomArtiste: "John Doe",
          tags: ["Floral", "Geometric", "Traditional"],
        },
        {
          titre: "Card 2",
          imageSrc:
            "https://static.wixstatic.com/media/a9b2c0_f211e9e8a6cd4925bfa3d1817cf97da6~mv2.jpg/v1/fill/w_280,h_280,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Flash_One_Piece_02.jpg",
          localisation: "Lyon",
          nomArtiste: "Jane Smith",
          tags: ["Portrait", "Watercolor"],
        },
      ],
    };
  },
};
</script>
