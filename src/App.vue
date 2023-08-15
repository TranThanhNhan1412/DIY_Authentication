<script setup>
import { RouterView } from "vue-router";
import SideBar from "@/components/SideBar.vue";
</script>

<template>
  <div class="grid grid-cols-5">
    <div class="h-screen bg-slate-950 text-slate-50">
      <div class="text-center text-lg p-3">
        sidebar
      </div>
      <SideBar />
    </div>
    <div class="col-span-4 w-full h-full bg-blue-100">
      <div class="w-screen  h-16 bg-slate-950 text-slate-50 p-3 text-md">
        nav
      </div>
      <div class="p-6">
        <RouterView />
      </div>
    </div>
  </div>
</template>


