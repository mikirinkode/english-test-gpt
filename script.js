const data = {
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: `You are an English Expert Teacher. 
Here you will help me provide a paragraph about random topics. 
We will use this for user to practice english grammar about tenses like present tense, past tense and future tense.

Please return in JSON FORMAT:
{
	"question": "I <span class=\"editable underline w-20 h-6 inline-block\" contenteditable=\"true\"></span> football yesterday.",
	"answer": "played",
	"original_sentence": "I played football yesterday."
}`,
    },
    {
      role: "user",
      content: "Compose a short sentence and return in JSON Format.",
    },
  ],
};

const question_element = document.getElementById("question");
const answer_element = document.getElementById("answer");
const original_sentence_element = document.getElementById("original_sentence");

document.querySelector("#btn-refresh").addEventListener("click", function () {
  document.querySelector("#loading").classList.remove("hidden");
  document.querySelector("#question-layout").classList.add("hidden");

  axios
    .post("https://api.openai.com/v1/chat/completions", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      const message = response.data.choices[0].message.content;
      console.log(message);

      const obj = JSON.parse(message);

      const question = obj.question;
      const answer = obj.answer;
      const original_sentence = obj.original_sentence;
      console.log(question);
      console.log(original_sentence);

      document.querySelector("#question-layout").classList.remove("hidden");

      question_element.innerHTML = "Hello";
      question_element.innerHTML = question;
      answer_element.innerHTML = answer;
      original_sentence_element.innerHTML = original_sentence;

      // Hide loading
      document.querySelector("#loading").classList.add("hidden");
    })
    .catch((error) => {
      console.error(error);
    });
});

document.querySelector("#btn-submit").addEventListener("click", function () {
  document.querySelector("#correct-answer").classList.remove("hidden");
});
