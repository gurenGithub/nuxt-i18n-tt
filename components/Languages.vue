<template>
  <div class="Languages">
    <nuxt-link
      class="Language"
      :to="`/${item}`"
      v-for="item in locales"
      :key="item"
      >{{ item }}</nuxt-link
    >
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["locales"]),
  },
};
</script>
<style scoped>
.Language {
  border-radius: 14px;
  border: 1px solid #001529;
  margin-right: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #333;
  line-height: 21px;
  text-align: center;

  font-weight: normal;

  padding: 3px 12px;
}
</style>
