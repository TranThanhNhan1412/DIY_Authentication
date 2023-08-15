<script setup>
import { routes } from "@/router"
</script>
<template>
    <div class="md:block hidden">
        NavBar
    </div>
    <div class="md:hidden flex gap-3 items-center ">
        <div v-for="route in routes">
            <RouterLink :to="route.path" class="px-3 py-2 w-full inline-block hover:font-semibold hover:underline">
                {{ route.meta.title }}
            </RouterLink>
        </div>
        <button class="px-3 py-2 w-full inline-block hover:font-semibold hover:underline">
            Logout
        </button>
    </div>
</template>