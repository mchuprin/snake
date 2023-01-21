<template>
  <div :class="$style.TheGame">
<!--    <GameEnd v-if="gameEnd" />-->
    <!--TODO: переделать на store    -->
    <canvas
      ref="field"
      :width="fieldSize.width"
      :height="fieldSize.height"
      :class="$style.field"
      @keydown.up.prevent="changeDirection('up')"
      @keydown.down.prevent="changeDirection('down')"
      @keydown.right="changeDirection('right')"
      @keydown.left="changeDirection('left')"
    ></canvas>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
// import GameEnd from '@/views/Game/components/GameEnd.vue'

export default {
  name: 'TheGame',

  // components: { GameEnd },

  setup () {
    // FIELD
    const field = ref(null)
    const fieldSize = reactive({ width: 500, height: 400 })

    // SNAKE
    const snake = reactive({ x: 100, y: 80 })
    const direction = ref('up')
    const snakeSize = ref(20)

    const moveSnake = () => {
      switch (direction.value) {
        case 'up':
          console.log('up')
          snake.y -= snakeSize.value
          break
        case 'down':
          console.log('down')
          snake.y += snakeSize.value
          break
        case 'right':
          console.log('right')
          snake.x += snakeSize.value
          break
        case 'left':
          console.log('left')
          snake.x -= snakeSize.value
          break
      }
      draw()
    }

    // GAME
    const gameEnd = computed(() => snake.x < 0 || snake.x > fieldSize.width || snake.y < 0 || snake.y > fieldSize.height)

    const draw = () => {
      const ctx = field.value.getContext('2d')
      ctx.fillStyle = 'red'
      ctx.fillRect(snake.x, snake.y, snakeSize.value, snakeSize.value)
    }

    const changeDirection = (newDirection) => {
      console.log(newDirection)
      direction.value = newDirection
    }

    onMounted(() => {
      draw()
      setInterval(moveSnake, 500)
    })

    return {
      field,
      fieldSize,
      gameEnd,
      changeDirection,
      draw
    }
  }

  // mounted () {
  //   this.draw()
  //
  //   setInterval(() => {
  //
  //   }, 1000)
  // }
}
</script>

<style lang="scss" module>
.TheGame {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.field {
  background: $Filling;
  border: $Border solid 10px;
}
</style>
