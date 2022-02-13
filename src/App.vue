<template>
  <div class="app">
    <h1>Punk Domains Chrome Extension</h1>

    <template v-if="domIsReady">
      <p>Hello Punk! :)</p>
      <p>Click here to disable the extension (different logo color).</p>
    </template>
  </div>
</template>

<script>
import { domIsReady } from './utils/chrome'

export default {
  components: {},
  data() {
    return {
      domIsReady: false,
      tabId: ''
    }
  },
  mounted() {
    this.awaitReady()
  },
  methods: {
    async awaitReady() {
      await domIsReady()
      this.domIsReady = true
    },
  },
}
</script>

<style>

</style>