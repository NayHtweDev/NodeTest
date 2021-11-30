<template>
  <div class="container" style="margin-top: 200px;">
        <div class="card">
            <div class="card-header">
                <h3>Edit Parent Product</h3>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="updateItem">
                    <div class="form-group">
                        <label>Parent Product Name:</label>
                        <input type="text" class="form-control" v-model="item.title"/>
                    </div>
                    <br><br>
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Update Item"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default{
        data(){
            return{
                item:{}
            }
        },
        created: function(){
            this.getItem();
        },
        methods: {
            async getItem()
            {
              let uri = '/edit-parent-product/' + this.$route.params.id;
                await axios.get(uri).then((response) => {
                    console.log(response.data.data);
                    this.item = response.data.data;
                });
            },
            async updateItem()
            {
                const data = {
                    id: this.$route.params.id,
                    title: this.item.title,
                    token: parseInt(localStorage.getItem('token')),
                };
                console.log(data);
                await axios.post('edit-parent-product', data);
                this.$router.push({name: 'parent-products'});
                
            }
        }
    }
</script>