<template>
    <div class="vertical-center">
    <div class="inner-block">
    <div class="vue-tempalte">
        <form @submit.prevent="handleSubmit">
            <h3>Sign Up</h3>

            <div class="form-group">
                <label>Full Name</label>
                <input type="text" v-model="name" class="form-control form-control-lg"/>
            </div>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" v-model="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Phone No</label>
                <input type="phone" v-model="phone" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" v-model="password" class="form-control form-control-lg" />
            </div>
            <br>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button>

            <p class="forgot-password text-right">
                Already registered 
                <router-link :to="{name: 'login'}">sign in?</router-link>
            </p>
        </form>
    </div>
    </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Register',
        data() {
            return {
                name: '',
                password : '',
                phone: '',
                email: '',
            }
        },
        methods: {
            async handleSubmit(){
                const data = {
                    name: this.name,
                    password: this.password,
                    email: this.email,
                    phone: this.email
                };
                console.log(data);
                const response = await axios.post('auth/register',data);
                console.log(response);
                this.$router.push("/login");
                
            }
        },
    }
</script>

<style scoped>
 .vertical-center{
    margin-top: 120px !important;
 }
</style>