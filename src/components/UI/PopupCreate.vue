<template>
	<div class="popupCreate">
		<Button :text="text" :type="type" :onClick="openDropdown" />
		<div class="popupCreate__dropdown" v-if="opened">
			<input type="text" placeholder="Название" v-model="name" />
			<input type="text" placeholder="Описание" v-model="desc" />
			<div class="popupCreate__action">
				<Button text="Отмена" type="danger" size="small" :onClick="onCancel" />
				<Button text="Подтвердить" type="primary" size="small" :onClick="onOk" />
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
	import Button from './Button'
	export default {
		props: {
			text: String,
			type: String
		},
		components: {
			Button
		},
		data() {
			return {
				opened: false,
				name: '',
				desc: ''
			}
		},
		methods: {
			...mapActions('todos', ['createAction']),
			onClickOutside(e) {
				this.opened = this.$el.contains(e.target) && this.opened
			},
			openDropdown() {
				this.opened = true
			},
			onOk() {
				this.createAction({
					id: this.name,
					title: this.desc,
					comspleted: false
				})
				this.opened = false
			},
			onCancel() {
				this.name = ''
				this.desc = ''
				this.opened = false
			}
		},
		created() {
			document.addEventListener('click', this.onClickOutside)
		},
		beforeDestroy() {
			document.removeEventListener('click', this.onClickOutside)
		}
	}
</script>

<style lang="scss">
	.popupCreate {
		position: relative;

		&__dropdown {
			position: absolute;
			right: 0;
			top: 100%;
			padding: 15px;
			background-color: #fff;
			border: 1px solid #dfdfdf;
			border-radius: 5px;
			input {
				background-color: #f5f5f5;
				border: 1px solid transparent;
				padding: 10px 15px;
				outline: none;
				border-radius: 3px;
				&:focus {
					border: 1px solid #3685fc;
				}
				&:not(:last-child) {
					margin-bottom: 10px;
				}
			}
		}
		&__action {
			display: flex;
			justify-content: flex-end;
		}
	}
</style>
