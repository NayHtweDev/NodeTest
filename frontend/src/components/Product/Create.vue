<template>
  <div class="container" style="margin-top: 200px">
        <div class="card">
            <div class="card-header">
                <h3>Add Product</h3>
            </div>
            <div class="card-body">
                <form enctype="multipart/form-data" @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label>Parent Product</label>
                        <select v-model="category" class="form-control">
                            <option v-for="(category, index) in categories" :value="category.id"
                              v-bind:key="index">{{ category.title }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Item Name:</label>
                        <input type="text" class="form-control" v-model="item.title"/>
                    </div>
                    <div class="form-group">
                        <label>Item Price:</label>
                        <input type="text" class="form-control" v-model="item.price"/>
                    </div>
                    <div class="form-group">
                        <label>Item Description:</label>
                        <input type="text" class="form-control" v-model="item.description"/>
                    </div>
                    <div class="form-group">
                        <label>Image</label>
                        <input type="file" class="form-control" ref="file" @change="onSelect($event)"/>
                    </div>
                    <br><br>
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Add Item"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
      return {
          item: {},
          categories: [],
          category: '',
          file: ''
      }
    },
    async created() {
        const category_reponse = await axios.get('parent-products');
        this.categories = category_reponse.data.data;
    },
  methods: {
        onSelect(event){
        this.file = event.target.files[0];
    },

       async onSubmit() {
        const formData = new FormData();
        formData.append('productImage', this.file);
        formData.append('title', this.item.title);
        formData.append('price', this.item.price);
        formData.append('description', this.item.description);
        formData.append('parent_id', this.category);
        formData.append('token', parseInt(localStorage.getItem('token')));

        let uri = 'add-products';
        await axios.post( uri,
            formData
        );
        this.$router.push({name: 'products'});
        
        
      }
    }
}
</script>