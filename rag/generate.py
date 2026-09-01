import ollama


# --------------------------------
# 1. Model
# --------------------------------

MODEL_NAME = "llama3.2:3b"


# --------------------------------
# 2. Generate answer
# --------------------------------

def generate_answer(prompt):

    response = ollama.chat(

        model=MODEL_NAME,

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]