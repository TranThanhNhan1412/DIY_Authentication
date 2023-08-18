<script setup>
import { storeToRefs } from 'pinia';

import { useAlertStore } from '@/stores';
import { watch } from 'vue';

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);

watch(alert, () => {
    if (alert) {
        setTimeout(() => {
            alertStore.clear()
        }, 2500);
    }
})
</script>

<template>
    <div v-if="alert" class="fixed top-20 right-1 z-20 rounded-lg 
    shadow-xl  animate-bounce-alert " :class="alert.type">
        <div class="m-3">
            <div class="alert alert-dismissable" :class="alert.type">
                {{ alert.message }}
            </div>
        </div>
    </div>
</template>

<style>
.alert-success {
    @apply bg-green-500 text-slate-50 opacity-90
}

.alert-danger {
    @apply bg-red-500 text-slate-50 opacity-90
}

.animate-bounce-alert {
    animation: bounce 1.5s infinite;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(-25%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }

    50% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
}
</style>