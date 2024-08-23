<script setup>
import { onMounted, ref, shallowRef } from 'vue'
import { Button } from '@/components/ui/button';
import { Codemirror } from 'vue-codemirror'
import { python } from '@codemirror/lang-python'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BugPlay, CheckCircle, Loader2, ShieldX } from 'lucide-vue-next';
import { pythonAutoCompletes } from '@/components/constants/autocompletes';
import GlobalLoader from '@/components/GlobalLoader.vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { Switch } from '@/components/ui/switch';
import { toast } from 'vue-sonner';

const route = useRoute()

const extensions = [python()]

const view = shallowRef()
const handleReady = (payload) => {
    view.value = payload.view
}

const log = console.log

const code = ref('')
const isExecuting = ref(false)
const selectedResource = ref(null)
const alwaysOpenOutputAfterExecute = ref(true)


const fetchingScriptDetails = ref(true)
const error = ref(null)
const scriptDetails = ref(null)
const lastOutput = ref(null)
const outputSheetOpen = ref(false)
const router = useRouter()

const handleExecute = async () => {
    console.log("EXECUTING SCRIPT")
    isExecuting.value = true
    try {
        await saveScript()
        const res = await axios.post(`/api/method/frappe_developer_space.api.server_script.execute_script`, {
            script_doc_name: route.params.script,
            selected_resource: selectedResource.value,
        })
        console.log("RES: ", res.data)
        toast('Script Executed', {
            description: 'Script executed successfully',
            icon: CheckCircle
        })
        lastOutput.value = {
            type: 'info',
            message: res.data
        }
    } catch (err) {
        console.log("ERROR: ", err)
        toast('Unable to execute', {
            description: 'Unable to execute script',
            icon: ShieldX
        })
        lastOutput.value = {
            type: 'error',
            message: (err.response?.data ?? "")
        }
    } finally {
        isExecuting.value = false
        console.log(alwaysOpenOutputAfterExecute.value)
        if (alwaysOpenOutputAfterExecute.value) {
            outputSheetOpen.value = true
        }
    }
}

async function saveScript() {
    console.log("SAVING SCRIPT")
    try {
        await axios.put(`/api/resource/Server Script/${route.params.script}`, {
            script: code.value
        })
        toast('Script Saved', {
            description: 'Script saved successfully',
            icon: CheckCircle
        })
    } catch (err) {
        console.log("ERROR: ", err)
        toast('Unable to save', {
            description: 'Unable to save script',
            icon: ShieldX
        })
    }
}

async function handleSave() {
    await saveScript()
    // go back to script details
    router.go(-1)
}

async function fetchScriptDetails() {
    console.log("FETCHING SCRIPT DETAILS")
    fetchingScriptDetails.value = true
    error.value = null
    try {
        const res = await axios.get(`/api/resource/Server Script/${route.params.script}?fields="*"`, {
        })
        console.log(res.data)
        scriptDetails.value = res.data.data
        code.value = res.data.data.script
    } catch (error) {
        console.log(error)
        error.value = error?.message.toString()
    } finally {
        fetchingScriptDetails.value = false
    }
}


onMounted(() => {
    fetchScriptDetails()
})


</script>

<template>
    <div class="flex flex-col h-full relative">
        <div
            :class="`w-full ${!isExecuting ? 'hidden' : 'flex'} transition-all duration-300  absolute h-full bg-gray-900 opacity-80  items-center justify-center flex-col z-10`">
            <GlobalLoader />
            <p class="text-xl text-primary-foreground">Executing...</p>
        </div>
        <div class="flex justify-between p-2 h-14 items-center border-b">
            <h2 class="font-medium">
                {{ $route.params.script }}
            </h2>
            <div class="flex gap-2">
                <Button variant="outline" size="sm" @click="handleSave">Save</Button>
                <Dialog>
                    <DialogTrigger as-child>
                        <Button size="sm">
                            <BugPlay size="18" class="mr-2" /> Execute
                        </Button>
                    </DialogTrigger>
                    <DialogContent v-if="scriptDetails?.script_type == 'DocType Event'"
                        class="sm:max-w-md overflow-y-scroll">
                        <DialogHeader>
                            <DialogTitle>Select {{ scriptDetails?.reference_doctype }}</DialogTitle>
                            <DialogDescription>
                                Select {{ scriptDetails?.reference_doctype }} to execute script
                            </DialogDescription>
                        </DialogHeader>
                        <div class="grid flex-1 gap-2">
                            <Label for="link" class="sr-only">
                                Lead
                            </Label>
                            <Input id="link" v-model="selectedResource"
                                :placeholder="`Select ${scriptDetails?.reference_doctype}`" read-only />
                        </div>
                        <DialogFooter>
                            <DialogClose as-child>
                                <Button type="button" variant="secondary">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <DialogClose as-child>
                                <Button :onclick="handleExecute" type="submit" size="sm" class="px-3">
                                    Execute
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
        <div>
            <codemirror :style="{ height: '80vh', maxWidth: '70rem' }" v-model="code" placeholder="Code goes here..."
                :autofocus="true" :indent-with-tab="true" :tab-size="4" :extensions="extensions" @ready="handleReady"
                @change="log('change', $event)" @focus="log('focus', $event)" @blur="log('blur', $event)" />
            <div class="flex flex-1 items-center gap-2 p-2 justify-between">
                <span class="flex-1"></span>
                <Label>Always Open Output</Label>
                <Switch :checked="alwaysOpenOutputAfterExecute"
                    v-on:update:checked="alwaysOpenOutputAfterExecute = $event" />
                <Sheet :open="outputSheetOpen" v-on:update:open="outputSheetOpen = $event">
                    <SheetTrigger @click="outputSheetOpen = true">
                        <Button v-if="lastOutput?.type == 'error'" variant="destructive" size="xs">
                            See Error
                        </Button>
                        <Button v-if="lastOutput?.type == 'info'" size="xs">
                            See Output
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>{{ lastOutput?.type }}</SheetTitle>
                            <SheetDescription
                                :class="`${lastOutput?.type == 'error' ? 'text-red-500' : 'text-green-500'}`">
                                {{ lastOutput?.message }}
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    </div>
</template>