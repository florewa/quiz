<script setup>
import { computed, onMounted, ref } from 'vue'
import VButton from '@/components/VButton.vue'

const questions = ref([
  {
    question: "Как зовут певицу 'Дора' на самом деле?",
    image: '/img/photo_1_2024-11-11_13-22-23.jpg',
    answers: [
      'Даша Мангер',
      'Дарья Шиханова',
      'Дарина Валитова',
      'Дана Соколова',
    ],
    correctAnswer: 1,
  },
  {
    question: 'Какой жанр музыки исполняет Дора?',
    image: '/img/photo_2_2024-11-11_13-23-00.jpg',
    answers: ['Хип-хоп', 'Рэп', 'Поп и инди-поп', 'Электронная музыка'],
    correctAnswer: 2,
  },
  {
    question: 'Как называется дебютный альбом Доры?',
    image: '/img/photo_23_2024-11-11_13-22-23.jpg',
    answers: [
      'Влюблена',
      'Не пришла на вечер',
      'Боже, храни кьют-рок',
      'Улыбнись',
    ],
    correctAnswer: 2,
  },
  {
    question: "С каким исполнителем Дора записала популярную песню 'Дорадура'?",
    image: '/img/photo_16_2024-11-11_13-22-23.jpg',
    answers: ['Баста', 'Моргенштерн', 'Мэйби Бэйби', 'Pharaoh'],
    correctAnswer: 2,
  },
  {
    question: 'Какую из следующих песен НЕ исполняет Дора?',
    image: '/img/photo_20_2024-11-11_13-22-23.jpg',
    answers: ['Втюрилась', 'Не Влюбляйся', 'Пацан', 'Богиня'],
    correctAnswer: 3,
  },
  {
    question: 'В каком году Дора начала свою музыкальную карьеру?',
    image: '/img/photo_24_2024-11-11_13-22-23.jpg',
    answers: ['2015', '2018', '2020', '2021'],
    correctAnswer: 1,
  },
  {
    question:
      'Как называется группа, в составе которой Дора исполняла песни до сольной карьеры?',
    image: '/img/photo_25_2024-11-11_13-22-23.jpg',
    answers: ['Френды', 'Нервы', 'Пошлая Молли', 'Мейкап Дора'],
    correctAnswer: 3,
  },
  {
    question: 'В каком городе родилась Дора?',
    image: '/img/photo_13_2024-11-11_13-22-23.jpg',
    answers: ['Санкт-Петербург', 'Новосибирск', 'Москва', 'Владивосток'],
    correctAnswer: 1,
  },
  {
    question: 'Какие темы часто затрагиваются в песнях Доры?',
    image: '/img/photo_11_2024-11-11_13-22-23.jpg',
    answers: [
      'Политика и экономика',
      'Любовь и отношения',
      'Дружба и семья',
      'Фантастика и магия',
    ],
    correctAnswer: 1,
  },
  {
    question: 'Какая из песен Доры стала вирусной на платформе TikTok?',
    image: '/img/photo_7_2024-11-11_13-22-23.jpg',
    answers: ['Втюрилась', 'Молодость', 'Не по пути', 'Ты не пришла на вечер'],
    correctAnswer: 0,
  },
])
const isQuizFinished = ref(false)
const currentQuestionIndex = ref(0)
const score = ref(0)
const selectedAnswerIndex = ref(null)
const isCorrect = ref(null)
const isAnswerSelected = computed(() => selectedAnswerIndex.value !== null)
const isAnswered = ref(false)
const selectAnswer = (index) => {
  if (isAnswered.value) return
  selectedAnswerIndex.value = index
  isAnswered.value = false
}

const nextQuestion = () => {
  if (
    selectedAnswerIndex.value ===
    questions.value[currentQuestionIndex.value].correctAnswer
  ) {
    score.value++
  }

  console.log(score.value)

  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
    selectedAnswerIndex.value = null
    isAnswered.value = false
  } else {
    isQuizFinished.value = true
  }
}

const restartQuiz = () => {
  currentQuestionIndex.value = 0
  score.value = 0
  isQuizFinished.value = false
  selectedAnswerIndex.value = null
  isCorrect.value = null
}
</script>

<template>
  <div class="page">
    <div class="page-container">
      <div v-if="!isQuizFinished" class="page-container">
        <div class="counter">
          {{ currentQuestionIndex + 1 }}/ {{ questions.length }}
        </div>
        <div class="container-picture">
          <img
            :src="questions[currentQuestionIndex].image"
            alt="Quiz Image"
            class="picture"
          />
        </div>
        <div class="quiz-container">
          <div class="title">
            {{ questions[currentQuestionIndex].question }}
          </div>
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
          <VButton
            class="button-next"
            name="Дальше"
            @click="nextQuestion"
            :disabled="!isAnswerSelected"
            :class="{ disabled: !isAnswerSelected }"
          />
        </div>
      </div>
      <div v-else class="finish-container">
        <div class="score">
          Ваш результат: {{ score }} из {{ questions.length }}
        </div>
        <VButton
          class="restart-button"
          name="Пройти заново"
          @click="restartQuiz"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  flex-direction: row;
  gap: 30px;

  .counter {
    font-size: 18px;
    color: #e9e9e9;
  }

  .quiz-container {
    display: flex;
    flex-direction: column;
    gap: 60px;
  }

  .finish-container {
    display: flex;
    flex-direction: column;
    gap: 50px;
    margin: 0 auto;
    align-items: center;

    .score {
      font-size: 30px;
      color: #e9e9e9;
    }

    .restart-button {
      background-color: #ff6600;
      color: #fff;
      margin-top: 30px;
      border-radius: 30px;
      font-weight: bold;
      font-size: 24px;
      width: 500px;
      height: 60px;

      &:hover {
        background: #30626b;
      }
    }
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

    &.disabled {
      background-color: #aaa;
      opacity: 0.6;
    }
  }
}
</style>
