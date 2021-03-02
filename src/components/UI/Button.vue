<template> 
	<button class="btn" :class="[(type ? `btn--${type}` : ''), (size ? `btn--${size}` : '')]" @click.prevent="onClick">
		{{text}}
	</button>
</template>

<script>
export default {
	props: {
		text: String,
		type: String,
		size: String,
		onClick: Function
	}
}
</script>

<style lang="scss">
	.btn {
		font-size: 14px;
		color: #0063f8;
		border: 1px solid #0063f8;
		border-radius: 5px;
		padding: 10px 20px;
		cursor: pointer;
		transition: .2s;
		margin: 5px;
		&:hover {
			background-color: #0063f8;
			color: #fff;
		}
		&--primary {
			color: #fff;
			background-color: #0063f8;
			&:hover {
				background-color: darken(#0063f8, 10%);
			}
		}
		&--danger {
			color: #fff;
			background-color: #ff342d;
			border: 1px solid #ff342d;
			&:hover {
				background-color: darken(#ff342d, 10%);
			}
		}
		&--small {
			padding: 5px 10px;
		}
	}
</style>