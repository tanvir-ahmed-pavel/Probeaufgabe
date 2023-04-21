<template>
  <div class="container mx-auto px-4">

  <div v-if="product" class="grid grid-cols-1 justify-center gap-4">
    <div class="bg-white shadow rounded-lg overflow-hidden justify-center my-5">
      <div class="p-4">
        <div :class="`flex`">
          <img :src="product.imageURL" alt="Card Image" style="height: 120px; width: 120px" class="mr-2 object-cover">

          <div class="ml-2 w-full">
            <div class="flex justify-between">
              <p  class="text-lg font-bold">{{product.name}}</p>
              <span class="text-right text-gray-500">{{new Date(product.releaseDate).toLocaleDateString('en-GB')}}</span>
            </div>



            <p class="mt-2 font-bold">Price: {{product.price.value}} {{product.price.currency}}</p>

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
        </div>
                    <p class="text-gray-600 py-3">{{product.description}}</p>
        <button v-if="!flag" @click="addData" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add to watchlist
        </button>
        <button v-else @click="deleteData" class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Remove from watchlist
        </button>

        <p class="text-gray-600 py-3"><span class="font-bold">Long Description:</span> <br>{{product.longDescription}}</p>

      </div>

    </div>
  </div>
  </div>

</template>

<script>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

export default {
  name: "ProductDetails",
  setup(){
    const route = useRoute();
    const id = ref(route.params.id);
    const product = ref();

    onMounted(async () => {
      try {
        const response = await fetch('https://gist.githubusercontent.com/benfranke/c33280a8df5f4f9db2e63ad45cab26a4/raw/f3ad6c00ff520c2667305103d5705bcbb57a7778/products.json')
        const data = await response.json()
        product.value = data.products;
        product.value = product.value.find(item => item.id == id.value);
        checkWatchlist();

      } catch (error) {
        console.log(error)
      }
    })
    const flag = ref(false);

    const checkWatchlist = ()=>{
      const existingData = JSON.parse(localStorage.getItem('watchlist')) || [];
      if(existingData.find(item => item.id == id.value)){
        flag.value = true;
      } else {
        flag.value = false;
      }
    }

    const addData = () => {
      const data = product.value;
      const existingData = JSON.parse(localStorage.getItem('watchlist')) || [];
      if(existingData.find(item => item.id == id.value)){
        flag.value = false;
      } else {
        existingData.push(data);
        localStorage.setItem('watchlist', JSON.stringify(existingData));
        flag.value = true;
      }

    }

    const deleteData = () => {
      const existingData = JSON.parse(localStorage.getItem('watchlist')) || [];
      const index = existingData.indexOf(existingData.find(item => item.id == id.value))
      if (index !== undefined){
        existingData.splice(index, 1);
        localStorage.setItem('watchlist', JSON.stringify(existingData));
        flag.value = false;
      }
    }

    return{
      product,
      addData,
      deleteData,
      flag,
    }
  }
}
</script>

<style scoped>

</style>