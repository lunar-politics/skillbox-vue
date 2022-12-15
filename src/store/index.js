/* eslint-disable max-len */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    productsLoading: false,
    orderInfo: null,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((id) => id.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProducts(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      // eslint-disable-next-line arrow-body-style
      state.cartProducts = state.cartProductsData.map((item) => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        };
      });
    },
    toggleLoading(state) {
      state.productsLoading = !state.productsLoading;
    },
  },
  getters: {
    cartDetailProducts(state) {
      // eslint-disable-next-line arrow-body-style
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((p) => p.product.id === item.productId);
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios
        // eslint-disable-next-line no-undef
        .get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateOrderInfo', response.data);
        });
    },
    loadCart(context) {
      context.commit('toggleLoading');
      clearTimeout(this.loadCartTimer);
      // eslint-disable-next-line arrow-body-style
      this.loadCartTimer = setTimeout(() => {
        return axios
          // eslint-disable-next-line no-undef
          .get(`${API_BASE_URL}/api/baskets`, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          .then((response) => {
            if (!context.state.userAccessKey) {
              context.commit('updateUserAccessKey', response.data.user.accessKey);
              localStorage.setItem('userAccessKey', response.data.user.accessKey);
            }
            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts');
          })
          // eslint-disable-next-line no-return-assign
          .finally(() => {
            context.commit('toggleLoading');
          });
      }, 2000);
    },
    addProductToCart(context, { productId, amount }) {
      context.commit('toggleLoading');
      return (new Promise((resolve) => setTimeout(resolve, 2000)))
        // eslint-disable-next-line arrow-body-style
        .then(() => {
          return axios
            .post(`${API_BASE_URL}/api/baskets/products`, {
              productId,
              quantity: amount,
            }, {
              params: {
                userAccessKey: context.state.userAccessKey,
              },
            }).then((response) => {
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
              context.commit('toggleLoading');
            });
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('toggleLoading');
      context.commit('updateCartProductAmount', { productId, amount });
      if (amount < 1) {
        context.commit('toggleLoading');
        return;
      }
      // eslint-disable-next-line consistent-return
      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        }).then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('toggleLoading');
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteProduct(context, { productId }) {
      context.commit('toggleLoading');
      return axios
        .delete(`${API_BASE_URL}/api/baskets/products`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
          data: {
            productId,
          },
        }).then((response) => {
          context.commit('deleteCartProducts', response.data.items);
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
          context.commit('toggleLoading');
        });
    },
  },
});
