<script setup>
import OrderForm from '../components/OrderForm.vue';
import OrderList from '../components/OrderList.vue';
//import MyModal from '../components/UI/MyModal.vue';
import { ref, reactive } from 'vue';
const symbol = ref('');
const price = ref('');
const modalVisible = ref(false);
const orders = ref([]);
function addOrder(order) {
  orders.value.push(order);
  modalVisible.value = false;
}
function removeOrder(order) {
  orders.value = orders.value.filter(p => p.id !== order.id)
}
function showModal() {
  modalVisible.value = true;
}
async function fetchTickers() {
  try {
    const uri = 'https://api.binance.com/api/v3/ticker/price';
    const response = await fetch(uri);
    const data = await response.json();
    function sortArray(x, y) {
      return x.symbol.localeCompare(y.symbol);
    }
    let list = data.sort(sortArray);
    orders.value = reactive(list);
    console.log(orders);
  } catch (error) {
    console.log("Fetch error: ", error);
  }
}
fetchTickers().then((data) => {
  data;
})
</script>

<template>
  <div class="w-full h-screen bg-gray-900 text-white">
    <h4 class="font-bold text-green-600">
      Order page
    </h4>
    <button @click="showModal" class="bg-gray-600 border-2 border-green-600 rounded-lg p-1 mr-5">Create order</button>
    <MyModal v-model:show="modalVisible" class="flex margin-auto mx-auto">
      <OrderForm @add="addOrder" />
    </MyModal>
    <OrderList :orders="orders" @remove="removeOrder()" />
  </div>
</template>

<style scoped></style>