<script setup>
import { routes } from "@/router"
</script>
<template>
    <div v-for="route in routes" class=" my-1 ">
        <RouterLink :to="route.path" class="px-3 py-2 w-full inline-block hover:font-semibold hover:underline">
            {{  route.meta.title }}
        </RouterLink>
    </div>
</template>