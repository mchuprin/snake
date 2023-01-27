<template>
  <div
    :class="$style.TheGame"
  >
    <GameEnd v-if="gameEnd" />
    <!--TODO: переделать на store    -->
    <canvas
      ref="field"
      :width="fieldSize.width"
      :height="fieldSize.height"
      :class="$style.field"
      @keyup.down.exact="changeDirection('down')"
      @keydown.right="changeDirection('right')"
      @keydown.left="changeDirection('left')"
    ></canvas>

<!--    @keydown.down="changeDirection('down')"-->
<!--    @keydown.right="changeDirection('right')"-->
<!--    @keydown.left="changeDirection('left')"-->
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import GameEnd from '@/views/Game/components/GameEnd.vue'

export default {
  name: 'TheGame',

  components: { GameEnd },

  setup () {
    // FIELD
    const field = ref(null)
    const fieldSize = reactive({ width: 500, height: 400 })

    // SNAKE
    const snake = reactive({ x: 100, y: 80 })
    const direction = ref('right')
    const snakeSize = ref(20)
    const snakeCoordinates = ref([])
    const snakeLength = ref(2)
    const isSnakeMoving = ref()

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
      drawSnake()
    }

    watch(() => [...snakeCoordinates.value],
      (coordinates) => {
        if (coordinates.length > snakeLength.value) {
          drawField(coordinates[0])
          snakeCoordinates.value.shift()
        }
      }
    )

    // GAME
    const gameEnd = computed(() => snake.x < 0 || snake.x > fieldSize.width || snake.y < 0 || snake.y > fieldSize.height)

    const drawSnake = () => {
      const ctx = field.value.getContext('2d')
      ctx.fillStyle = 'red'
      ctx.fillRect(snake.x, snake.y, snakeSize.value, snakeSize.value)
      snakeCoordinates.value.push({ x: snake.x, y: snake.y })
    }

    const drawField = ({ x, y }) => {
      const ctx = field.value.getContext('2d')
      ctx.fillStyle = '#94bd91'
      ctx.fillRect(x, y, snakeSize.value, snakeSize.value)
    }

    watch(gameEnd, (value) => {
      if (value) clearInterval(isSnakeMoving.value)
    })

    const changeDirection = (newDirection) => {
      console.log(newDirection)
      direction.value = newDirection
    }

    onMounted(() => {
      const canvas = field.value
      canvas.addEventListener('keydown', (e) => {
        switch (e.keyCode) {
          case 37:
            this.direction = 'left'
            break
          case 38:
            this.direction = 'up'
            break
          case 39:
            this.direction = 'right'
            break
          case 40:
            this.direction = 'down'
            break
        }
      })
      drawSnake()
      isSnakeMoving.value = setInterval(moveSnake, 500)
    })

    return {
      field,
      fieldSize,
      gameEnd,
      direction,
      snakeSize,
      snakeCoordinates,
      snakeLength,
      changeDirection,
      drawSnake
    }
  }

  // mounted () {
  //   this.drawSnake()
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
