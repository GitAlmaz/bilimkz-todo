export default {
	namespaced: true,
	state: {
		list: [], // object[]
		loading: false,
		checkedTodos: [], // number[]
		sorted: false
	},
	mutations: {
		setList: (state, payload) => (state.list = payload),
		setLoading: (state, payload) => (state.loading = payload),
		deleteFromList: (state, payload) => {
			state.list = state.list.filter(it => !payload.includes(it.id))
			state.checkedTodos = []
		},
		addCheckedTodos: (state, payload) =>
			(state.checkedTodos = [...state.checkedTodos, payload]),
		removeCheckedTodos: (state, payload) =>
			(state.checkedTodos = state.checkedTodos.filter(it => it !== payload)),
		addToList: (state, payload) => (state.list = [...state.list, payload]),
		filterList: (state, payload) => {
			/**
			 * Фильтр делал по колонке описание
			 */
			state.list.sort(payload)
		},
		resetFilter: (state, payload) => {
			state.list.sort(payload)
		},
		setSorted: (state, payload) => state.sorted = payload
	},
	actions: {
		async fetchTodos({ commit }) {
			commit('setLoading', true)
			/**
			 * Реализую через промис по ТЗ
			 */
			fetch('https://jsonplaceholder.typicode.com/todos')
				.then(response => response.json())
				.then(json => {
					const arr = json.slice(0, 10) // slice делаю, чтоб просто записей много не было
					json.slice(0, 10).map(item => (item.completed = false)) // для того, чтоб убрать checked у чекбокса
					setTimeout(() => {
						commit('setList', arr)
						commit('setLoading', false)
					}, 3000)
				})
				.catch(error => {
					commit('setLoading', false)
					throw error
				})
			/**
			 * реализация es6+
			 * try {
			 * 	const res = await fetch('https://jsonplaceholder.typicode.com/todos')
			 * 	const json = await res.json()
			 * 	commit('setList', json)
			 * } catch (error) {
			 * 	commit('setLoading', false)
			 * 	throw error
			 * }
			 */
		},
		async deleteAction({ commit }, payload) {
			/**
			 * тут запрос на сервер с payload
			 */
			commit('deleteFromList', payload)
		},
		async createAction({ commit }, payload) {
			/**
			 * Тут снова запрос на сервер POST
			 */
			try {
				commit('addToList', payload)
			} catch (error) {
				throw error
			}
		}
	},
	getters: {
		getList: state => state.list,
		isLoading: state => state.loading,
		checkedTodos: state => state.checkedTodos,
		sorted: state => state.sorted
	}
}
