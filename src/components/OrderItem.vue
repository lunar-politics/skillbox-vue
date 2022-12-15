<template>
  <li class="cart__order">
    <h3> {{ item.product.title }} </h3>
    <b>{{ (item.amount * item.product.price) | numberFormat }} &#8381;</b>
    <span>Артикул: {{ item.product.id }}</span>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  filters: { numberFormat },
  props: ['item'],
};
</script>
