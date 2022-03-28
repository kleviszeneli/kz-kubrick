<script setup>
import { ref } from "vue";
import LoadingSpinner from "../LoadingSpinner.vue"

const emit = defineEmits(['click']);
const loading = ref(false);

const handleClick = () => {
    if(loading.value) return;

    loading.value = true;
    const mockPromise = new Promise((resolve,reject) => {
        try {
            setTimeout(()=>{
                loading.value = false;
                resolve({status:'success'})
            },1000)
        } catch (err) {
            reject(err)
        };
    })
}

</script>

<template>
    <button @click="handleClick">
        <slot v-if="!loading">Submit</slot>
        <slot v-else name="loadingSlot"><LoadingSpinner /></slot>
    </button>
</template>