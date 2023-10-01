<script setup>
import HeaderBar from './components/HeaderBar.vue';
import FooterBar from './components/FooterBar.vue';
</script>

<template>
  <div class="w-full h-full bg-gray-800">
    <HeaderBar class="w-full h-12 bg-gray-800 border-b-2 border-green-600 fixed
		  left-0 top-0 flex items-center text-md z-10">
    </HeaderBar>
    <RouterView class="py-12" />
    <FooterBar class="w-full h-10 bg-gray-800 text-gray-300 border-t-2 border-green-600 fixed
      left-0 bottom-0 flex justify-center items-center text-md">
    </FooterBar>
  </div>
</template>

<style scoped></style>
