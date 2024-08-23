<template>
	<div>
		<Header />
		<router-view />
		<Toaster />
	</div>
</template>


<script>
import Header from './components/Header.vue';
import { Toaster } from '@/components/ui/sonner'
export default {
	inject: ['$auth'],
	components: {
		Header,
		Toaster
	}
};
</script>
