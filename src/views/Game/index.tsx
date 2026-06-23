import { useState } from 'react'
import { useForm, useWatch, type SubmitHandler } from "react-hook-form"

import type Input from '@/interfaces/Input'
import type Result from '@/interfaces/Result'
import MakeDefaultResult from '@/utils/MakeDefaultResult'
import { formatDate, getEighteenYearsAgoString } from '@/utils/formatDate'
import MatchingGame from '@/utils/MatchingGame'

export default function Game() {
  const eighteenYearsAgoString = getEighteenYearsAgoString()

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: {
      // For valueAsDate: true, set the default using a YYYY-MM-DD string
      firstBirthDate: eighteenYearsAgoString,
      secondBirthDate: eighteenYearsAgoString,
    }
  })

  const [result, setResult] = useState<Result>(MakeDefaultResult())
  const [allFieds, setAllFields] = useState<Input>()

  // watch input value by passing the name of it
  const firstBirthDate = useWatch({
    control,
    name: "firstBirthDate",
  })
  const secondBirthDate = useWatch({
    control,
    name: "secondBirthDate",
  })
  const willUseWatch = false
  if (willUseWatch) {
    console.log('firstBirthdate', firstBirthDate)
    console.log('secondBirthdate', secondBirthDate)
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
    reset({
      firstFullName: '',
      firstBirthDate: eighteenYearsAgoString,
      secondFullName: '',
      secondBirthDate: eighteenYearsAgoString,
    })
  }

  const editValues = () => {
    const log = false
    if ( log ) {
      console.log('getValues()', getValues())
      console.log(
        'formatedDates',
        formatDate(getValues().firstBirthDate),
        formatDate(getValues().secondBirthDate)
      )
    }

    reset({
      ...getValues(),
      //firstBirthDate: formatDate(getValues().firstBirthDate),
      //secondBirthDate: formatDate(getValues().secondBirthDate),
    }, {
      keepDirtyValues: true,
      keepErrors: true,
    })
    setResult(MakeDefaultResult())
  }

  return (
    <div>
      {!result.loading && !result.hasResult && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input 
            {...register("firstFullName", { 
              required: 'Nome completo (1) é obrigatório' 
            })}
            placeholder="Nome completo (1)"
          />
          <p>{errors.firstFullName?.message}</p>

          <input 
            type="date" 
            {...register("firstBirthDate", { 
              required: 'Data de nascimento (1) é obrigatória' 
            })}
          />
          <p>{errors.firstBirthDate?.message}</p>

          <input 
            {...register("secondFullName", { 
              required: 'Nome completo (2) é obrigatório' 
            })} 
            placeholder="Nome completo (2)"
          />
          <p>{errors.secondFullName?.message}</p>

          <input 
            type="date" 
            {...register("secondBirthDate", { 
              required: 'Data de nascimento (2) é obrigatória' 
            })}
          />
          <p>{errors.secondBirthDate?.message}</p>

          <input type="submit" value="Enviar"/>
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

          data1: {allFieds?.firstBirthDate && formatDate(allFieds?.firstBirthDate)} <br />
          data2: {allFieds?.secondBirthDate && formatDate(allFieds?.secondBirthDate)} <br />
        </div>
        </>
      )}
    </div>
  )
}
