import { ref, reactive } from 'vue'

export function useSnake () {
  const snakeHeadCoordinates = reactive({ x: 100, y: 80 })
  const direction = ref(39)
  const snakeSize = ref(20)
  const snakeCoordinates = ref([])
  const snakeLength = ref(5)
  const isSnakeMoving = ref()

  return {
    snakeHeadCoordinates,
    direction,
    snakeSize,
    snakeCoordinates,
    snakeLength,
    isSnakeMoving
  }
}
