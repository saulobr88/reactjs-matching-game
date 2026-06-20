import { useState } from 'react'

export default function Game() {
  const [count, setCount] = useState(0)

  return (
    <div>
        <button
          type="button"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
    </div>
  )
}
