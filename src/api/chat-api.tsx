// ChatMessage format: {"messages":[{"role":"user","content":""},{"role":"assistant","content":"\n\nOK"}]}
export type ChatMessage = {
  messages: {
    role: 'user' | 'assistant'
    content: string
  }[]
}

export async function sentMessageReq(message: string) : Promise<any | ChatMessage> {
  const response = await fetch('/api/chatgpt/chat', {
    method: 'POST',
    body: JSON.stringify({
      chat_id: 'chatgpt',
      prompt: message
    })
  })

  return await response.json()
}
