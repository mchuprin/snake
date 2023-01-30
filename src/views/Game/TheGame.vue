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
import { useGame } from '@/composables/game'

export default {
  name: 'TheGame',

  components: { GameEnd },

  setup () {
    const {
      field,
      fieldSize,
      snakeHeadCoordinates,
      direction,
      snakeSize,
      snakeCoordinates,
      snakeLength,
      isSnakeMoving
    } = useGame()

    const moveSnake = () => {
      switch (direction.value) {
        case 37:
          snakeHeadCoordinates.x -= snakeSize.value
          break
        case 38:
          snakeHeadCoordinates.y -= snakeSize.value
          break
        case 39:
          snakeHeadCoordinates.x += snakeSize.value
          break
        case 40:
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


    const changeDirection = (newDirection) => {
      const directionsRules = [
        { direction: 37, forbidden: 39 },
        { direction: 38, forbidden: 40 },
        { direction: 39, forbidden: 37 },
        { direction: 40, forbidden: 38 }
      ]

      const actualRule = directionsRules.find(dir => dir.direction === direction.value)

      if (actualRule.forbidden !== newDirection) direction.value = newDirection
    }

    const restart = () => {
      const ctx = field.value.getContext('2d')
      ctx.fillStyle = '#94bd91'
      ctx.fillRect(0, 0, fieldSize.width, fieldSize.height)
      snakeCoordinates.value = []
      snakeHeadCoordinates.x = 100
      snakeHeadCoordinates.y = 80
      snakeLength.value = 2
      isSnakeMoving.value = setInterval(moveSnake, 300)
    }

    onMounted(() => {
      window.addEventListener('keydown', (event) => changeDirection(event.keyCode))
      drawSnake()
      isSnakeMoving.value = setInterval(moveSnake, 300)
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
