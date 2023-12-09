import * as elements from "typed-html"
import { AvailableChatrooms } from "./availableChatrooms";

export const Base = ({children}: elements.Children) => {
  return (
    <html>
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Chat App</title>
        <script src="https://unpkg.com/htmx.org@1.9.9" integrity="sha384-QFjmbokDn2DjBjq+fM+8LUIVrAgqcNW2s0PjAxHETgRn9l4fvX31ZxDxvwQnyMOX" crossorigin="anonymous"></script>
          <script src="https://unpkg.com/htmx.org/dist/ext/ws.js"></script>
          <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <div
          class="flex w-full h-screen justify-center items-center flex-column"
          id="base"
      >
      {children}
      </div>
    </html>
  )
}
