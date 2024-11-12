<script setup>
import {ref} from 'vue';
import VButton from "@/components/VButton.vue";

const questions = ref([
  {
    question: "Кто главный фанат Доры?",
    image: "/img/photo_1_2024-11-11_13-22-23.jpg",
    answers: ["Егор Колбин", "Jeffri", "Егор", "Колбин"],
    correctAnswer: 1
  },
  {
    question: "Кто главный фанат Доры?",
    image: "/img/photo_22_2024-11-11_13-22-23.jpg",
    answers: ["Егор Колбин", "Jeffri", "Егор", "Колбин"],
    correctAnswer: 1
  },
]);
const currentQuestionIndex = ref(0);
const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  } else {
    // Логика для завершения квиза или перехода к результатам
  }
};
</script>

<template>
  <div class="page">
    <div class="page-container">
      <div class="container-picture">
        <img :src="questions[currentQuestionIndex].image" alt="Quiz Image" class="picture">
      </div>
      <div class="quiz-container">
        <div class="title">{{ questions[currentQuestionIndex].question }}</div>
        <div class="answers">
          <button
              v-for="(answer, index) in questions[currentQuestionIndex].answers"
              :key="index"
              @click="selectAnswer(index)"
              class="answer"
          >
            {{ answer }}
          </button>
        </div>
        <VButton class="button-next" name="Дальше" @click="nextQuestion"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  flex-direction: row;
  gap: 30px;

  .quiz-container {
    display: flex;
    flex-direction: column;
    gap: 60px
  }

  .title {
    margin-top: 20px;
    font-size: 30px;
    color: #e9e9e9;
  }

  .answers {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .answer {
      padding: 20px;
      background-color: #212b36;
      border-radius: 18px;
      color: #e9e9e9;
      transition: 0.3s all ease;

      &:hover {
        background: #30626b;
      }

      &:focus {
        background: #1c6b72;
      }
    }
  }
  .button-next {
    padding: 20px;
    background-color: #212b36;
    border-radius: 18px;
    color: #e9e9e9;
    transition: 0.3s all ease;

    &:hover {
      background: #30626b;
    }
  }
}
</style>
