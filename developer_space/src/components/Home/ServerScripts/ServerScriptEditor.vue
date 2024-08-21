<script setup>
// import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import { ref, shallowRef } from 'vue'
import { Button } from '@/components/ui/button';
import { Codemirror } from 'vue-codemirror'
import { python } from '@codemirror/lang-python'
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
import { BugPlay, Loader2 } from 'lucide-vue-next';
import { pythonAutoCompletes } from '@/components/constants/autocompletes';

const extensions = [python()]

const view = shallowRef()
const handleReady = (payload) => {
    view.value = payload.view
}

const log = console.log

const code = ref('')
const isExecuting = ref(false)

const handleExecute = () => {
    isExecuting.value = true
    setTimeout(() => {
        isExecuting.value = false
    }, 3000);
}

</script>

<template>
    <div class="flex flex-col h-full relative">
        <div
            :class="`w-full ${!isExecuting ? 'hidden' : 'flex'} transition-all duration-300  absolute h-full bg-gray-900 opacity-80  items-center justify-center flex-col z-10`">
            <Loader2 class="animate-spin text-primary" size="40" />
            <p class="text-xl text-primary-foreground">Executing...</p>
        </div>
        <div class="flex justify-between p-2 h-14 items-center border-b">
            <h2 class="font-medium">
                {{ $route.params.script }}
            </h2>
            <div class="flex gap-2">
                <Button variant="outline" size="sm">Save</Button>
                <Dialog>
                    <DialogTrigger as-child>
                        <Button size="sm">
                            <BugPlay size="18" class="mr-2" /> Execute
                        </Button>
                    </DialogTrigger>
                    <DialogContent class="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Select Lead</DialogTitle>
                            <DialogDescription>
                                Select lead to execute script
                            </DialogDescription>
                        </DialogHeader>
                        <div class="grid flex-1 gap-2">
                            <Label for="link" class="sr-only">
                                Lead
                            </Label>
                            <Input id="link" default-value="LEAD00991" read-only />
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
        <codemirror :style="{ height: '80vh' }" v-model="code" class="flex-1" placeholder="Code goes here..."
            :autofocus="true" :indent-with-tab="true" :tab-size="4" :extensions="extensions" @ready="handleReady"
            @change="log('change', $event)" @focus="log('focus', $event)" @blur="log('blur', $event)" />
        <div class="flex flex-1 items-center justify-between">

        </div>
    </div>
</template>