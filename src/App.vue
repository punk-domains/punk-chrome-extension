<template>
  <div class="app">
    <div class="container text-center">
      <template v-if="domIsReady">
        <img height="30px" class="mb-2" src="logo-white512.png" />

        <h1>
          Punk Domains
          <a href="https://punk.domains" target="_blank" class="punk-url">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
              <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
            </svg>
          </a>
        </h1>

        <div class="mb-4 mt-4">
          <input 
            v-model="domainEntry"
            type="text" 
            class="form-control text-center" 
            placeholder="Enter domain name"
          >
          <button
            @click="goToUrl" 
            class="btn btn-primary mt-3"
          >Go to URL</button>
        </div>

        <hr />

        <p class="mt-4">Status: Enabled</p>

        <button class="btn btn-primary">Disable the extension</button>
      </template>
    </div>
  </div>
</template>

<script>
import { domIsReady } from './utils/chrome';
import { getTlds } from "./utils/tlds";

export default {
  components: {},
  data() {
    return {
      domainEntry: null,
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

    goToUrl() {
      if (this.domainEntry && this.domainEntry.includes(".") && !this.domainEntry.includes(" ")) {
        const queryParts = this.domainEntry.split(".");

        if (queryParts.length === 2) {
          const domainName = queryParts[0];
          const tld = "." + queryParts[1];

          if (Object.keys(getTlds()).includes(tld)) {
            
            let baseUrl = "https://punk.domains";

            if (tld === ".klima") {
              baseUrl = "https://www.kns.earth";
            }

            const tldData = getTlds()[tld];
            const fullUrl = baseUrl + "/#/domain/"+tldData.chainId+"/"+queryParts[1]+"/"+domainName;

            window.open(fullUrl, '_blank').focus();
            
            // TODO: check if URL is in domain data and redirect there if it is
            //const provider = getFallbackProvider(tldData.chainId);
          }
        }
      }
      
    }
  },
}
</script>

<style scoped>   
.punk-url {
  color: #DBDFEA;
}
</style>