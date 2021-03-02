<template>
	<div class="navBar">
		<div class="navBar__logo">
			<div class="logo">
				TODO APP
			</div>
		</div>
		<Button
			v-if="checkedTodos.length"
			text="Удалить"
			type="danger"
			:onClick="deleteHandler"
		/>
		<Button text="Фильтр" :onClick="sortHandler" />
		<PopupCreate modalText="" text="Создать" type="primary" />
	</div>
</template>

<script>
	import Button from '@/components/UI/Button'
	import PopupCreate from '@/components/UI/PopupCreate'
	import { mapActions, mapGetters, mapMutations } from 'vuex'
	export default {
		components: {
			Button,
			PopupCreate
		},
		computed: {
			...mapGetters('todos', ['checkedTodos', 'sorted'])
		},
		methods: {
			...mapActions('todos', ['deleteAction', 'sortList']),
			...mapMutations('todos', ['filterList', 'resetFilter', 'setSorted']),
			deleteHandler() {
				this.deleteAction(this.checkedTodos)
			},
			// В преоктах такие функции хелперы я обычно переношу в папку Helpers/index.js
			sortByTitle: (a, b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0,
			resetSortDef: (a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0,
			sortHandler() {
				if (!this.sorted) {
					alert('Сортировку сделал по колонке описание так как имя у меня создается все с "Задача"')
					this.filterList(this.sortByTitle)
					this.setSorted(true)
				} else {
					this.resetFilter(this.resetSortDef)
					this.setSorted(false)
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.navBar {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 15px 0;
		&__logo {
			margin-right: auto;
		}
	}
	.logo {
		font-size: 22px;
		font-weight: bold;
	}
</style>
