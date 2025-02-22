import React from 'react'
import { useParams } from 'react-router-dom'

function Chat() {
    const params = useParams();

  return (
    <h2>Chat : {params.uniqueId}</h2>
  )
}

export default Chat