<template>
  <div v-if="filteredProducts" class="container mx-auto px-4">
    <div class="grid grid-cols-1 justify-center gap-4">
      <div class="bg-blue-600 shadow rounded-lg overflow-hidden justify-center my-5">
        <div class="text-center my-3">
          <h1 class="text-3xl text-white font-semibold">App Title</h1>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 justify-center gap-4  ">
      <div :class="`${filterFlag==='watchlist'? 'bg-blue-300': 'bg-gray-200'} shadow rounded-lg overflow-hidden justify-center my-5`">
        <div class="p-2">
          <h2 class="text-xl font-semibold text-gray-800">{{filterFlag==="watchlist"? "Watchlist Product" : filterFlag==="all"?"All Product": "Available Product"}}</h2>
          <div class="text-gray-600">{{filterFlag==="watchlist"? "Watchlist Subtitle...": filterFlag==="all"?"All Product Subtitle...": "Available Product Subtitle..."}}</div>
        </div>

      </div>

      <div class="bg-gray-200 shadow rounded-lg overflow-hidden justify-center my-5">
        <div class="p-2 text-center border-b border-gray-400">
          <h2 class="text-xl font-semibold text-gray-800">Filter</h2>
        </div>

        <nav class="flex justify-center">
          <button @click="filterF('all')" :class="`${filterFlag==='all'? 'bg-blue-300': ''} py-2 px-4 hover:text-gray-700 focus:outline-none active:text-gray-700 border-b-2 border-transparent hover:border-gray-300`">
            All Products
          </button>
          <button @click="filterF('available')" :class="`${filterFlag==='available'? 'bg-blue-300': ''} py-2 px-4 hover:text-gray-700 focus:outline-none active:text-gray-700 border-b-2 border-transparent hover:border-gray-300`">
            Only Available
          </button>
          <button @click="filterF('watchlist')" :class="`${filterFlag==='watchlist'? 'bg-blue-300': ''} py-2 px-4 hover:text-gray-700 focus:outline-none active:text-gray-700 border-b-2 border-transparent hover:border-gray-300`">
            My Watch List
          </button>
        </nav>


      </div>
    </div>

    <div class="grid grid-cols-1 justify-center gap-4">
      <div v-for="product in filteredProducts" :key="product.id" class="bg-white shadow rounded-lg overflow-hidden justify-center my-5">
        <div class="p-4">
          <div :class="`flex ${!product.available? 'justify-between': ''}`">
            <img v-if="product.available" :src="product.imageURL" alt="Card Image" style="height: 120px; width: 120px" class="mr-2 object-cover">

            <div class="ml-2 w-full">
              <div class="flex justify-between">
                <router-link :to="`/details/${product.id}`"  class="text-lg font-bold text-blue-600">{{product.name}}</router-link>
                <span v-if="product.available" class="text-right text-gray-500">{{new Date(product.releaseDate).toLocaleDateString('en-GB')}}</span>
              </div>
              <p class="text-gray-600">{{product.description}}</p>
              <p v-if="product.available" class="mt-2 font-bold">Price: {{product.price.value}} {{product.price.currency}}</p>

<!--              Star rating-->
              <div class="flex items-center space-x-1">
                <template v-for="i in 5">
                  <svg

                      class="h-5 w-5 fill-current"
                      :class="{
          'text-yellow-500': i <= product.rating && i < product.rating + 1,
          'half': i === product.rating + 0.5
        }"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M10 0l2.928 6.354 6.567.955-4.753 4.582 1.12 6.516L10 15.777l-5.863 3.63 1.12-6.516L.505 7.309l6.567-.955L10 0z"
                    />
                  </svg>
                </template>
              </div>


            </div>
            <img v-if="!product.available" :src="product.imageURL" alt="Card Image" style="height: 120px; width: 120px" class="mr-2 object-cover">

          </div>
        </div>
      </div>
    </div>

  </div>



</template>

<script>
import {ref, onMounted, computed} from "vue";

export default {
  name: "ProductOverview",
  setup(){
    const products = ref();
    const filteredProducts = ref();
    const filterFlag = ref("all");
    const watchlist = ref();

    onMounted(async () => {
      try {
        const response = await fetch('https://gist.githubusercontent.com/benfranke/c33280a8df5f4f9db2e63ad45cab26a4/raw/f3ad6c00ff520c2667305103d5705bcbb57a7778/products.json')
        const data = await response.json()
        products.value = data.products
        filterF("all");
      } catch (error) {
        console.log(error)
      }
    })

    const filterF = (filter="all")=>{
      filterFlag.value = filter;
        if (filter === 'available') {
          filteredProducts.value = products.value.filter(item => item.available);
        } else if (filter === 'all') {
          filteredProducts.value = products.value;
        } else if(filter === 'watchlist'){
          const data = JSON.parse(localStorage.getItem('watchlist')) || [];
          if(data){
            filteredProducts.value = data
          }
        }
    }

    return{
      filteredProducts,
      filterF,
      filterFlag,
    }
  }
}
</script>

<style scoped>
.half {
  margin-left: -10%;
}
</style>