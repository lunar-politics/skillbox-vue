<template>
  <ul class="catalog__list">
    <ProductItem v-for="(product, index) in products" :key="index"
    :title="product.title" :price="product.price" :image="product.image"/>
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  props: ['products'],
  // data() {
  //   return {
  //     product,
  //   };
  // },
};
</script>
