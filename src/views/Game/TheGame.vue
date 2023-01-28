<template>
  <div
    :class="$style.TheGame"
  >
    <GameEnd v-if="gameEnd" @restart="restart" />
    <!--TODO: переделать на store    -->
    <canvas
      ref="field"
      :width="fieldSize.width"
      :height="fieldSize.height"
      :class="$style.field"
      tabindex="-1"
    ></canvas>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch, onDeactivated } from 'vue'
import GameEnd from '@/views/Game/components/GameEnd.vue'

export default {
  name: 'TheGame',

  components: { GameEnd },

  setup () {
    // FIELD
    const field = ref(null)
    const fieldSize = reactive({ width: 500, height: 400 })

    // SNAKE
    const snakeHeadCoordinates = reactive({ x: 100, y: 80 })
    const direction = ref(39)
    const snakeSize = ref(20)
    const snakeCoordinates = ref([])
    const snakeLength = ref(2)
    const isSnakeMoving = ref()

    const moveSnake = () => {
      switch (direction.value) {
        case 37:
          console.log('left')
          snakeHeadCoordinates.x -= snakeSize.value
          break
        case 38:
          console.log('up')
          snakeHeadCoordinates.y -= snakeSize.value
          break
        case 39:
          console.log('right')
          snakeHeadCoordinates.x += snakeSize.value
          break
        case 40:
          console.log('down')
          snakeHeadCoordinates.y += snakeSize.value
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
    const gameEnd = computed(() => snakeHeadCoordinates.x < 0 || snakeHeadCoordinates.x > fieldSize.width || snakeHeadCoordinates.y < 0 || snakeHeadCoordinates.y > fieldSize.height)

    const drawSnake = () => {
      const ctx = field.value.getContext('2d')
      ctx.fillStyle = 'red'
      ctx.fillRect(snakeHeadCoordinates.x, snakeHeadCoordinates.y, snakeSize.value, snakeSize.value)
      snakeCoordinates.value.push({ x: snakeHeadCoordinates.x, y: snakeHeadCoordinates.y })
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

    const restart = () => {
      snakeCoordinates.value = []
      snakeHeadCoordinates.x = 100
      snakeHeadCoordinates.y = 80
      snakeLength.value = 2
      isSnakeMoving.value = setInterval(moveSnake, 500)
    }

    onMounted(() => {
      window.addEventListener('keydown', (event) => changeDirection(event.keyCode))
      drawSnake()
      isSnakeMoving.value = setInterval(moveSnake, 500)
    })

    onDeactivated(() => {
      window.removeEventListener('keydown', (event) => changeDirection(event.keyCode))
      clearInterval(isSnakeMoving.value)
    })

    return {
      field,
      fieldSize,
      gameEnd,
      direction,
      snakeSize,
      snakeCoordinates,
      snakeLength,
      restart,
      changeDirection,
      drawSnake
    }
  }
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
