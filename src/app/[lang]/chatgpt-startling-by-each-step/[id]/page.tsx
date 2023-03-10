import React from 'react'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading, SimpleGrid } from '@/components/ChakraUI'
import { notFound } from 'next/navigation'
import StartlingStepDetail from './StartlingStepDetail'
import { StartlingStep } from '@/app/[lang]/chatgpt-startling-by-each-step/[id]/startling.type'
import StartlingStepPage from '@/app/[lang]/chatgpt-startling-by-each-step/[id]/StartlingStepPage'

const getSampleNames = async () => {
  const index = await import('@/assets/chatgpt/by-steps/index.json').then((mod) => mod.default)
  return index.map((item) => item.path.split('.').slice(0, -1).join('.'))
}

async function StepDetailPage({ params }: { params: { id: string } }) {
  const names = await getSampleNames()
  if (!names.includes(params.id)) {
    notFound()
  }

  const content: StartlingStep = await import(`@/assets/chatgpt/by-steps/${ params.id }.yml`).then((mod) => mod.default)

  if (!content) {
    notFound()
  }

  return <>
    { content && <StartlingStepPage content={ content } id={ params.id } /> }
  </>
}

export default StepDetailPage
