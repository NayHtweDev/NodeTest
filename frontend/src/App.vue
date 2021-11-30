<template>
  <div class="vue-tempalte">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <a class="navbar-brand float-left" href="/">
           Test Project
        </a>
        <ul class="nav navbar-nav flex-row float-right" v-if="login">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/login">Sign in </router-link>
          </li> 
          <li class="nav-item">
            <router-link class="btn btn-outline-primary" to="/signup" >Sign up</router-link>
          </li>
        </ul>
        <ul class="nav navbar-nav flex-row float-right" v-else>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/products">Admin Product</router-link>
          </li> 
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/parent-products" >Admin Parent Product</router-link>
          </li>
          <li class="nav-item">
            <a href="javascript:void(0)" class="nav-link" @click="handleClick"> Logout </a>
          </li> 
        </ul>
      </div>
    </nav>

    <!-- Main -->
    <div class="App">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            login: true
        }
    },
    created(){
        const loginData = localStorage.getItem('token');
        if(loginData != null){
          this.login = false;
        }
      console.log(loginData);
    },
    methods: {
      handleClick() {
        localStorage.removeItem('token');
        this.$router.push("/login");
      }
    }
}
</script>
<style scoped>
  li.nav-item {
      padding: 5px;
  }
</style>