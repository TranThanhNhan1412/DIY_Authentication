<script setup>
import { RouterView } from "vue-router";
import SideBar from "@/components/SideBar.vue";
import NavBar from "@/components/NavBar.vue";
import Alert from "@/components/Alert.vue";

</script>

<template>
  <Alert />

  <div class="grid grid-cols-5 h-screen w-screen">
    
    <SideBar />

    <div class="col-span-5 md:col-span-4 flex flex-col w-full h-full bg-blue-100">
      <div class="w-screen  h-16 bg-slate-950 text-slate-50 p-3 text-md">
        <NavBar />
      </div>
      <div class="p-6 flex-1">
        <RouterView />
      </div>
    </div>
  </div>
</template>


