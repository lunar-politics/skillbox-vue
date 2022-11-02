<template>
  <ul class="catalog__list">
    <ProductItem v-for="product in products" :key="product.id" :product="product"
    :colors="product.colors" />
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  props: ['products'],
};
</script>
