<template>
  <div class="container" style="margin-top: 200px;">
        <div class="card">
            <div class="card-header">
                <h3>Edit Product</h3>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="updateItem" enctype="multipart/form-data">

                    <div class="form-group">
                        <label>Parent Product</label>
                        <select v-model="category" class="form-control">
                            <option v-for="(category, index) in categories" :value="category.id"
                              v-bind:key="index">{{ category.title }}</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Parent Product Name:</label>
                        <input type="text" class="form-control" v-model="item.title"/>
                    </div>
                    <div class="form-group">
                        <label>Parent Product Price:</label>
                        <input type="text" class="form-control" v-model="item.price"/>
                    </div>
                    <div class="form-group">
                        <label>Parent Product Description:</label>
                        <input type="text" class="form-control" v-model="item.description"/>
                    </div>
                    <div class="form-group">
                        <label>Image</label>
                        <br>
                        {{ item.imageUrl }}
                        <br>
                        <input type="file" class="form-control" ref="file" @change="onSelect($event)"/>
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
                item:{},
                categories: [],
                category: '',
                file: ''
            }
        },
        async created(){
            this.getItem();
            
            const category_reponse =  await axios.get('parent-products');
            this.categories = category_reponse.data.data;
        },
        methods: {
            async getItem()
            {
              let uri = '/edit-product/' + this.$route.params.id;
                await axios.get(uri).then((response) => {
                    // console.log(response.data.data);
                    this.item = response.data.data;
                    this.category = this.item.parent_id;
                });
            },
            onSelect(event){
                this.file = event.target.files[0];
            },
            async updateItem()
            {   
                const formData = new FormData();
                
                if(this.file){
                    formData.append('productImage', this.file);
                }
                
                formData.append('id', this.$route.params.id);
                formData.append('title', this.item.title);
                formData.append('price', this.item.price);
                formData.append('description', this.item.description);
                formData.append('parent_id', this.category);
                formData.append('token', parseInt(localStorage.getItem('token')));

                await axios.post('edit-product', formData);
                this.$router.push({name: 'products'});
                
            }
        }
    }
</script>