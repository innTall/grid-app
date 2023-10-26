<script setup>
import HeaderBar from './components/HeaderBar.vue';
import FooterBar from './components/FooterBar.vue';
</script>

<template>
  <HeaderBar class="" />
  <RouterView class="flex flex-grow flex-col" />
  <!--main class=""></main-->
  <FooterBar class="" />
</template>

<style scoped></style>
