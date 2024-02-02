const data = {
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: `You are an English Expert Teacher. 
Here you will help me provide a sentence about random topics. 
We will use this for user to practice english grammar about tenses like present tense, past tense and future tense.

Please return in JSON LIST FORMAT:
[
  {
    "topic": "Past Tense", // The topic of the question could be Present Tense, Past Tense or Future Tense
    "question": "I _____ football yesterday.",
    "word_before": "I ",
    "word_after": " football yesterday.",
    "answer": "played",
    "hint": "play",
    "original_sentence": "I played football yesterday.",
    "explaination": "The sententce above is past tense, because there is 'yesterday' in the sentence. So we can used Played." // GIVE THE APPROPRIATE EXPLAINATION HERE
  },
]`,
    },
    {
      role: "user",
      content: "Compose 2 short sentences and return in JSON LIST Format.",
    },
  ],
};


let question_list = document.querySelector(".question-list");
let answer_list = document.querySelector(".answer-list");

document.querySelector("#btn-refresh").addEventListener("click", function () {
  document.querySelector("#loading").classList.remove("hidden");
  document.querySelector("#question-layout").classList.add("hidden");
  document.querySelector("#correct-answer").classList.add("hidden");

  axios
    .post("https://api.openai.com/v1/chat/completions", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer `,
      },
    })
    .then((response) => {
      // Hide loading
      document.querySelector("#loading").classList.add("hidden");
      // Show Question
      document.querySelector("#question-layout").classList.remove("hidden");

      console.log(response.data);
      const message = response.data.choices[0].message.content;
      console.log(message);

      const objList = JSON.parse(message);

      objList.forEach(function (jsonObject) {
        console.log("the object: ");
        console.log(jsonObject);

        const question = `${jsonObject.word_before} <input type="text"class="underline w-${jsonObject.answer.length * 3}"/> (${jsonObject.hint}) ${jsonObject.word_after}`;

        console.log(question);

        // MAPPING THE QUESTIONS
        const pClassName = "text-m";
        let questionElement = document.createElement("p");
        questionElement.id = "question";
        questionElement.className = pClassName;
        questionElement.innerHTML = question;

        question_list.appendChild(questionElement);

        // MAPPING THE ANSWERS
        let answerElement = document.createElement("p");
        answerElement.id = "answer";
        answerElement.className = pClassName;
        answerElement.innerHTML = `Answer: ${jsonObject.answer}`;

        let originalSentenceElement = document.createElement("p");
        originalSentenceElement.className = pClassName;
        originalSentenceElement.innerHTML = `Full sentence: ${jsonObject.original_sentence}`;

        let explainationElement = document.createElement("p");
        explainationElement.className = pClassName;
        explainationElement.innerHTML = `Explaination: ${jsonObject.explaination}`;

        answer_list.appendChild(answerElement);
        answer_list.appendChild(originalSentenceElement);
        answer_list.appendChild(explainationElement);
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

document.querySelector("#btn-submit").addEventListener("click", function () {
  document.querySelector("#correct-answer").classList.remove("hidden");
});
