import * as React from 'react'
import { Box, Flex, Heading, HStack, Link, Text } from '@chakra-ui/react'

export default function DefaultLayout() {
  return (
    <Flex
      direction='column'
      height='100vh'
      width='100vw'
      justifyContent='center'
      alignItems='center'
    >
      <Box
        width='100%'
        maxWidth='800px'
        padding='2rem'
        border='1px solid'
        borderColor='gray.200'
        borderRadius='md'
      >
        <Heading as='h1' size='2xl' textAlign='center' mb='1rem'>
          Welcome to React
        </Heading>
        <Text textAlign='center' mb='1rem'>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </Text>
        <HStack justifyContent='center' spacing='1rem'>
          <Link href='https://reactjs.org' isExternal>
            Learn React
          </Link>
          <Link href='https://chakra-ui.com' isExternal>
            Learn Chakra UI
          </Link>
          <Link href='https://reactrouter.com' isExternal>
            Learn React Router
          </Link>
        </HStack>
      </Box>
    </Flex>
  )
}
