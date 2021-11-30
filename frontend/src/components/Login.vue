<template>
    <div class="vertical-center">
    <div class="inner-block">
    <div class="vue-tempalte">
        <form @submit.prevent="handleSubmit">
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" v-model='email' class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" v-model='password' class="form-control form-control-lg" />
            </div>
                <br>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
        </form>
    </div>
</div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Login',
        data() {
            return {
                email : '',
                password: ''
            }
        },
        methods: {
            async handleSubmit(){
                const data = {
                    email: this.email,
                    password: this.password
                };
                
                const response = await axios.post('auth/login',data);
            
                if(response.data.data){
                    var tokenData = response.data.data.token;
                    console.log(response.data.data.token);
                    localStorage.setItem('token', tokenData.toString());
                    this.$router.push("/");
                }
                
            }
        },
    }
</script>

<style scoped>
 .vertical-center{
    margin-top: 120px !important;
 }
</style>