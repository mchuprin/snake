<template>
  <div :class="$style.TheMenu">
    <div :class="$style.title">
      <h1>Snake</h1>
      <h2>JS Edition</h2>
      <router-link to="/game" :class="$style.setting">НАЧАТЬ</router-link>
      <router-link to="/settings" :class="$style.setting">НАСТРОЙКИ</router-link>
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
}

.setting {
  border: dashed $Border 2px;
  background: $Filling;
  padding: 15px 30px 10px;
  text-decoration: none;
  color: $Text;
  border-radius: 20px;
  font-size: 17px;
  transition: .5s;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  &:hover {
    transform: scale(1.1);
  }
}

</style>
