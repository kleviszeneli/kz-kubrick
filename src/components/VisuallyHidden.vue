<template>
	<component :is="as" class="visually-hidden">
		<slot></slot>
	</component>
</template>

<script>
	export default {
		props: {
			as: {
				type: [String, Object],
				default: 'div'
			}
		}
	}
</script>

<style>
	.visually-hidden {
		clip: rect(1px, 1px, 1px, 1px);
		clip-path: inset(50%);
		height: 1px;
		width: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
	}
</style>