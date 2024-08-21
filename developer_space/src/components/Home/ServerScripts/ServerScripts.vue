<script setup lang="ts">
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button';
import { EditIcon } from 'lucide-vue-next';


const Scripts = [
    {
        name: 'Script 1',
        enabled: 1
    },
]
</script>

<template>
    <div class="container my-5">
        <div class="flex justify-between">
            <h1 class="font-medium">Server Scripts</h1>
            <Button>Add Script</Button>
        </div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Script Name
                    </TableHead>
                    <TableHead class="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="script in Scripts" :key="script.name">
                    <TableCell class="font-medium">
                        <RouterLink :to="`/${$route.params.id}/server-scripts/${script.name}`">
                            {{ script.name }}
                        </RouterLink>
                    </TableCell>
                    <TableCell class="text-right">
                        <div class="flex items-center justify-end gap-2">
                            <RouterLink :to="`/${$route.params.id}/server-scripts/${script.name}`">
                                <Button variant="outline">
                                    <EditIcon :size="18" class="mr-2" /> Edit
                                </Button>
                            </RouterLink>
                            <Switch :checked="script.enabled == 1" />
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>