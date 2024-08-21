<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { python } from '@codemirror/lang-python';
import { Bug, Copy, DeleteIcon } from 'lucide-vue-next';
import { shallowRef } from 'vue';
import { Codemirror } from 'vue-codemirror';

const extensions = [python()]

const view = shallowRef()

const handleReady = (payload) => {
    view.value = payload.view
}



</script>

<template>
    <div class="flex px-5 py-2 items-center justify-between bg-primary-foreground border-b">
        <div class="flex items-center gap-2">
            <h2 class="font-medium">
                {{ $route.params.script }}
            </h2>
        </div>
        <div class="flex items-center gap-2">
            <Button variant="destructive" size="xs">
                Delete
            </Button>
            <Switch />
        </div>
    </div>
    <div class="flex-1 container border  max-w-screen-lg mx-auto mt-5 py-5 flex flex-col gap-2">
        <div class="flex justify-between items-center">
            <h2 class="font-medium">
                Status
            </h2>
            <Badge>Enabled</Badge>
        </div>
        <div class="flex justify-between items-center">
            <h2 class="font-medium">
                Script Type
            </h2>
            <div class="flex items-center gap-2">
                <p>API</p>
            </div>
        </div>
        <div class="flex justify-between items-center">
            <h2 class="font-medium">
                Reference Document Type
            </h2>
            <div class="flex items-center gap-2">
                <p>Lead</p>
            </div>
        </div>
        <div class="flex justify-between items-center">
            <h2 class="font-medium">
                DocType Event
            </h2>
            <div class="flex items-center gap-2">
                <p>Before Insert</p>
            </div>
        </div>
        <div class="flex justify-between items-center">
            <h2 class="font-medium">
                Event Frequency
            </h2>
            <div class="flex items-center gap-2">
                <p>Hourly</p>
            </div>
        </div>
        <div class="flex justify-between items-center">
            <h2 class="font-medium">
                API Method
            </h2>
            <div class="flex items-center gap-2">
                <div class="flex items-center">
                    <Badge variant="outline" class="rounded-none">Base URL</Badge>
                    <badge class="text-primary font-mono rounded-none" variant="outline">
                        /api/method/get_all_users
                    </badge>
                    <Copy class="ml-2" :size="18" />
                </div>
            </div>
        </div>
    </div>
    <div class="flex-1 container border  max-w-screen-lg mx-auto mt-5 py-5 flex flex-col gap-2">
        <div class="flex justify-between items-center">
            <h2 class="font-medium">
                Script
            </h2>
            <RouterLink :to="`/${$route.params.id}/server-scripts/${$route.params.script}/edit`">
                <Button size="sm">
                    <Bug :size="18" class="mr-2" /> Edit
                </Button>
            </RouterLink>
        </div>
        <div class="relative">
            <div class="absolute inset-0 bg-white opacity-10 z-10"></div>
            <Codemirror :style="{ height: '40vh' }" :model-value="`print('Hello World')`" class="flex-1"
                placeholder="Code goes here..." :indent-with-tab="true" :tab-size="4" :extensions="extensions"
                @ready="handleReady" />
        </div>
    </div>
</template>