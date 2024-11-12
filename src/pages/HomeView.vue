<script setup>
import { useRouter } from 'vue-router'
import VButton from '@/components/VButton.vue'

const router = useRouter()
const goToQuiz = () => {
  router.push('/quiz')
}
</script>

<template>
  <div class="page">
    <div class="page-container">
      <div class="container-picture">
        <img
          class="picture"
          src="/img/photo_19_2024-11-11_13-22-23.jpg"
          alt="Dora"
        />
      </div>

      <div class="quiz-content">
        <h2 class="title">Как хорошо ты знаешь Дору?</h2>
        <p class="description">
          Эта викторина сможет отлично показать насколько хорошо вы знаете
          певицу Дору, приятного прохождения!
        </p>
        <span class="question-count">10 вопросов</span>
      </div>

      <VButton class="start-button" name="Поехали!" @click="goToQuiz"></VButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  .quiz-content {
    text-align: center;
    align-items: center;
    margin-top: 15px;
    display: flex;
    gap: 13px;
    flex-direction: column;

    .title {
      font-size: 24px;
      font-weight: bold;
      color: #fff;
    }

    .description {
      font-size: 18px;
      color: #b0b0b0;
      width: 80%;
    }

    .question-count {
      font-size: 20px;
      color: #ffcc00;
    }
  }

  .start-button {
    background-color: #ff6600;
    color: #fff;
    margin-top: 30px;
    border-radius: 30px;
    font-weight: bold;
    font-size: 24px;
    width: 500px;
    height: 60px;
  }
}
</style>
