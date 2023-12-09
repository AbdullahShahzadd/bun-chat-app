import * as elements from "typed-html"

export const ChatMessage = ({message}: {message: string}) => {
  return (
    <div
      id="chat-logs"
      hx-swap-oob="beforeend"
    >
      {message}
    </div>
  )
}
hi how are you?JK`~=`
    I am good.How are you?
    I am good. How are you?
