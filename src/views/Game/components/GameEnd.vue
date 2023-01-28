<template>
  <div :class="$style.GameEnd">
    <div :class="$style.wrapper">
      <h1>You lose...</h1>
      <button @click="$emit('restart')" class="button">RESTART</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GameEnd'
}
</script>
<style lang="scss" module>
.GameEnd {
  position: absolute;
  background: #202e3561;
  width: 100%;
  height: 100%;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
