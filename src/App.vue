<template>
  <div id="app">
    <site-toolbar />
    <router-view />
  </div>
</template>

<script>
import SiteToolbar from './components/shared/SiteToolbar';

export default {
  name: 'App',
  components: {
    SiteToolbar,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
