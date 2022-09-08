import { createStore } from 'vuex'
import auth from "./auth";
import { notify } from "@kyvg/vue3-notification"
import Swal from 'sweetalert2/dist/sweetalert2.js'

let cart = window.localStorage.getItem('cart');

export default createStore({

  state: {
    errors: [],
    cart: cart ? JSON.parse(cart) : [],
    loading: false,
    baseUrl: 'https://admin.emb.lk/', //'https://fuodz.edentech.online/',
    // baseUrl: 'http://fuodz-admin.test/',
  },

  
  mutations: {
    setErrors(state, errors) {
      state.errors = errors;
    },

    setCartItems (state, { products }) {
      state.cart = products
    },

    loading(state, newLoading) {
      state.loading = newLoading
    },

    increment(state, product) {
      let item = state.cart.find(p => p.id == product.id);
      if(product.available_qty > 1) {
        item.quantity++
        if(item.discount_price != 0)
        {
          item.totalPrice = item.quantity * item.discount_price;
        }else {
          item.totalPrice = item.quantity * item.price;
        }
        
      }else if(product.quantity > product.available_qty) {
        notify({
          type: "error",
          title: "Cart",
          text:  item.name +" " + "is out of stock",
        });
      }
      this.commit('saveCart');
    },

    decrement(state, product) {
      let item = state.cart.find(p => p.id == product.id);
        item.quantity--
        if(item.discount_price != 0)
        {
          item.totalPrice = item.discount_price - item.quantity;
        }else {
          item.totalPrice = item.price - item.quantity;
        }
        // item.totalPrice = item.price - item.quantity
        if(item.quantity == 0) {
          state.cart.splice(item, 1);
          notify({
            type: "success",
            title: "Cart",
            text:  item.name +" " + "has been removed from cart",
          });
        }
      this.commit('saveCart');
    },

  addToCart(state, {product, quantity, selectedOption}) {
    let item = state.cart.find(p => p.id == product.id);
    if (item) {
      item.quantity += quantity++
      item.selectedOption = selectedOption
      // item.totalPrice = item.quantity * item.price;
      if(item.discount_price != 0)
      {
        item.totalPrice = item.quantity * item.discount_price;
      }else {
        item.totalPrice = item.quantity * item.price;
      }
      
      // if(item.selectedOption != undefined) {
        
      //   item.selectedOption.forEach((itemCalc, i) => {
      //     item.totalPrice = item.quantity * item.price + item.selectedOption[i].price;
      //   })
      // }
      Swal.fire({
        title: 'Cart',
        text: "Your product" + " "+ item.name +" " + "has been added to cart",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Keep shopping',
        confirmButtonText: 'Go to cart'
        }).then((result) => {
          if(result.isConfirmed) {
            window.location.href = "/cart"
          }
        })

    }
    else if(state.cart.length >= 1){
      if(product.vendor.id != state.cart[0]['vendor']['id']){
        Swal.fire({
          title: 'Different Vendor',
          text: "Are you sure you'd like to change vendors? Your Current items in cart will be lost.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Okay'
          }).then((result) => {
            if(result.isConfirmed) {
              // localStorage.removeItem('cart')
              state.cart = [];
              product.quantity = quantity++
              product.selectedOption = selectedOption
              // product.totalPrice = product.quantity * product.price;
              if(product.discount_price != 0)
              {
                product.totalPrice = product.quantity * product.discount_price;
              }else {
                product.totalPrice = product.quantity * product.price;
              }
              // if(product.selectedOption != undefined) {
              //   product.selectedOption.forEach((item, i) => {
              //     product.totalPrice = product.quantity * product.price + product.selectedOption[i].price;
              //   })
              // }
              state.cart.push(product)
              Swal.fire(
                'Cart',
                "Your product" + " "+ product.name +" " + "has been added to cart",
                'success'
              )
            }
            this.commit('saveCart');
          })
      }else{
        product.quantity = quantity++
        // product.totalPrice = product.quantity * product.price;
        product.selectedOption = selectedOption;
        if(product.discount_price != 0)
        {
          product.totalPrice = product.quantity * product.discount_price;
        }else {
          product.totalPrice = product.quantity * product.price;
        }
        // if(product.selectedOption != undefined) {
        //   product.selectedOption.forEach((item, i) => {
        //     product.totalPrice = product.quantity * product.price + product.selectedOption[i].price;
        //   })
        // }
        state.cart.push(product)
        Swal.fire({
          title: 'Cart',
          text: "Your product" + " "+ product.name +" " + "has been added to cart",
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#10b981',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Keep shopping',
          confirmButtonText: 'Go to cart',
        }).then((result) => {
          if(result.isConfirmed) {
            window.location.href = "/cart"
          }
        });
      }
      this.commit('saveCart');
    }
    else{
      product.quantity = quantity
      product.selectedOption = selectedOption
      // product.totalPrice = product.quantity * product.price
      if(product.discount_price != 0)
      {
        product.totalPrice = product.quantity * product.discount_price;
      }else {
        product.totalPrice = product.quantity * product.price;
      }

      // if(product.selectedOption) {
      //   product.selectedOption.forEach((item, i) => {
      //     product.totalPrice = product.quantity * product.price + product.selectedOption[i].price;
      //   })
      // }
      state.cart.push(product)
      Swal.fire({
        title: 'Cart',
        text: "Your product" + " "+ product.name +" " + "has been added to cart",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Keep shopping',
        confirmButtonText: 'Go to cart'
        }).then((result) => {
          if(result.isConfirmed) {
            window.location.href = "/cart"
          }
        })
    }
    this.commit('saveCart');
  },

  saveCart(state) {
    window.localStorage.setItem('cart', JSON.stringify(state.cart));
  },

  
  },


getters: {
  errors: state => state.errors,
  count: state => state.cart.length,
  isAuthenticated: state => !!state.user,
  subtotal: state => state.cart.price,
  
  loading(state) {
    return state.loading
    
  },
},

  modules: {
    auth,
  }
  
});