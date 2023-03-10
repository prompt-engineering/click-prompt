'use client'

import React, { ChangeEvent } from 'react'
import { Textarea } from '@chakra-ui/react'
import { ClickPromptButton } from '@/components/ClickPromptButton'

function StartlingByEachStep({}: GeneralI18nProps) {
  // const dict = i18n.dict
  const [value, setValue] = React.useState('')

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value
    setValue(inputValue)
  }

  return (
    <div>
      <Textarea
        value={ value }
        onChange={ handleInputChange }
        placeholder='Here is a sample placeholder'
        size='sm'
      />
      <ClickPromptButton text={ 'sample' } />

    </div>
  )
}

export default StartlingByEachStep
