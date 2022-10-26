<template>
          <li class="catalog__item">
            <a class="catalog__pic" href="#"
            @click.prevent="$emit('gotoPage', 'product', {id: product.id})">
              <img :src="image" :alt="title">
            </a>

            <h3 class="catalog__title">
              <a href="#">
               {{ title }}
              </a>
            </h3>

            <span class="catalog__price">
             {{ price }} ₽
            </span>

            <ul class="colors colors--black">
              <li class="colors__item" v-for="color in colorsId" :key="color.index">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" :value="color">
                  <span class="colors__value"
                  :style="`background-color: ${getColors(color)}`">
                  </span>
                </label>
              </li>
            </ul>
          </li>
</template>

<script>
import colors from '../data/colors';

export default {
  props: ['title', 'price', 'image', 'colorsId'],
  computed: {
    colors() {
      return colors;
    },
  },
  methods: {
    getColors(color) {
      return colors.find((item) => item.id === color).hex;
    },
  },
};
</script>
