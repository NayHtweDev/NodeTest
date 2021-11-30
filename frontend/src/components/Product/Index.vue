<template>
    <div style="margin-top: 200px">
        <button type="button" class="btn btn-warning pull-right">
            <router-link :to="{ name: 'product-create' }" class="nav-link">Add Product</router-link>
        </button>
        <h1> Products</h1>
        <br><br>
        <table class="table table-hover">
            <thead>
            <tr>
                <td>Item Name</td>
                <td>Item Price</td>
                <td>Item Description</td>
                <td>Actions</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="item in items" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.description }}</td>
                    <td><router-link :to="{name: 'product-edit', params: { id: item.id }}" class="btn btn-primary">Edit</router-link></td>
                    <td><button class="btn btn-danger"  v-on:click="deleteItem(item.id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                items: []
            }
        },
        created: function()
        {
            this.fetchItems();
        },
        methods: {
            async fetchItems()
            {
              await axios.get('products').then((response) => {
                  this.items = response.data.data;
              });
            },
            async deleteItem(id)
            {
            const data = {
                id: id,
                token: parseInt(localStorage.getItem('token'))
            };
            console.log(data);
              let uri = '/delete-product/';
              await axios.post(uri,data);
                location.reload();
            }
        }
    }
</script>