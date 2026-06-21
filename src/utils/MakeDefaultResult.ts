import type Result from '@/interfaces/Result'

export default function MakeDefaultResult(): Result {
  return {
    scoreGlobal: 0,
    levenstainDistance: 0,
    diferenceInDays: 0,
    loading: false,
    hasResult: false
  }
}