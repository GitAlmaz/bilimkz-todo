<template>
  <div class="home">
    <div class="container">
      <NavBar />
      <TodoList />
    </div>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList'
import NavBar from '@/components/NavBar'
export default {
  name: 'Home',
  components: {
    TodoList,
    NavBar
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    max-width: 1170px;
    margin: 0 auto;
    padding: 0 15px;
  }
</style>
