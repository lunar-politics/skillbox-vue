<!-- eslint-disable max-len -->
<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>
    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom"
      :price-to.sync="filterPriceTo" :category-id.sync="filterCategoryId"
      :color.sync="filterColor"/>
      <section class="catalog">
        <Preloader v-if="productsLoading" />
        <div v-if="productsLoadingFailed">Произошла ошибка призагрузке товаров <button @click.prevent="loadProducts">Попробовать еще раз</button> </div>
        <ProductList :products="products" />
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
       </section>
    </div>
  </main>
</template>z=

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import Preloader from '@/components/Preloader.vue';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default {
  // eslint-disable-next-line object-curly-newline
  components: { ProductList, BasePagination, ProductFilter, Preloader },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: 0,
      page: 1,
      productsPerPage: 3,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        // eslint-disable-next-line arrow-body-style
        ? this.productsData.items.map((product) => {
          return {
            ...product,
            image: product.image.file.url,
            colors: product.colors,
          };
        })
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      // eslint-disable-next-line no-return-assign
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorId: this.filterColor,
            },
          // eslint-disable-next-line no-return-assign
          })
          // eslint-disable-next-line no-return-assign
          .then((response) => this.productsData = response.data)
          // eslint-disable-next-line no-return-assign
          .catch(() => this.productsLoadingFailed = true)
          // eslint-disable-next-line no-return-assign
          .then(() => this.productsLoading = false);
      }, 2000);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
