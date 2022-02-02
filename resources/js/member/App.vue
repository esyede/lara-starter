<template>
<div class="wrapper">
  <app-navbar></app-navbar>
  <app-sidebar></App-sidebar>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
          </div>
          <div class="col-sm-6">
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</div>
</template>
<script>
import Vue from 'vue';
import AppNavbar from './views/partials/AppNavbar.vue'
import AppSidebar from './views/partials/AppSidebar.vue'

export default {
    name: "app",
    components: {
        AppNavbar,
        AppSidebar
    },
    data() {
        // ..

        return {
            // ..
        };
    },
    created() {

    },
    watch: {
        '$route':{
            handler: (to, from) => {
                document.title = to.meta.title ? to.meta.title + ' | Chatfire' : 'Chatfire'
            },
            immediate: true
        }
    },
    computed: {
        // ..
    },
    methods: {
        copy(text) {
            const self = this;

            navigator.clipboard.writeText(text).then(function() {
                self.$toaster.success('Teks berhasil disalin');
            }, function(err) {
                self.$toaster.error('Teks gagal disalin');
            });
        },
        site_url(url) {
            return this.BASEURL + url;
        },
        member_url(url) {
            return window.BASEURL + '/member' + url;
        }
    }
};
</script>
