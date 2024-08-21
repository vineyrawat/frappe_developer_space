<template>
    <div class="w-60 bg-primary-foreground border-r  flex flex-col" style="height: calc(100vh - 3rem);">
        <Button variant="ghost" disabled class="w-full flex justify-start gap-2 items-start">
            <p>{{ $route.params.id.toUpperCase() }}</p>
        </Button>
        <RouterLink v-for="route in routes[$route.params.id] ?? []" :to="`/${$route.params.id}/${route.route}`">
            <Button :variant="`${$route.path.includes(route.route) ? '' : 'ghost'}`"
                class="w-full flex justify-start gap-2 items-start">
                <component :is="route.icon" size="20" />
                {{ route.label }}
            </Button>
        </RouterLink>
    </div>
    <div class="flex-1">
        <RouterView />
    </div>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { Braces, Database } from 'lucide-vue-next';
import { RouterView } from 'vue-router';

const routes =
{
    "developer": [

        {
            icon: Braces,
            label: "Server Scripts",
            route: "server-scripts"
        },
    ]
}

</script>