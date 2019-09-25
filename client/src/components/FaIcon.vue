<template>
	<font-awesome-icon class="rb-icon" :icon="iconArray" />
</template>

<script>
	export default {
		name: 'FaIcon',
		props: {
			brand: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			iconArray() {
				const arr = [];

				if (this.brand) {
					arr.push('fab');
				} else {
					arr.push('fa');
				}

				arr.push(this.$slots.default[0].text.trim());

				return arr;
			}
		}
	}
</script>

<style lang="scss" scoped></style>
