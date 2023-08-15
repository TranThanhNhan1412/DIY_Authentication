<script setup>
import { reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';

const username = ref("");
const isUsernameInvlid = ref(false);
const password = ref("");
const isPasswordInvlid = ref(false);

function login() {
    if (!username.value) {
        isUsernameInvlid.value = true;
    }
    if (!password.value) {
        isPasswordInvlid.value = true;
    }
    if (!(isUsernameInvlid.value & isPasswordInvlid.value)) {
        console.log(username.value, password.value);
    }

}
</script>
<template>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-full">
        <div class="text-center text-xl">
            Login
        </div>
        <div class="space-y-6" action="#" method="POST">
            <div>
                <label for="user_name" class="block text-sm font-medium leading-6 text-gray-900">
                    Name
                    <span
                        :class="isUsernameInvlid ? 'visible text-lg  text-center text-red-500 absolute -top-1' : 'hidden'">*</span>
                </label>
                <div class="mt-2">
                    <input v-model="username" @change="isUsernameInvlid = false" id="user_name" name="user_name" type="text"
                        autocomplete="user_name" required :class="{ 'border border-red-500': isUsernameInvlid }"
                        class="
                        block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label for="password" class=" relative block text-sm font-medium leading-6 text-gray-900">
                        Password
                        <span
                            :class="isPasswordInvlid ? 'visible text-lg  text-center text-red-500 absolute -top-1' : 'hidden'">*</span>

                    </label>
                    <div class="text-sm">
                        <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                    </div>
                </div>
                <div class="mt-2">
                    <input v-model="password" @change="isPasswordInvlid = false" id="password" name="password" type="password"
                        autocomplete="current-password" required :class="{ 'border border-red-500': isPasswordInvlid }"
                        class="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>

            <div>
                <button @click="login" type="button"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 
                        text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Sign in
                </button>
            </div>
        </div>
        <p class="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <RouterLink to="register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register
            </RouterLink>
        </p>
    </div>
</template>
