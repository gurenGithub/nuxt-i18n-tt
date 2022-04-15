<template>
  <div>
    <span>{{ $tt("30B35E76205FD634A0B8D98AB4D3414B", "[你好]") }}</span>
    <span> {{ $tt("2138CF4D4A68874587AA27608D1B22CC", "[世界]") }}</span>
    <span> {{ $tt("7F08551E8E064C8435F9C2548D12DCBA", "[测试]") }}</span>

    <span>{{ $tt("B5B484F57E8240DBC834F7F5554FD143", "[我们]") }}</span>

    <span>{{ $tt("D7E682F59AAA02E5FB6889B4D5BA7CD9", "[测试33]") }}</span>

    <span>{{ $tt("1D6FD11E96FBC293B9CEE1ADB9647FBA", "[测试完3]") }}</span>
    <span>{{ $tt("669C7B7E8929B4D732D4678AFF4AE5B9", "[测试完4]") }}</span>
    <Languages />
  </div>
</template>

<script>
import Languages from "@/components/Languages";
export default {
  components: { Languages },
  name: "IndexPage",

  data() {
    return {
      keywords: this.$tt("4F21B5B1E34E9E554A92B112B13A3661", "[关键字]"),
    };
  },

  async asyncData({ app }) {
    return { title: app.$tt("7F08551E8E064C8435F9C2548D12DCBA", "[测试]") };
  },
};
</script>
