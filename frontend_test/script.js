const questionInput = document.getElementById("question");
const sendButton = document.getElementById("send-button");
const chatContainer = document.getElementById("chat-container");


// --------------------------------
// Add message to chat
// --------------------------------

function addMessage(message, type) {

    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");

    if (type === "user") {
        messageDiv.classList.add("user-message");
    } else {
        messageDiv.classList.add("bot-message");
    }

    messageDiv.innerHTML = `
        <div class="message-content">
            ${message}
        </div>
    `;

    chatContainer.appendChild(messageDiv);

    // Scroll to latest message
    chatContainer.scrollTop = chatContainer.scrollHeight;
}


// --------------------------------
// Remove loading message
// --------------------------------

function removeThinkingMessage() {

    const messages = document.querySelectorAll(".bot-message");

    if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];

        if (
            lastMessage.innerText.includes("Thinking")
        ) {
            lastMessage.remove();
        }
    }
}


// --------------------------------
// Ask BIS question
// --------------------------------

async function askQuestion() {

    const question = questionInput.value.trim();

    // Do nothing if input is empty
    if (!question) {
        return;
    }


    // --------------------------------
    // Show user's question
    // --------------------------------

    addMessage(
        question,
        "user"
    );


    // --------------------------------
    // Clear input
    // --------------------------------

    questionInput.value = "";


    // --------------------------------
    // Show loading message
    // --------------------------------

    addMessage(
        "Thinking... 🤔",
        "bot"
    );


    // Disable button while processing
    sendButton.disabled = true;


    try {

        // --------------------------------
        // Send request to FastAPI
        // --------------------------------

        const response = await fetch(
            "http://127.0.0.1:8000/ask",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    question: question
                })
            }
        );


        // --------------------------------
        // Check server response
        // --------------------------------

        if (!response.ok) {

            throw new Error(
                `Server returned ${response.status}`
            );

        }


        // --------------------------------
        // Convert response to JSON
        // --------------------------------

        const data = await response.json();


        // --------------------------------
        // Remove Thinking message
        // --------------------------------

        removeThinkingMessage();


        // --------------------------------
        // Create sources section
        // --------------------------------

        let sourcesHTML = "";


        if (
            data.sources &&
            data.sources.length > 0
        ) {

            // Show maximum 3 useful sources
            const sources = data.sources.slice(0, 3);


            sourcesHTML = `
                <div class="sources">

                    <strong>📚 Sources</strong>

                    ${sources.map(source => `
                        <div>
                            📄 ${source.source}
                            ${
                                source.page
                                    ? ` — Page ${source.page}`
                                    : ""
                            }
                        </div>
                    `).join("")}

                </div>
            `;

        }


        // --------------------------------
        // Display answer
        // --------------------------------

        addMessage(
            `
                <strong>BIS Sahayak AI</strong>

                <p>
                    ${data.answer}
                </p>

                ${sourcesHTML}
            `,
            "bot"
        );


    } catch (error) {

        console.error(
            "Error:",
            error
        );


        // --------------------------------
        // Remove Thinking message
        // --------------------------------

        removeThinkingMessage();


        // --------------------------------
        // Show error message
        // --------------------------------

        addMessage(
            `
                <strong>BIS Sahayak AI</strong>

                <p>
                    ❌ Sorry, I could not connect
                    to the BIS AI server.
                </p>

                <p>
                    Please make sure the backend
                    server is running.
                </p>
            `,
            "bot"
        );

    }


    // --------------------------------
    // Enable button again
    // --------------------------------

    sendButton.disabled = false;

    questionInput.focus();
}


// --------------------------------
// Send button
// --------------------------------

sendButton.addEventListener(
    "click",
    askQuestion
);


// --------------------------------
// Press Enter to send
// --------------------------------

questionInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            askQuestion();

        }

    }
);