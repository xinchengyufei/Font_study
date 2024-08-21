<script setup lang="ts">
import { useAdd } from '../hooks/useAdd';
import { useDel } from '../hooks/useDel';

const { arr, msg, handleUp } = useAdd()
const { handleDel } = useDel(arr)
</script>

<template>
    <div>
        <input type="text" @keyup="handleUp" v-model="msg">
        <ul>
            <li v-for="item in arr" :key="item.id" @click="handleDel(item.id)">{{ item.name }}</li>
        </ul>
    </div>
</template>

<style scoped></style>