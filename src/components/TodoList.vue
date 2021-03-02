<template>
	<div class="todoList">
		<p v-if="isLoading">Loading ...</p>
		<div class="table" v-else>
			<div class="table__head">
				<div class="table__row">
					<div class="table__col table__col--check">
						<input type="checkbox" @change="toggleAllHandler" />
					</div>
					<div class="table__col table__col--counter">№</div>
					<div class="table__col table__col--name">Название</div>
					<div class="table__col table__col--desc">Описание</div>
				</div>
			</div>
			<div class="table__body">
				<div class="table__row" v-for="(todo, idx) in getList" :key="todo.id">
					<div class="table__col table__col--check">
						<input
							type="checkbox"
							:checked="todo.completed"
							:name="`todo_${todo.id}`"
							:id="todo.id"
							@change="(e) => checkHandler(e, todo.id)"
						/>
					</div>
					<div class="table__col table__col--counter">{{ idx + 1 }}</div>
					<div class="table__col table__col--name">
						{{ `Задача ${todo.id}` }}
					</div>
					<div class="table__col table__col--desc">{{ todo.title }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters, mapMutations } from 'vuex'
	/**
	 * Table тоже в отдельный компонент можно вынести и туда просто в пропсы дату передавать, для того чтоб переиспользовать
	 */
	export default {
		data() {return {}},
		computed: {
			...mapGetters('todos', ['getList', 'isLoading'])
		},
		methods: {
			...mapActions('todos', ['fetchTodos']),
			...mapMutations('todos', ['addCheckedTodos', 'removeCheckedTodos']),
			toggleAllHandler(e) {
				if (e.target.checked) {
					this.addCheckedTodos(id)
				}
			},
			checkHandler(e, id) {
				if (e.target.checked) {
					this.addCheckedTodos(id)
				} else {
					this.removeCheckedTodos(id)
				}
			}
		},
		mounted() {
			this.fetchTodos()
		}
	}
</script>

<style lang="scss">
	.table {
		width: 100%;

		&__head {
			border: 1px solid #dfdfdf;
			border-radius: 5px 5px 0 0;
			overflow: hidden;
		}
		&__body {
			border: 1px solid #dfdfdf;
			border-top: none;
			border-radius: 0 0 5px 5px;
			overflow: hidden;
		}
		&__row {
			width: 100%;
			display: flex;
			justify-content: space-between;
			&:nth-child(2n) {
				background-color: #f5f5f5;
			}
		}
		&__col {
			padding: 15px;
			text-align: left;
			word-break: break-all;
			&:not(:last-of-type) {
				border-right: 1px solid #dfdfdf;
			}
			&--check {
				width: 2%;
			}
			&--counter {
				width: 2%;
			}
			&--name {
				width: 20%;
			}
			&--desc {
				width: 76%;
			}
		}
	}
</style>
