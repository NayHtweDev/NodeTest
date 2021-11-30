<template>
  <div class="container" style="margin-top: 200px">
        <div class="card">
            <div class="card-header">
                <h3>Add Item</h3>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="addItem">
                    <div class="form-group">
                        <label>Item Name:</label>
                        <input type="text" class="form-control" v-model="item.title"/>
                    </div><br><br>
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
          item: {}
      }
  },
  methods: {
       async addItem() {
        const data = {
            title: this.item.title,
            token: parseInt(localStorage.getItem('token')),
        };
        console.log(data);
        let uri = 'add-parent-products';
        await axios.post(uri, data);
        this.$router.push({name: 'parent-products'});
      }
    }
}
</script>