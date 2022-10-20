<template>
  <h2 class="seriesId">
    {{ seriesId }}
  </h2>
  <GraphComponent></GraphComponent>
</template>

<script>
import GraphComponent from "@/components/GraphComponent";
export default {
  name: "DetailsView",
  components: { GraphComponent },
  computed: {
    seriesId() {
      let seriesId = this.$store.state.currentSeries[0].seriesId;
      return seriesId.toUpperCase();
    },
  },
};
</script>

<style scoped>
.seriesId {
  margin-bottom: 0;
}
</style>
