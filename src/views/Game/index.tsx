import { useState } from 'react'
import { useForm, useWatch, type SubmitHandler } from "react-hook-form"

import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import type InputData from '@/interfaces/Input'
import type Result from '@/interfaces/Result'
import MakeDefaultResult from '@/utils/MakeDefaultResult'
import { formatDate, getEighteenYearsAgoString } from '@/utils/formatDate'
import MatchingGame from '@/utils/MatchingGame'
import { Processing } from './processing'
import { ScoreBlock } from './scoreBlock'
import { PersonCard } from './personCard'

export default function Game() {
  const eighteenYearsAgoString = getEighteenYearsAgoString()

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<InputData>({
    defaultValues: {
      // For valueAsDate: true, set the default using a YYYY-MM-DD string
      firstBirthDate: eighteenYearsAgoString,
      secondBirthDate: eighteenYearsAgoString,
    }
  })

  const [result, setResult] = useState<Result>(MakeDefaultResult())
  const [allFieds, setAllFields] = useState<InputData>()

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

  const onSubmit: SubmitHandler<InputData> = (data) => {
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
    <>
      <div>
        <Card>
          <CardHeader>
              <CardTitle>Matching Game</CardTitle>
              {!result.hasResult && (
                <CardDescription>
                  Informe os dados para processamento.
              </CardDescription>
              )}
          </CardHeader>
        </Card>
      </div>
      <div>
        <Card>
          <CardContent>

          
      {!result.loading && !result.hasResult && (
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          {/* Primeira pessoa */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold">
              Primeira pessoa
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstFullName">
                  Nome completo
                </Label>
                <Input 
                  {...register("firstFullName", { 
                    required: 'Nome completo (1) é obrigatório' 
                  })}
                  id="firstFullName"
                  placeholder="Nome completo"
                />
                <p className="min-h-5 text-sm text-destructive">
                {errors.firstFullName?.message ?? "\u00A0"}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstBirthDate">
                    Data de nascimento
                </Label>

                <Input
                    {...register("firstBirthDate", { 
                      required: 'Data de nascimento (1) é obrigatória' 
                    })}
                    id="firstBirthDate"
                    type="date"
                />
                <p className="min-h-5 text-sm text-destructive">
                  {errors.firstBirthDate?.message ?? "\u00A0"}
                </p>
                </div>
            </div>

            {/*
              <input 
              {...register("firstFullName", { 
                required: 'Nome completo (1) é obrigatório' 
              })}
              placeholder="Nome completo (1)"
              />
              <input 
              type="date" 
              {...register("firstBirthDate", { 
                required: 'Data de nascimento (1) é obrigatória' 
              })}
            />
            <p>{errors.firstBirthDate?.message}</p>
            */}
          </section>

          {/* Segunda pessoa */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold">
              Segunda pessoa
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="secondFullName">
                  Nome completo
                </Label>
                <Input 
                  {...register("secondFullName", { 
                    required: 'Nome completo (2) é obrigatório' 
                  })}
                  id="secondFullName"
                  placeholder="Nome completo"
                />
                <p className="min-h-5 text-sm text-destructive">
                {errors.secondFullName?.message ?? "\u00A0"}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondBirthDate">
                    Data de nascimento
                </Label>

                <Input
                    {...register("secondBirthDate", { 
                      required: 'Data de nascimento (2) é obrigatória' 
                    })}
                    id="secondBirthDate"
                    type="date"
                />
                <p className="min-h-5 text-sm text-destructive">
                  {errors.secondBirthDate?.message ?? "\u00A0"}
                </p>
                </div>
            </div>
            {/*
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
            */}
          </section>
          <div className="flex justify-end gap-3">
            <Button type="submit">
              Enviar
            </Button>
            <Button type="reset" variant="outline" onClick={() => playAgain()}>
              Reset
            </Button>
          </div>
        </form>
      )}
      {result.loading && <Processing />}
      {result.hasResult && 
      (
        <Card>
          <CardHeader>
            <CardTitle>Resultado</CardTitle>
            <CardDescription>
              Processamento concluído com sucesso.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Score */}
            <ScoreBlock score={result.scoreGlobal} />
            {/* Dados */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <PersonCard 
                title="Primeira pessoa"
                fullName={allFieds?.firstFullName ?? ''}
                birthDate={allFieds?.firstBirthDate ? formatDate(allFieds?.firstBirthDate) : ''}
              />
              <PersonCard 
                title="Segunda pessoa"
                fullName={allFieds?.secondFullName ?? ''}
                birthDate={allFieds?.secondBirthDate ? formatDate(allFieds?.secondBirthDate) : ''}
              />
            </div>
            {/* Ações */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={() => editValues()}>
                Editar Valores
              </Button>
              <Button onClick={() => playAgain()}>
                  Jogar novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
        </CardContent>
      </Card>
    </div>
    </>
    
  )
}
