<template>
  <ul class="catalog__list">
    <ProductItem v-for="product in products" :key="product.id"
    :title="product.title" :price="product.price" :image="product.image"
    :colorsId="product.colorIds"/>
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  props: ['products'],
};
</script>
