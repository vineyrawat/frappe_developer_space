<template>
    <div
        class="flex items-center justify-between bg-gradient-to-r from-blue-500 to-cyan-500  h-12 px-5 text-white font-medium w-full">
        <p>Frappe Developer Space</p>
        <Button variant="ghost" size="icon">
            <LogOut />
        </Button>
    </div>
</template>
<script setup>
import Button from '@/components/ui/button/Button.vue';
import { LogOut } from 'lucide-vue-next';

</script>