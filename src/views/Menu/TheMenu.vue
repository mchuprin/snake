<template>
  <div :class="$style.TheMenu">
    <div :class="$style.title">
      <h1>Snake</h1>
      <h2>JS Edition</h2>
      <router-link to="/game" class="button">НАЧАТЬ</router-link>
      <router-link to="/settings" class="button">НАСТРОЙКИ</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TheMenu.vue'
}
</script>
<style lang="scss" module>
.TheMenu {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > :not(:last-child) {
    margin-bottom: 8px;
  }
}

</style>
