<template>
  <div class="app">
    <div class="container text-center">
      <template v-if="domIsReady">
        <img height="50px" class="mb-2" src="logo-white512.png" />

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
            v-on:keyup.enter="goToUrl"
            type="text" 
            class="form-control text-center" 
            placeholder="Enter domain name"
          >
          <button
            @click="goToUrl" 
            class="btn btn-primary mt-3"
          >
          <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Go to URL
          </button>
        </div>

        <p v-if="errorMessage">
          {{errorMessage}}
        </p>

        <hr />

        <p class="mt-4">
          <span>Status: {{status}} </span>
          <svg v-if="status==='Disabled'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle status-warning" viewBox="0 0 16 16">
            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
          </svg>
        </p>

        <p>
          <span>Mode: {{mode}} </span>
          <svg v-if="mode==='Fast'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-speedometer2 status-warning" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
            <path fill-rule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"/>
          </svg>
        </p>

        <button 
          @click="toggleEnabled"
          class="btn btn-primary"
        >
          <span v-if="status==='Enabled'">Disable extension</span>
          <span v-else>Enable extension</span>
        </button>

        <button 
          @click="toggleFastMode"
          class="btn btn-primary"
        >
          <span v-if="mode==='Normal'">Fast mode</span>
          <span v-else>Normal mode</span>
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import { domIsReady } from './utils/chrome';
import { getDomainDataUrl } from "./utils/resolvers";

export default {
  data() {
    return {
      domainEntry: null,
      domIsReady: false,
      errorMessage: null,
      mode: "Normal",
      loading: false,
      status: "Enabled",
      tabId: ''
    }
  },

  mounted() {
    this.awaitReady();

    const component = this;
    chrome.storage.local.get(['punkExtensionEnabled', 'punkFastMode'], function(result) {
      if (result.punkExtensionEnabled === "Enabled" || result.punkExtensionEnabled === "Disabled") {
        component.status = result.punkExtensionEnabled;
      } else {
        chrome.storage.local.set({"punkExtensionEnabled": component.status}, function() {});
      }

      if (result.punkFastMode === "Fast" || result.punkFastMode === "Normal") {
        component.mode = result.punkFastMode;
      } else {
        chrome.storage.local.set({"punkFastMode": component.mode}, function() {});
      }
    });
  },

  methods: {
    async awaitReady() {
      await domIsReady()
      this.domIsReady = true
    },

    toggleEnabled() {
      const component = this;

      if (component.status === "Enabled") {
        component.status = "Disabled";
      } else {
        component.status = "Enabled";
      }

      chrome.storage.local.set({"punkExtensionEnabled": component.status}, function() {});
    },

    toggleFastMode() {
      const component = this;

      if (component.mode === "Normal") {
        component.mode = "Fast";
      } else {
        component.mode = "Normal";
      }

      chrome.storage.local.set({"punkFastMode": component.mode}, function() {});
    },

    goToUrl() {
      this.errorMessage = null;
      this.loading = true;

      if (this.domainEntry && this.domainEntry.includes(".") && !this.domainEntry.includes(" ")) {
        const queryParts = this.domainEntry.split(".");

        if (queryParts.length === 2) {
          const domainName = queryParts[0].toLowerCase();
          const tld = "." + queryParts[1].toLowerCase();

          getDomainDataUrl(domainName, tld, this.mode).then(function(result) {
            if (result && result.startsWith("http")) {
              window.open(result, '_blank').focus();
              this.loading = false;
            } else {
              this.errorMessage = "Not HTTP URL.";
              this.loading = false;
            }
          });
        } else {
          this.errorMessage = "Incorrect domain.";
          this.loading = false;
        }
      } else {
        this.errorMessage = "Incorrect entry.";
        this.loading = false;
      }
    }
  },
}
</script>

<style scoped>   
.punk-url {
  color: #DBDFEA;
}

.status-warning {
  vertical-align: text-top;
}
</style>