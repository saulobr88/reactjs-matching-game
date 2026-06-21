import { useState } from 'react'
import { useForm, useWatch, type SubmitHandler } from "react-hook-form"

import type Input from '@/interfaces/Input'
import type Result from '@/interfaces/Result'
import MakeDefaultResult from '@/utils/MakeDefaultResult'
import MatchingGame from '@/utils/MatchingGame'

export default function Game() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Input>()

  const [result, setResult] = useState<Result>(MakeDefaultResult())
  const [allFieds, setAllFields] = useState<Input>()

  // watch input value by passing the name of it
  const firstFullName = useWatch({
    control,
    name: "firstFullName",
  })
  const willUseWatch = false
  if (willUseWatch) {
    console.log(firstFullName) 
  }

  const onSubmit: SubmitHandler<Input> = (data) => {
    // console.log(data)
    setResult({...result, loading: true, hasResult: false})
    setAllFields(data)
    setTimeout(() => {
      setResult(MatchingGame(data))
    }, 3000)
  }

  const playAgain = () => {
    setResult(MakeDefaultResult())
    reset()
  }

  const editValues = () => {
    setResult(MakeDefaultResult())
  }


  return (
    <div>
      {!result.loading && !result.hasResult && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("firstFullName")}/> <br />
          <input type="date" {...register("firstBirthDate")}/> <br />
          <input {...register("secondFullName")}/> <br />
          <input type="date" {...register("secondBirthDate")}/> <br />
          {/* errors will return when field validation fails  */}
          {errors.secondFullName && <span>This field is required</span>}
          <input type="submit" />
          <input
            type="button"
            onClick={() => playAgain()}
            value="Reset"
          />
        </form>
      )}
      {result.loading && <p>Loading...</p>}
      {result.hasResult && (
        <>
        <input type="button" value="Editar Valores" onClick={() => editValues()} /> ||{' '} 
        <input type="button" value="Jogar novamente" onClick={() => playAgain()} /> <br/>
        <div>RESULTADO: {result.scoreGlobal}</div>
        <hr />
        <div>
          nome1: {allFieds?.firstFullName}<br />
          nome2: {allFieds?.secondFullName}<br />

          data1: {String(allFieds?.firstBirthDate).split('T')[0]} <br />
          data2: {String(allFieds?.secondBirthDate).split('T')[0]} <br />
        </div>
        </>
      )}
    </div>
  )
}
