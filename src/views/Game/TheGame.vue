<template>
  <div
    :class="$style.TheGame"
  >
    <GameEnd v-if="gameEnd" @restart="restart" />

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
import { onMounted, watch, onDeactivated } from 'vue'
import GameEnd from '@/views/Game/components/GameEnd.vue'
import { useGame } from '@/composables/game'
import { useFood } from '@/composables/food'

export default {
  name: 'TheGame',

  components: { GameEnd },

  setup () {
    const {
      field,
      fieldSize,
      direction,
      snakeSize,
      snakeCoordinates,
      snakeLength,
      isSnakeMoving,
      gameEnd,
      restart,
      changeDirection,
      drawField
    } = useGame()

    const { foodCoordinates } = useFood()

    watch(() => [...snakeCoordinates.value],
      (coordinates) => {
        if (coordinates.length > snakeLength.value) {
          drawField(coordinates[0])
          snakeCoordinates.value.shift()
        }
      }
    )

    onMounted(() => {
      window.addEventListener('keydown', (event) => changeDirection(event.keyCode))
      restart()
      console.log(foodCoordinates.value)
    })

    onDeactivated(() => {
      window.removeEventListener('keydown', (event) => changeDirection(event.keyCode))
      clearInterval(isSnakeMoving.value)
    })

    return {
      field,
      fieldSize,
      direction,
      snakeSize,
      snakeCoordinates,
      snakeLength,
      gameEnd,
      restart
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
