<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { python } from '@codemirror/lang-python';
import axios from 'axios';
import { AlignHorizontalDistributeCenter, Bug, Copy, History, PlugZap, ShieldEllipsisIcon } from 'lucide-vue-next';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { shallowRef } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { useRoute } from 'vue-router';
const route = useRoute()

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


const extensions = [python()]

const view = shallowRef()

const handleReady = (payload) => {
    view.value = payload.view
}

const fetchingScriptDetails = ref(true)
const error = ref(null)
const scriptDetails = ref(null)

async function fetchScriptDetails() {
    console.log("FETCHING SCRIPT DETAILS")
    fetchingScriptDetails.value = true
    error.value = null
    try {
        const res = await axios.get(`/api/resource/Server Script/${route.params.script}?fields="*"`, {
        })
        console.log(res.data)
        scriptDetails.value = res.data.data
    } catch (error) {
        console.log(error)
        error.value = error?.message.toString()
    } finally {
        fetchingScriptDetails.value = false
    }
}



async function toggleScript(script) {
    console.log("Toggling: ", script)
    try {
        const res = await axios.put(`/api/resource/Server Script/${script.name}`, {
            disabled: !script.disabled
        })
        console.log(res.data)
        fetchScriptDetails()
    } catch (error) {

    }
}

onMounted(() => {
    fetchScriptDetails()
})

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
            <Button variant="ghost" @click="toggleScript(scriptDetails)">
                <Switch :checked="scriptDetails?.disabled != true" />
            </Button>
        </div>
    </div>
    <div class="flex-1 container border  max-w-screen-lg mx-auto mt-5 py-5 flex flex-col gap-2">
        <div class="flex justify-between items-center">
            <h2 class="font-medium">
                Status
            </h2>
            <Badge :variant="scriptDetails?.disabled == 1 ? 'destructive' : ''">{{ scriptDetails?.disabled ?
                'Disabled' : 'Enabled' }}</Badge>
        </div>
        <div class="flex justify-between items-center">
            <h2 class="font-medium">
                Script Type
            </h2>
            <div class="flex items-center gap-2">
                <span>
                    <Badge variant="secondary" class="flex items-center w-fit  gap-2">
                        <component :is="getIcon(scriptDetails?.script_type ?? '')" :size="16" />
                        {{ scriptDetails?.script_type ?? '' }}
                    </Badge>
                </span>
            </div>
        </div>
        <div v-if="['DocType Event', 'Permission Query'].includes(scriptDetails?.script_type ?? '')"
            class="flex justify-between items-center">
            <h2 class="font-medium">
                Reference Document Type
            </h2>
            <div class="flex items-center gap-2">
                <p>{{ scriptDetails?.reference_doctype ?? '-' }}</p>
            </div>
        </div>
        <div v-if="scriptDetails?.script_type == 'DocType Event'" class="flex justify-between items-center">
            <h2 class="font-medium">
                DocType Event
            </h2>
            <div class="flex items-center gap-2">
                <p>{{ scriptDetails?.doctype_event ?? '-' }}</p>
            </div>
        </div>
        <div v-if="scriptDetails?.script_type == 'Scheduler Event'" class="flex justify-between items-center">
            <h2 class="font-medium">
                Event Frequency
            </h2>
            <div class="flex items-center gap-2">
                <p>{{ scriptDetails?.event_frequency ?? '-' }}</p>
            </div>
        </div>
        <div v-if="scriptDetails?.script_type == 'API'" class="flex justify-between items-center">
            <h2 class="font-medium">
                API Method
            </h2>
            <div class="flex items-center gap-2">
                <div class="flex items-center">
                    <Badge variant="outline" class="rounded-none">Base URL</Badge>
                    <badge class="text-primary font-mono rounded-none" variant="outline">
                        `/api/method/{{ scriptDetails?.api_method ?? '-' }}`
                    </badge>
                    <Copy class="ml-2" :size="18" />
                </div>
            </div>
        </div>
        <div class="flex justify-between items-center">
            <h2 class="font-medium">
                Module
            </h2>
            <div class="flex items-center gap-2">
                <p>{{ scriptDetails?.module ?? '-' }}</p>
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
            <div class="overflow-hidden">
                <Codemirror :style="{ height: '40vh' }" :model-value="scriptDetails?.script ?? ''" class="flex-1"
                    placeholder="Code goes here..." :indent-with-tab="true" :tab-size="4" :extensions="extensions"
                    @ready="handleReady" />
            </div>
        </div>
    </div>
</template>