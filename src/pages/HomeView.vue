<script setup>
import {useRouter} from 'vue-router'
import VButton from '@/components/VButton.vue'

const router = useRouter()
const goToQuiz = () => {
  router.push('/quiz')
}
</script>

<template>
  <div class="page">
    <div class="page-container">
      <div class="picture-content">
        <img
            class="picture"
            src="/img/photo_20_2024-11-11_13-22-23.jpg"
            alt="Dora"
        />
      </div>
      <div class="quiz-content">
        <h2 class="title">Как хорошо ты знаешь Дору?</h2>
        <p class="description">
          Эта викторина сможет отлично показать насколько хорошо вы знаете
          певицу Дору, приятного прохождения!
        </p>
        <div class="question-count">10 вопросов</div>
        <VButton class="start-button" name="Поехали!" @click="goToQuiz"></VButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;

  &-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
}

.picture-content {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  .picture {
    border-radius: 8px 8px 0 0;
    width: 100%;
    object-fit: cover;
    object-position: top;
  }
}

.quiz-content {
  text-align: center;
  margin-bottom: 20px;

  .title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }

  .description {
    font-size: 16px;
    color: #666;
    margin-bottom: 15px;
  }

  .question-count {
    font-size: 14px;
    color: #888;
    font-style: italic;
    margin-bottom: 15px;
  }

  .start-button {
    width: 100%;
    max-width: 200px;
    padding: 10px;
    font-size: 16px;
    color: #fff;
    background-color: #ff5722;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #e64a19;
    }
  }
}
</style>

