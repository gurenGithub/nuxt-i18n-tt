<template>
  <div>
    <span>{{ $tt("30B35E76205FD634A0B8D98AB4D3414B", "[你好]") }}</span>
    <span> {{ $tt("2138CF4D4A68874587AA27608D1B22CC", "[世界]") }}</span>
    <span> {{ $tt("7F08551E8E064C8435F9C2548D12DCBA", "[测试]") }}</span>

    <span>{{ $tt("B5B484F57E8240DBC834F7F5554FD143", "[我们]") }}</span>

    <span>{{ $tt("D7E682F59AAA02E5FB6889B4D5BA7CD9", "[测试33]") }}</span>

    <span>{{ $tt("1D6FD11E96FBC293B9CEE1ADB9647FBA", "[测试完3]") }}</span>
    <span>{{ $tt("669C7B7E8929B4D732D4678AFF4AE5B9", "[测试完4]") }}</span>

    <span>{{ $tt("EA2258F0EDE2A9B7C5F7B13D8589CBA9", "[测试66]") }}</span>
    <Languages />
  </div>
</template>

<script>
import Languages from "@/components/Languages";
export default {
  components: { Languages },
  name: "IndexPage",

  data() {
    let test = this.$tt("6B701C1E92FB5CD8E15003074C7589AE", "[测试3233]");
    let test2 = this.$tt("076E62B9F815AE7CE4241A54FDC58CF6", "[测试3333]");
    return {
      keywords: this.$tt("4F21B5B1E34E9E554A92B112B13A3661", "[关键字]"),
    };
  },

  async asyncData({ app }) {

    let test222=app.$tt('22DD11535AB64AB35E5CED815F89E7E0','[测试100]');
    return { title: app.$tt("7F08551E8E064C8435F9C2548D12DCBA", "[测试]") };
  },
};
</script>
