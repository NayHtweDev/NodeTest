<template>
<div class="container head">
    <div class="row">
        <div class="col-md-12">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="search" >
        </div>
    </div><br><br>

    <h3>Filter By Parent Products</h3> 
    <select v-model="category" class="form-control">
        <option value="all" selected="selected">ALL</option>
        <option v-for="(category, index) in categories" :value="category.id"
          v-bind:key="index">{{ category.title }}</option>
    </select>
    <br><br>
    <div v-if="products.length > 0">
        <div class="row">
            <div class="col-md-3" v-for="(item, index) in filterProductsByCategory"
                  :key="index">
                <div class="card">
                  <img class="card-img-top" :src=item.imageUrl alt="Card image cap" style="height: 200px">
                  <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <p class="card-text">{{ item.description}}</p>
                  </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"> <b> USD {{ item.price }} </b></li>
                      </ul>
                </div><br>
            </div>
        </div>
    </div>
    <div v-else>
        <p><b>There is not products</b></p>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Home',
    data() {
        return {
            products: [],
            categories: [],
            search: '',
            category: 'all'
        }
    },
    async created(){
        const response = await axios.get('products');
        this.products = response.data.data;

        const category_reponse = await axios.get('parent-products');
        
        this.categories = category_reponse.data.data;
        console.log(this.categories)
        console.log(this.products);
    },
    computed:{
        
        filterProductsByCategory: function(){
            if(this.category == 'all' || this.search.length > 0){
                return this.products.filter((product) => {
                    return product.title.match(this.search);
                });
            }
            return this.products.filter((product) => {
                return product.parent_id.match(this.category);
            });
        }
    }
}
</script>

<style scoped>
    .head {
    margin-top: 100px;
    }
</style>