import * as elements from "typed-html"

export const ChatMessage = ({message}: {message: string}) => {
    console.log('ChatMessage message: ', message);
  return (
    <div>
      {message}
      </div>
  )
}
