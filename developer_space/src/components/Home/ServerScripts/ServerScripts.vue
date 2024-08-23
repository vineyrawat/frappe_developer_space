<script setup lang="ts">
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button';
import { AlignHorizontalDistributeCenter, EditIcon, History, PlugZap, ShieldEllipsisIcon } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import GlobalLoader from '@/components/GlobalLoader.vue';
import axios from 'axios';
import { Badge } from '@/components/ui/badge';

const fetchingScripts = ref(true)
const error = ref(null)
const serverScripts = ref([])

async function toggleScript(script) {
    console.log("Toggling: ", script)
    try {
        const res = await axios.put(`/api/resource/Server Script/${script.name}`, {
            disabled: !script.disabled
        })
        console.log(res.data)
        fetchScripts()
    } catch (error) {

    }
}

async function fetchScripts() {
    console.log("FETCHING SCRIPTS")
    fetchingScripts.value = true
    error.value = null
    try {
        const res = await axios.get(`/api/resource/Server Script?fields="*"`, {
        })
        console.log(res.data)
        serverScripts.value = res.data.data
    } catch (error) {
        error.value = error?.message.toString()
    } finally {
        fetchingScripts.value = false
    }
}

const getIcon = (type) => {
    switch (type) {
        case "DocType Event":
            return AlignHorizontalDistributeCenter
        case "API":
            return PlugZap
        case "Scheduler Event":
            return History
        case "Permission Query":
            return ShieldEllipsisIcon
    }
}

onMounted(() => {
    fetchScripts()
})

</script>

<template>
    <div class="container my-5">
        <div class="flex justify-between">
            <h1 class="font-medium">Server Scripts</h1>
            <Button>Add Script</Button>
        </div>
        <div class="flex items-center justify-center flex-col p-10" v-if="fetchingScripts">
            <GlobalLoader />
            <p class="text-sm mt-2">Fetching Scripts</p>
        </div>
        <div class="flex items-center justify-center flex-col p-10" v-if="error">
            <p class="text-sm mt-2">{{ error }}</p>
        </div>
        <Table v-if="!fetchingScripts && !error">
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Script Name
                    </TableHead>
                    <TableHead>Script Type</TableHead>
                    <TableHead class="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="script in serverScripts" :key="script.name">
                    <TableCell class="font-medium">
                        <RouterLink :to="`/${$route.params.id}/server-scripts/${script.name}`">
                            {{ script.name }}
                        </RouterLink>
                    </TableCell>
                    <TableCell class="font-medium">
                        <span>
                            <Badge variant="secondary" class="flex items-center w-fit  gap-2">
                                <component :is="getIcon(script.script_type)" :size="16" />
                                {{ script.script_type }}
                            </Badge>
                        </span>
                    </TableCell>
                    <TableCell class="text-right">
                        <div class="flex items-center justify-end gap-2">
                            <RouterLink :to="`/${$route.params.id}/server-scripts/${script.name}`">
                                <Button variant="outline">
                                    <EditIcon :size="18" class="mr-2" /> Edit
                                </Button>
                            </RouterLink>
                            <Button variant="ghost" @click="toggleScript(script)">
                                <Switch :checked="script.disabled != 1" />
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>