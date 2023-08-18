<script setup>
import { useAuthStore } from '@/stores';
import { ref,onMounted } from 'vue';
const authStore = useAuthStore();
const isLogin = ref(false)
onMounted(() => {
    isLogin.value = localStorage.getItem("user") != null;

})
</script>
<template>
    <div class="md:block hidden">
        NavBar
    </div>
    <div class="md:hidden flex gap-3 items-center  justify-between">
        <div class="flex justify-end">
            <RouterLink to="/" class="px-3 py-2  inline-block hover:font-semibold hover:underline">
                Home
            </RouterLink>
        </div>
        <div>
            <button v-if="isLogin" @click="authStore.logout()"
                class="px-3 py-2 mr-3 inline-block hover:font-semibold hover:underline">
                Logout
            </button>
            <template v-else>
                <RouterLink v-if="$route.name === 'login'" to="/account/register"
                    class="px-3 py-2 mr-3 inline-block hover:font-semibold hover:underline">
                    Register
                </RouterLink>
                <RouterLink v-if="$route.name === 'register'" to="/account/login"
                    class="px-3 py-2 mr-3 inline-block hover:font-semibold hover:underline">
                    Login
                </RouterLink>
            </template>

        </div>

    </div>
</template>