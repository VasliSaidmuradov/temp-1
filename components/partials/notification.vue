<template>
	<transition name="slide-fade">
		<div v-if="is_visible" :class="['notification', notification.class]">
			<p>{{ notification.message }}</p>
		</div>
	</transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	props: ['notification'],
	data() {
		return {
			is_visible: true,
		}
	},
	mounted() {
		setTimeout(() => {
			this.is_visible = false
    }, 3000)
	}
}
</script>
