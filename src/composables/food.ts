import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useGame } from '@/composables/game'
import { mount } from '@vue/test-utils'

export function useFood () {
  const { fieldSize, snakeCoordinates } = useGame()

  const foodCoordinates = computed(() => {
    const forbiddenX = computed(() => snakeCoordinates.value.map((coordinates) => coordinates.x))
    const forbiddenY = computed(() => snakeCoordinates.value.map((coordinates) => coordinates.y))

    const randomNumberInRange = (min: number, max: number) => 20 * Math.floor(Math.random() * ((max - min) / 20 + 1) + min)

    const foodCoordinates: { x: number, y: number } =
      {
        x: randomNumberInRange(0, fieldSize.width),
        y: randomNumberInRange(0, fieldSize.height)
      }

    console.log(snakeCoordinates.value.map((coordinates) => coordinates.x))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // while (forbiddenX.value.some(foodCoordinates.x) && forbiddenY.value.some(foodCoordinates.y)) {
    //   foodCoordinates.x = randomNumberInRange(0, fieldSize.width)
    //   foodCoordinates.y = randomNumberInRange(0, fieldSize.height)
    // }
    return foodCoordinates
  })

  return {
    foodCoordinates
  }
}
