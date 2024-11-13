<script setup>
import {computed, onMounted, ref} from 'vue'
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
      <img :src="score === 10 ? '/img/secret.png' : '/img/photo_21_2024-11-11_13-22-23.jpg'" alt="" class="finish-img">
      <VButton
          class="restart-button"
          name="Пройти заново"
          @click="restartQuiz"
      />
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
    background-color: #fff;
    border-radius: 8px;
    padding: 30px;
    max-width: 500px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    .finish-img {
      width: 100%;
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

  .counter {
    font-size: 20px;
    color: #fff;
    background-color: #ff5722;
    padding: 20px;
    border-radius: 12px;
    position: absolute;
    top: 20px;
    right: 20px;
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
