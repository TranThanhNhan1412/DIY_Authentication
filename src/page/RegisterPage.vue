<script setup>
import { reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useUsersStore, useAlertStore, useAuthStore } from '@/stores';
import { router } from '@/router';

const formData = reactive({
    firstName: "test",
    lastName: "test",
    username: "test",
    password: "test",
})

const isFirstNameInvlid = ref(false);
const isLastNameInvalid = ref(false);
const isUsernameInvlid = ref(false);
const isPasswordInvlid = ref(false);


async function register() {
    isFirstNameInvlid.value = !formData.firstName;
    isLastNameInvalid.value = !formData.lastName;
    isUsernameInvlid.value = !formData.username;
    isPasswordInvlid.value = !formData.password;


    if (!(isFirstNameInvlid.value |
        isLastNameInvalid.value |
        isUsernameInvlid.value |
        isPasswordInvlid.value
    )) {
        const usersStore = useUsersStore();
        const authStore = useAuthStore();
        const alertStore = useAlertStore();
        try {
            await usersStore.register(formData);
            await authStore.login(formData.username,formData.password);
            alertStore.success('Registration successful');
        } catch (error) {
            alertStore.error(error);
        }
    }

}
</script>
<template>
    {{ formData }}
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-full">
        <div class="text-center text-xl">
            Register
        </div>
        <div class="space-y-6" action="#" method="POST">
            <div>
                <label for="first_name" class=" relative block text-sm font-medium leading-6 text-gray-900">
                    Fist Name
                    <span
                        :class="isFirstNameInvlid ? 'visible text-lg  text-center text-red-500 absolute -top-1' : 'hidden'">*</span>
                </label>
                <div class="mt-2">
                    <input v-model="formData.firstName" @change="isFirstNameInvlid = false" id="first_name"
                        name="first_name" type="text" autocomplete="firstName" required
                        :class="{ 'border border-red-500': isFirstNameInvlid }"
                        class="
                        block w-full rounded-md  py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>

            <div>
                <label for="last_name" class="relative block text-sm font-medium leading-6 text-gray-900">
                    Last Name
                    <span
                        :class="isLastNameInvalid ? 'visible text-lg  text-center text-red-500 absolute -top-1' : 'hidden'">*</span>
                </label>
                <div class="mt-2">
                    <input v-model="formData.lastName" @change="isLastNameInvalid = false" id="last_name" name="last_name"
                        type="text" autocomplete="last_name" required
                        :class="{ 'border border-red-500': isLastNameInvalid }"
                        class="
                        block w-full  rounded-md  py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>
            <div>
                <label for="user_name" class=" relative block text-sm font-medium leading-6 text-gray-900">
                    Name
                    <span
                        :class="isUsernameInvlid ? 'visible text-lg  text-center text-red-500 absolute -top-1' : 'hidden'">*</span>
                </label>
                <div class="mt-2">
                    <input v-model="formData.username" @change="isUsernameInvlid = false" id="user_name" name="user_name"
                        type="text" autocomplete="user_name" required :class="{ 'border border-red-500': isUsernameInvlid }"
                        class="
                        block w-full rounded-md  py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
                    <input v-model="formData.password" @change="isPasswordInvlid = false" id="password" name="password"
                        type="password" autocomplete="current-password" required
                        :class="{ 'border border-red-500': isPasswordInvlid }"
                        class=" relative block w-full rounded-md  py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>

            <div>
                <button @click="register" type="button"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 
                        text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Register
                </button>
            </div>
        </div>
        <p class="mt-10 text-center text-sm text-gray-500">
            Has an account?
            <RouterLink to="login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Login
            </RouterLink>

        </p>
    </div>
</template>
