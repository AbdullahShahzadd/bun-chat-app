import * as elements from "typed-html"

export const StartChat = () => {
    return (
        <div id="start-chat">
        <h1>Start Chatting</h1>
        <form
            class="flex flex-col"
            hx-on="htmx:after-request: if(event.detail.successful) this.reset()"
            hx-post="/chat"
            hx-target="#start-chat"
        >
            <input
            type="text"
            class="border-black border-solid border-2 rounded"
            name="username"
            placeholder="username"
            required={true}
            />
            <button type="submit">Submit</button>
        </form>
        </div>
    )
}