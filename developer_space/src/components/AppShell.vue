<template>
    <div class="flex relative">
        <div class="flex flex-col text-primary-foreground w-20 bg-gray-700 " style="height: calc(100vh - 3rem);">
            <TooltipProvider v-for="item in data">
                <Tooltip>
                    <TooltipTrigger as-child>
                        <RouterLink :to="`/${item.route}`">
                            <Button variant="ghost"
                                :class="`bg-red ${$route.params.id == item.route ? 'bg-primary' : ''}  w-full h-12 hover:bg-gray-800 hover:text-white`"
                                size="icon">
                                <component :is="item.icon" size="18"></component>
                            </Button>
                        </RouterLink>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{{ item.title }}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
        <RouterView />
    </div>
</template>
<script setup>
import { Code } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { RouterLink, RouterView } from 'vue-router';

const data = [
    {
        title: "Developer",
        icon: Code,
        route: "developer"
    }
]
</script>