<script setup>
import {computed, ref} from 'vue'
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
      'Я не коммерция',
      'Боже, храни кьют-рок',
      'Улыбнись',
    ],
    correctAnswer: 1,
  },
  {
    question: "С каким исполнителем Дора записала популярную песню 'Дорадура'?",
    image: '/img/photo_16_2024-11-11_13-22-23.jpg',
    answers: ['Мэйби Бэйби', 'Моргенштерн', 'Сольный трек', 'Pharaoh'],
    correctAnswer: 2,
  },
  {
    question: 'Какую из следующих песен НЕ исполняет Дора?',
    image: '/img/photo_20_2024-11-11_13-22-23.jpg',
    answers: ['Втюрилась', 'Пошлю его на...', 'Капли', 'Богиня'],
    correctAnswer: 3,
  },
  {
    question: 'В каком году Дора начала свою музыкальную карьеру?',
    image: '/img/photo_24_2024-11-11_13-22-23.jpg',
    answers: ['2015', '2018', '2020', '2021'],
    correctAnswer: 0,
  },
  {
    question:
        'Как называется группа, в составе которой Дора исполняла песни до сольной карьеры?',
    image: '/img/photo_25_2024-11-11_13-22-23.jpg',
    answers: ['Френды', 'Нервы', 'Пошлая Молли', 'The Retuses'],
    correctAnswer: 3,
  },
  {
    question: 'В каком городе родилась Дора?',
    image: '/img/photo_13_2024-11-11_13-22-23.jpg',
    answers: ['Санкт-Петербург', 'Саратов', 'Москва', 'Владивосток'],
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

const currentQuestionIndex = ref(0)
const selectedAnswerIndex = ref(null)
const score = ref(0)
const isAnswered = ref(false)
const isQuizFinished = ref(false)
const isLoading = ref(false)
const isTransitionLoading = ref(false)

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const progressWidth = computed(() => `${((currentQuestionIndex.value + 1) / questions.value.length) * 100}%`)
const isAnswerSelected = computed(() => selectedAnswerIndex.value !== null)

const selectAnswer = (index) => {
  if (isAnswered.value) return
  selectedAnswerIndex.value = index
  isAnswered.value = true
}

const nextQuestion = () => {
  if (!isAnswered.value) return

  if (selectedAnswerIndex.value === currentQuestion.value.correctAnswer) {
    score.value++
  }

  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
    resetSelection()
  } else {
    triggerFinishTransition()
  }
}

const triggerFinishTransition = () => {
  isTransitionLoading.value = true
  setTimeout(() => {
    isTransitionLoading.value = false
    isQuizFinished.value = true
  }, 1000)
}

const resetSelection = () => {
  selectedAnswerIndex.value = null
  isAnswered.value = false
}

const restartQuiz = () => {
  currentQuestionIndex.value = 0
  score.value = 0
  isQuizFinished.value = false
  resetSelection()
}

const restartQuizWithDelay = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    restartQuiz()
  }, 1000)
}
</script>

<template>
  <div class="page">
    <div v-if="isTransitionLoading" class="spinner-container">
      <div class="spinner"></div>
    </div>
    <div v-else-if="!isQuizFinished" class="page-container">
      <div class="progress-bar">
        <div class="progress-bar-fill" :style="{ width: progressWidth }"></div>
      </div>
      <div class="container-picture">
        <img :src="currentQuestion.image" alt="Quiz Image" class="picture"/>
      </div>
      <div class="quiz-container">
        <div class="title">{{ currentQuestion.question }}</div>
        <div class="answers">
          <button
              v-for="(answer, index) in currentQuestion.answers"
              :key="index"
              @click="selectAnswer(index)"
              :class="['answer', { selected: index === selectedAnswerIndex }]"
          >
            {{ answer }}
          </button>
        </div>
        <VButton
            class="button-next"
            name="Дальше"
            @click="nextQuestion"
            :disabled="!isAnswerSelected"
        />
      </div>
    </div>
    <div v-else class="finish-container">
      <div v-if="isLoading" class="spinner"></div>
      <div v-else class="finish">
        <div class="score">Ваш результат: {{ score }} из {{ questions.length }}</div>
        <img
            :src="score === 10 ? '/img/secret.png' : '/img/photo_21_2024-11-11_13-22-23.jpg'"
            alt="Результат"
            class="finish-img"
        />
        <VButton
            class="restart-button"
            name="Пройти заново"
            @click="restartQuizWithDelay"
        />
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

  .spinner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    height: 806px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #ff5722;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 600px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .finish-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 8px;
    padding: 30px;
    width: 600px;
    height: 806px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    .finish {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #ff5722;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      margin: 350px auto;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .finish-img {
      width: 95%;
      margin-bottom: 20px;
    }

    .score {
      font-size: 24px;
      color: #333;
      margin-bottom: 20px;
    }

    .restart-button {
      background-color: #ff5722;
      color: #fff;
      font-weight: bold;
      font-size: 18px;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #e64a19;
      }
    }
  }

  .progress-bar {
    width: 95%;
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    margin: 20px 0;

    .progress-bar-fill {
      height: 100%;
      background-color: #ff5722;
      transition: width 0.3s ease-in-out;
    }
  }

  .container-picture {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    overflow: hidden;

    .picture {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px 8px 0 0;
      object-position: top;
    }
  }

  .quiz-container {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    padding: 20px;

    .title {
      font-size: 20px;
      font-weight: bold;
      color: #333;
      margin-bottom: 15px;
      height: 60px;
    }

    .answers {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-bottom: 20px;

      .answer {
        padding: 12px;
        background-color: #f0f0f0;
        border-radius: 5px;
        color: #333;
        cursor: pointer;
        transition: 0.3s all ease;

        &:hover {
          background-color: #ddd;
        }

        &:focus {
          background-color: #ccc;
        }
      }
    }

    .button-next {
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

      &.disabled {
        background-color: #aaa;
        opacity: 0.6;
      }
    }
  }
}

</style>