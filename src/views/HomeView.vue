<template>
  <div class="container">
    <div v-if="seriesArray.length === 0" class="upload">
      <h3 class="uploadText">Last opp en fil for å starte</h3>
      <div class="inputButtons">
        <input type="file" id="uploadFile" accept=".csv" />
        <button class="submitButton" @click.stop="displaySeries">
          Last opp
        </button>
      </div>
    </div>
    <div class="series" v-if="seriesArray.length !== 0">
      <h3 class="intro">Velg en serie for å se detaljer</h3>
      <div v-if="seriesArray.length !== 0" class="seriesContainer">
        <h4
          class="seriesName"
          v-for="(name, index) in seriesArray"
          :key="index"
          @click="goToDetails(name)"
        >
          {{ name }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      csvArray: [],
    };
  },
  components: {},
  computed: {
    seriesArray() {
      return this.$store.state.seriesNames;
    },
  },
  methods: {
    async readCsv() {
      let file = document.getElementById("uploadFile").files[0];
      return new Promise((resolve, reject) => {
        this.$papa.parse(file, {
          download: true,
          header: true,
          skipEmptyLines: true,

          complete: function (results) {
            return resolve(results.data);
          },
          error: function (error) {
            return reject(error);
          },
        });
      });
    },
    async displaySeries() {
      this.csvArray = await this.readCsv();
      this.$store.dispatch("setCsvArray", this.csvArray);
      let seriesNames = [];
      for (let i = 0; i < this.csvArray.length; i++) {
        seriesNames.push(this.csvArray[i].seriesId);
      }
      this.$store.dispatch("setNames", [...new Set(seriesNames)]);
      for (let j = 0; j < this.seriesArray.length; j++) {
        console.log(this.seriesArray[j]);
      }
    },
    goToDetails(name) {
      console.log(typeof name);
      let clickedSeries = [];
      let csvArray = this.$store.state.csvArray;
      for (let i = 0; i < csvArray.length; i++) {
        if (csvArray[i].seriesId === name) {
          clickedSeries.push(csvArray[i]);
        }
      }
      this.$store.dispatch("setSeries", clickedSeries);
      this.$router.push({
        name: "DetailsView",
      });
    },
  },
};
</script>
<style scoped>
.container {
}
.upload {
  box-shadow: 1px 1px 5px gray;
  border-radius: 20px;
  width: fit-content;
  margin: 0 auto;
  padding: 2rem;
}
.uploadText {
  margin-top: 0;
}
.submitButton {
  border: none;
  box-shadow: 1px 1px 5px gray;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  width: max-content;
  margin: 0 auto -5px auto;
  background-color: white;
  cursor: pointer;
}
.submitButton:hover {
  background-color: rgba(248, 247, 247, 0.7);
}
.intro {
  border-bottom: solid black;
  width: fit-content;
  margin: 0 auto 1rem auto;
}
.seriesContainer {
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  width: 20rem;
}
.seriesName {
  margin: 0.3rem 0.3rem 0 0.3rem;
  cursor: pointer;
  padding: 0.7rem;
  transition: 100ms;
}
.inputButtons {
  display: flex;
  flex-direction: column;
}

.seriesName:hover {
  background-color: rgba(248, 247, 247, 0.7);
  border-radius: 20px;
}

#uploadFile {
  margin-bottom: 2rem;
}
</style>
