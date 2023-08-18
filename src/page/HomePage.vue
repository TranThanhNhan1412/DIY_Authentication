<script setup>
import { storeToRefs } from 'pinia';

import { useUsersStore } from '@/stores';
const usersStore = useUsersStore();

const { users } = storeToRefs(usersStore);

usersStore.getAll();

const user = JSON.parse(localStorage.getItem("user"));

</script>
<template>
    <div class="grid gap-y-3">

        <div class="flex justify-between items-center">
            <div class="text-xl">
                Welcome - {{ user.lastName }} {{ user.firstName }}({{ user.username }})
            </div>
            <RouterLink to="/users/add_edit/add" class="px-3 py-2 border bg-blue-300 rounded-lg float-right">
                Add User
            </RouterLink>
        </div>
        <hr class="h-[2px] bg-slate-300">
        <div>
            <table class="table-auto w-full">
                <thead>
                    <tr>
                        <th class="border border-slate-300 text-center bg-slate-500 text-slate-50 py-2">ID</th>
                        <th class="border border-slate-300 text-center bg-slate-500 text-slate-50 py-2">First Name</th>
                        <th class="border border-slate-300 text-center bg-slate-500 text-slate-50 py-2">Last Name</th>
                        <th class="border border-slate-300 text-center bg-slate-500 text-slate-50 py-2">Username</th>
                        <th class="border border-slate-300 text-center bg-slate-500 text-slate-50 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="users.length">

                        <tr v-for="userItem in usersStore.users"
                            :class="{ 'font-semibold bg-blue-200 ': userItem.id === user.id }">
                            <td class="border border-slate-300 p-1">{{ userItem.id }}</td>
                            <td class="border border-slate-300 p-1">{{ userItem.firstName }}</td>
                            <td class="border border-slate-300 p-1">{{ userItem.lastName }}</td>
                            <td class="border border-slate-300 p-1">{{ userItem.username }}</td>
                            <td class="border border-slate-300 p-1">
                                <RouterLink :to="`/users/add_edit/edit/${userItem.id}`"
                                    class="px-3 py-2 border bg-blue-300 rounded-lg  mr-3">
                                    Edit
                                </RouterLink>
                                <button @click="usersStore.delete(userItem.id)"
                                    class="px-3 py-2 border bg-red-300 rounded-lg btn-danger btn-delete-user"
                                    :disabled="userItem.isDeleting">
                                    <div v-if="userItem.isDeleting">
                                        <svg
                                            class="animate-spin h-8 w-8  border-2 border-r-blue-200 border-slate-500 rounded-full justify-self-center"></svg>

                                    </div>
                                    <span v-else>Delete</span>
                                </button>
                            </td>
                        </tr>

                    </template>
                    <tr v-if="users.loading">
                        <td colspan="5" class="text-center border border-slate-300 p-3 ">
                            <div class="flex justify-center">
                                <svg
                                    class="animate-spin h-8 w-8  border-2 border-r-blue-200 border-slate-500 rounded-full justify-self-center"></svg>
                            </div>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
