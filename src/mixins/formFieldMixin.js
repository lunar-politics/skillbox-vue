import BaseFormField from '@/components/BaseFormField.vue';

export default {
  props: ['title', 'error', 'placeholder', 'value'],
  components: { BaseFormField },
  computed: {
    dataValue: {
      // eslint-disable-next-line vue/return-in-computed-property
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
