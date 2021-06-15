<template>
  <div class="hello">
    <div v-html="markdownHtml"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      markdownHtml: "",
    };
  },
  created() {
    this.test();
  },
  methods: {
    async test() {
      const response = await fetch("/api");
      const json = await response.json();
      this.markdownHtml = `<markdown-component>
        <style slot="style">${json.css}</style>
        <div slot="content">${json.html}</div>
      </markdown-component>`;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
