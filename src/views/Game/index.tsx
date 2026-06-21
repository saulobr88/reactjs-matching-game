import { useState } from 'react'
import type Input from '@/interfaces/Input'

export default function Game() {
  const [input, setInput] = useState<Input>({
    firstFullName: '',
    firstBirthDate: new Date(),
    secondFullName: '',
    secondBirthDate: new Date(),
    count: 0,
  })

  return (
    <div>
        <button
          type="button"
          onClick={() => setInput({...input, count: input.count + 1})}
        >
          Count is {input.count}
        </button>
    </div>
  )
}
