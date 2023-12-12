import * as elements from "typed-html"

export const ChatSubmit = ({chatRoom}: {chatRoom: string}) => {
  return (
      <div>
        <form
            class="flex flex-row"
            ws-send
        >
          <input
              type="text"
              class="border-black border-solid border-2 rounded"
              name="message"
          />
          <button class="bg-sky-500" type="submit">Send Message</button>
        </form>
      </div>
  )
} 
