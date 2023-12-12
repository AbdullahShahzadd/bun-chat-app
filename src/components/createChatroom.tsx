import * as elements from "typed-html";

export const CreateChatroom = ({error, errorMessage}: {error: boolean, errorMessage: string}) => {
    return (
        <div>
            <form
                hx-on="htmx:after-request: if(event.detail.successful) this.reset()"
                hx-post="/chatroom"
                class="flex flex-col"
            >
                <h1>Create Chatroom</h1>
                <input
                    type="text"
                    class="border-black border-solid border-2 rounded"
                    name="chatroom"
                    placeholder="chatroom"
                    required={true}
                />
                {error ? <div id="create-chatroom-error">{errorMessage}</div> : ""}
                <button class="bg-sky-500" type="submit">Submit</button>
            </form>
        </div>
    )}
