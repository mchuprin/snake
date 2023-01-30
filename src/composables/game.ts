import { ref, reactive, watch, computed } from 'vue'

const drawSnake = () => {
  const ctx = field.value.getContext('2d')
  ctx.fillStyle = 'red'
  ctx.fillRect(snakeHeadCoordinates.x, snakeHeadCoordinates.y, snakeSize.value, snakeSize.value)
  snakeCoordinates.value.push({ x: snakeHeadCoordinates.x, y: snakeHeadCoordinates.y })
}
export function useGame () {
  const field = ref(null)
  const fieldSize = reactive({ width: 500, height: 400 })
  const snakeHeadCoordinates = reactive({ x: 100, y: 80 })
  const direction = ref(39)
  const snakeSize = ref(20)
  const snakeCoordinates = ref([])
  const snakeLength = ref(5)
  const isSnakeMoving = ref()

  const gameEnd = computed(() => snakeHeadCoordinates.x < 0 || snakeHeadCoordinates.x > fieldSize.width || snakeHeadCoordinates.y < 0 || snakeHeadCoordinates.y > fieldSize.height)

  watch(gameEnd, (value) => {
    if (value) clearInterval(isSnakeMoving.value)
  })

  return {
    field,
    fieldSize,
    snakeHeadCoordinates,
    direction,
    snakeSize,
    snakeCoordinates,
    snakeLength,
    isSnakeMoving
  }
}
