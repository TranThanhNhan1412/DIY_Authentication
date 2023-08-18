<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from 'vue-router';

import { useUsersStore, useAlertStore } from '@/stores';
import { router } from '@/router';
import { fetchWrapper } from '@/helpers';
const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

const usersStore = useUsersStore();
const alertStore = useAlertStore();

const route = useRoute();
const id = route.params.id;

const formData = reactive({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
})
const user = ref(null);


onMounted(async () => {
    if (id) {
        user.value = { loading: true };
        try {
            user.value = await fetchWrapper.get(`${baseUrl}/${id}`);
            console.log("user:", user.value);
            formData.firstName = user.value.firstName;
            formData.lastName = user.value.lastName;
            formData.username = user.value.username;
            formData.password = user.value.password;
            console.log("formData", formData);

        } catch (error) {
            user.value = { error };
        }

    }
})


const invalid = reactive({
    firstName: false,
    lastName: false,
    username: false,
    password: false,
})

function check_valid() {
    invalid.firstName = !formData.firstName;
    invalid.lastName = !formData.lastName;
    invalid.username = !formData.username;
    if (id === undefined) {
        invalid.password = !formData.password;
    }

}

async function addUser() {
    check_valid()
    let all_valid = Boolean(
        invalid.firstName === false &
        invalid.lastName === false &
        invalid.username === false &
        invalid.password === false

    );
    if (!(all_valid)) {
        alertStore.error("Please fill all requrieds");
        return
    }
    try {
        let message;

        if (id != undefined) {
            console.log("user", user, user.value.id);
            await usersStore.update(user.value.id, formData)
            message = 'User updated';
        } else {
            await usersStore.register(formData);
            message = 'User added';
        }
        await router.push('/');
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
}
</script>

<template>
    <div class="mb-6 text-xl">
        {{ $route.meta.title }}
    </div>
    <template v-if="!(user?.loading || user?.error)">
        <div>
            <div class="form-row">
                <div class="">
                    <label class=" relative">
                        First Name
                        <span
                            :class="invalid.firstName ? 'visible text-lg  text-center text-red-500 absolute -top-1' : 'hidden'">*</span>
                    </label>
                    <input v-model="formData.firstName" :class="{ 'border border-red-500': invalid.firstName }"
                        name="firstName" type="text" class=" block w-full rounded-md  py-1.5 p-2 text-gray-900 shadow-sm 
                        ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                         focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <div class="">
                    <label class=" relative">
                        Last Name
                        <span
                            :class="invalid.lastName ? 'visible text-lg  text-center text-red-500 absolute -top-1' : 'hidden'">*</span>
                    </label>
                    <input v-model="formData.lastName" :class="{ 'border border-red-500': invalid.lastName }"
                        name="lastName" type="text" class=" block w-full rounded-md  py-1.5 p-2 text-gray-900 shadow-sm 
                        ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                         focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div class="form-row">
                <div class="">
                    <label class=" relative">
                        Username
                        <span
                            :class="invalid.username ? 'visible text-lg  text-center text-red-500 absolute -top-1' : 'hidden'">*</span>
                    </label>
                    <input v-model="formData.username" :class="{ 'border border-red-500': invalid.username }"
                        name="username" type="text" class=" block w-full rounded-md  py-1.5 p-2 text-gray-900 shadow-sm 
                        ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                         focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <div class="">

                    <label v-if="user">
                        Password
                        <em>(Leave blank to keep the same password)</em>
                    </label>

                    <label v-else class=" relative ">
                        Password
                        <span :class="invalid.password ? 'visible text-lg  text-center text-red-500 absolute -top-1'
                            : 'hidden'">*</span>
                    </label>
                    <input v-model="formData.password" :class="{ 'border border-red-500': invalid.password }"
                        name="password" type="password" class=" block w-full rounded-md  py-1.5 p-2 text-gray-900 shadow-sm 
                        ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                         focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div class="flex gap-3 my-6 justify-end">
                <button @click="addUser" class="px-3 py-2 border bg-blue-500 rounded-lg text-white">
                    Save
                </button>

                <router-link to="/" class="px-3 py-2 border bg-slate-300 rounded-lg text-slate-700">
                    Cancel
                </router-link>
            </div>

        </div>
    </template>
    <template v-if="user?.loading">
        <div class="flex justify-center">
            <svg
                class="animate-spin h-8 w-8  border-2 border-r-blue-200 border-slate-500 rounded-full justify-self-center"></svg>
        </div>
    </template>

    <template v-if="user?.error">
        <div class="text-center m-5">
            <div class="text-red-500 font-bold">Error loading user: {{ user.error }}</div>
        </div>
    </template>
</template>