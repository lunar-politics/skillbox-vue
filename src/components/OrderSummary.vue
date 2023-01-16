<!-- eslint-disable max-len -->
<template>
  <div>
    <div class="cart__block">
      <ul class="cart__orders">
        <OrderItem v-for="item in products" :key="item.productId" :item="item" />
      </ul>
      <div class="cart__total">
        <p>Доставка: <b>500 ₽</b></p>
        <p>Итого: <b>{{ products.length }}</b> товара на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
      </div>

      <button class="cart__button button button--primery" type="submit">
        Оформить заказ
      </button>
    </div>
    <div class="cart__error form__error-block" v-if="formErrorMessage">
      <h4>Заявка не отправлена!</h4>
      <p>
        {{ formErrorMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import OrderItem from '@/components/OrderItem.vue';

export default {
  filters: { numberFormat },
  components: {
    OrderItem,
  },
  props: ['formErrorMessage', 'products'],
  // data() {
  //   return {
  //     formErrorMessage: '',
  //   };
  // },
  computed: {
    ...mapGetters({ totalPrice: 'cartTotalPrice' }),
    // formErrorMessage() {
    //   return this.$store.state.orderInfo.error.response.data.error.message;
    // },
  },
};
</script>
