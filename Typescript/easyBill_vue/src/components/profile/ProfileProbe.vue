<template>
  <div class="mx-4 mt-2">

    <div class="w-full h-full">
      <div class="min-h-72 max-h-full bg-white rounded-md shadow-md p-4 flex flex-col gap-4 relative">
        <div
          class="h-2/12 min-h-24 w-full rounded-3xl bg-gradient-profile flex flex-col items-start justify-center p-4 shadow-md">
          <h2 class="font-Poppins text-lg text-white font-bold ms-6">
            {{ theUser.name }}
          </h2>
        </div>
        <div class="flex-grow w-full min-h-10/12 max-h-full">
          <div class="w-full flex flex-col items-start h-full gap-2 my-7">

            <div v-for="(value, prop) in theUser" :key="prop" class="flex w-full">
              <label v-if="prop !== 'srcImage'" class="w-1/4 text-gray-400 font-extralight font-DM">{{ prop }}:</label>
              <p v-if="prop !== 'srcImage'" class="w-3/4 font-DM text-blue-input font-bold">{{ value }}</p>
            </div>

          </div>
        </div>

        <div class="absolute right-0 h-full top-0 me-3 px-4 py-8 w-3/12 flex flex-col justify-between">
          <img :src="theUser.srcImage" alt="Img Profile"
            class="aspect-square w-full rounded-full shadow-lg backdrop-blur-sm" />
        </div>

        <button @click="submitValues" class="bg-easy-blue block text-white font-light font-DM px-6 py-1 rounded-xl text-lg w-full min-w-28 hover:opacity-65
          hover:cursor-pointer">
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProfileProbe",
  data() {
    return {
      theUser: null
    }
  },
  created() {
    const userB = sessionStorage.getItem('user');
    if (userB) {
      this.theUser = JSON.parse(userB);
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    submitValues() {
      console.log('Se dio click a editar perfil');
    }
  }
};
</script>
