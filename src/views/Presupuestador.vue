<template>
    <div>
          <p>Cart</p>
  <div v-for="item in shoppingCart" class="cart">
    <span v-if="item.selectedProdId > -1">
          {{ prodData[item.selectedProdId].productname }} - {{ prodData[item.selectedProdId].productprice }} $
    </span>
    <ul class="selected-a">
      <li class="li-a" v-for="a in item.productselectedaccessories" v-if="a.productid > -1">
        {{ a.productname }} - {{ a.productprice }} $
      </li>
    </ul>
  </div>

  <hr>
  <div>
    <div class="cart-item" :key="item.id" v-for="(item, cartIdx) in shoppingCart">
      <div class="product">
        Product
        <select v-model="item.selectedProdId">
          <option :key="prodIdx" v-for="(prod, prodIdx) in prodData" :value="prodIdx"> {{ prod.productname }} - {{ prod.productprice }} $</option>
        </select>

        <button type="button" class="btn btn-danger" @click="removeProd(cartIdx)">
          -
        </button>
      </div>
      <hr>
      <div class="prod-accessory" v-if="item.selectedProdId > -1">
        Accessories
        <button type="button" class="btn btn-success" @click="addAccessory(cartIdx)">
          +
        </button>
      </div>
      <div class="accessory-list" v-if="item.selectedProdId > -1">
        <div class="accessory-item" :key="idx" v-for="(a, idx) in shoppingCart[cartIdx].productselectedaccessories">
          <select v-model="shoppingCart[cartIdx].productselectedaccessories[idx]">
            <option :key="aIdx" v-for="(a, aIdx) in prodData[item.selectedProdId].productaccessories" :value="a"> {{ a.productname }} - {{ a.productprice }} $</option>
          </select>
          <button type="button" class="btn btn-danger" @click="removeAccessory(cartIdx, idx)">
            -
          </button>
        </div>
      </div>

    </div>

    <button type="button" class="btn btn-success" @click="addProduct">
      +
    </button>
  </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'home-content',

    beforeRouteEnter(to, from, next) {
        axios
            .get('/api/products/1')
            .then(response => {
                next(vm => {
                    vm.setProducts(response.data);
                });
            })
            .catch(error => {
                console.log(error);
            });
    },

    data() {
        return {
            idGenerator: 0,
            prodData: [],
            shoppingCart: [],
        };
    },

    computed: {
        cart() {
            return this.shoppingCart;
        },
    },

    methods: {
        addProduct() {
            this.shoppingCart.push({
                // eslint-disable-next-line
                id: this.idGenerator++,
                selectedProdId: -1,
                productselectedaccessories: [],
            });
        },

        addAccessory(idx) {
            this.shoppingCart[idx].productselectedaccessories.push({
                productid: -1,
                productname: '',
                productprice: -1,
            });
        },

        removeProd(idx) {
            this.shoppingCart.splice(idx, 1);
        },

        removeAccessory(cartIdx, idx) {
            this.shoppingCart[cartIdx].productselectedaccessories.splice(
                idx,
                // eslint-disable-next-line
                1
            );
        },

        setProducts(products) {
            console.log(products);
            this.prodData = products;
        },
    },
};
</script>

<style lang="scss" scoped>
.body {
    font-family: Tahoma;
    font-size: 11px;
}

.cart {
    border: 1px solid grey;
    margin: 20px;
    padding: 5px;
}

.cart-item {
    display: flex;
    flex-direction: column;
    margin: 20px;
    padding: 10px;
    border: 1px solid lightgrey;
    align-self: center;
}

.product {
    display: flex;
    justify-content: flex-start;
}

select {
    margin: 5px;
    font-size: 11px;
}

.prod-accessory {
    display: flex;
    margin: 5px;
}

ul.selected-a {
    font-size: 10px;
}

button.btn {
    width: 30px;
    height: 30px;
    padding: 5px;
    margin: 0 5px;
}
</style>
