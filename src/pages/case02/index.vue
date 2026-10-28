<script setup>
import { computed, ref } from 'vue'
import { onUnload } from '@dcloudio/uni-app'
import caseData from '../../content/case-02.json'

const BUSH_COUNT = 4
const ZH = {
  intro: '快看！那是什么？',
  no: '不是哦。影子又露出一块，再看看？',
  yes: '是的！',
  reveal: '原来是一只风筝！',
  'reveal-red': '是一只红风筝！',
}

const audio = uni.createInnerAudioContext()
let finishPlayback = null
audio.onEnded(() => finishPlayback?.())
audio.onError(() => finishPlayback?.())
onUnload(() => audio.destroy())

const slow = ref(false)
const busy = ref(false)
const stage = ref('listen') // listen → item → colour → solved
const asked = ref([])
const bubbleKey = ref('intro')

const revealed = computed(() => (stage.value === 'item' ? asked.value.length : stage.value === 'listen' ? 0 : BUSH_COUNT))
const bubble = computed(() => ({ en: caseData.lines[bubbleKey.value].text, zh: ZH[bubbleKey.value] ?? '' }))
const sceneImage = computed(() => ({
  colour: '/static/assets/case02-kite-grey.svg',
  solved: '/static/assets/case02-kite-red.svg',
}[stage.value] ?? '/static/assets/case02-shadow.svg'))
const heading = computed(() => ({
  listen: { title: '树丛后面有个怪影子', hint: '先听听大家在说什么。' },
  item: { title: '它是什么？问一问！', hint: '点一张图，跟着说 Is it a...?' },
  colour: { title: '风筝是什么颜色？', hint: '换个问法：Is it red?' },
  solved: { title: '案件破了！', hint: '你用英语问出了真相。' },
}[stage.value]))

function play(name) {
  return new Promise((resolve) => {
    finishPlayback = () => {
      finishPlayback = null
      resolve()
    }
    audio.stop()
    audio.src = `/static/audio/${caseData.id}/${name}${slow.value ? '-slow' : ''}.mp3`
    audio.play()
  })
}

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function speak(name) {
  if (ZH[name] !== undefined) bubbleKey.value = name
  await play(name)
}

async function startCase() {
  if (busy.value) return
  busy.value = true
  await speak('intro')
  stage.value = 'item'
  busy.value = false
}

// 先播孩子要跟读的问句，停顿一下留出跟读时间，再由探长回答
async function ask(id, answerId, onCorrect) {
  if (busy.value || asked.value.includes(id)) return
  busy.value = true
  await play(`ask-${id}`)
  await pause(slow.value ? 1600 : 1100)
  asked.value = [...asked.value, id]
  if (id === answerId) {
    await speak('yes')
    await onCorrect()
  } else {
    await speak('no')
  }
  busy.value = false
}

function askItem(id) {
  return ask(id, caseData.answer.item, async () => {
    stage.value = 'colour'
    asked.value = []
    await speak('reveal')
  })
}

function askColour(id) {
  return ask(id, caseData.answer.colour, async () => {
    stage.value = 'solved'
    await speak('reveal-red')
  })
}

function replay() {
  if (!busy.value) play(bubbleKey.value)
}

function restart() {
  if (busy.value) return
  stage.value = 'listen'
  asked.value = []
  bubbleKey.value = 'intro'
}

function goHome() {
  uni.navigateBack({ fail: () => uni.switchTab({ url: '/pages/index/index' }) })
}
</script>
<template>
  <view class="page case-page">
    <scroll-view scroll-y class="case-content safe-area">
      <view class="screen-padding case-banner">
        <text class="case-label">案件 02 · 一年级上册 Module 7</text>
        <text class="page-title">{{ heading.title }}</text>
        <text class="subtitle">{{ heading.hint }}</text>
      </view>

      <view class="park-scene">
        <image class="suspect" :src="sceneImage" mode="aspectFit" />
        <view class="bushes">
          <view
            v-for="index in 4"
            :key="index"
            class="bush"
            :class="{ gone: index <= revealed }"
          ></view>
        </view>
        <view class="speech-bubble" @tap="replay">
          <text>{{ bubble.en }}</text>
          <text>{{ bubble.zh }}</text>
        </view>
      </view>

      <view class="screen-padding">
        <view class="audio-row">
          <button class="secondary-button" aria-label="再听一遍" @tap="replay">🔊 再听一遍</button>
          <button
            class="secondary-button"
            :class="{ active: slow }"
            :aria-label="slow ? '切换为正常语速' : '切换为慢速'"
            @tap="slow = !slow"
          >🐌 {{ slow ? '慢速中' : '慢一点' }}</button>
        </view>

        <button v-if="stage === 'listen'" class="primary-button start" @tap="startCase">开始调查</button>

        <view v-else-if="stage !== 'solved'" class="choices">
          <view
            v-for="option in stage === 'item' ? caseData.items : caseData.colours"
            :key="option.id"
            class="choice card"
            :class="{ used: asked.includes(option.id), locked: busy }"
            :aria-label="`问：Is it ${stage === 'item' ? 'a ' : ''}${option.id}?`"
            @tap="stage === 'item' ? askItem(option.id) : askColour(option.id)"
          >
            <image :src="option.image" mode="aspectFit" />
            <text class="choice-en">{{ option.id }}</text>
            <text class="choice-zh">{{ option.zh }}</text>
          </view>
        </view>

        <view v-else class="solved card">
          <image src="/static/assets/owl-detective.svg" mode="aspectFit" />
          <view>
            <text class="solved-title">回家再当一次出题人</text>
            <text class="solved-copy">{{ caseData.parentTask }}</text>
          </view>
        </view>

        <view v-if="stage === 'solved'" class="action-row">
          <button class="secondary-button" @tap="restart">再玩一次</button>
          <button class="primary-button" @tap="goHome">回到地图</button>
        </view>

        <text class="hint">每问一次都会多一条线索，猜错也没关系。</text>
      </view>
    </scroll-view>
  </view>
</template>
<style scoped>
.case-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.case-content {
  flex: 1;
  min-height: 0;
}

.case-banner {
  padding-top: 28rpx;
  padding-bottom: 20rpx;
}

.case-label {
  display: inline-block;
  padding: 8rpx 14rpx;
  border: 1rpx solid var(--color-border-soft);
  border-radius: 10rpx;
  background: var(--color-terracotta-soft);
  color: var(--color-terracotta);
  font-size: 21rpx;
  font-weight: 700;
}

.case-banner .page-title,
.case-banner .subtitle {
  display: block;
}

.case-banner .subtitle {
  margin-top: 8rpx;
  font-size: 24rpx;
}

.park-scene {
  position: relative;
  height: 480rpx;
  overflow: hidden;
  background: var(--color-primary-soft);
}

.suspect {
  position: absolute;
  top: 160rpx;
  left: 50%;
  width: 260rpx;
  height: 260rpx;
  margin-left: -130rpx;
}

.bushes {
  position: absolute;
  top: 150rpx;
  left: 50%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 300rpx;
  height: 300rpx;
  margin-left: -150rpx;
}

.bush {
  border: 3rpx solid var(--color-primary);
  border-radius: 50%;
  background: var(--color-primary-dark);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.bush.gone {
  opacity: 0;
  transform: scale(0.6);
}

.speech-bubble {
  position: absolute;
  top: 20rpx;
  left: 32rpx;
  max-width: 76%;
  padding: 16rpx 20rpx;
  border: 1rpx solid var(--color-border-soft);
  border-radius: 22rpx 22rpx 22rpx 0;
  background: var(--color-surface);
  color: var(--color-primary-dark);
  box-shadow: 0 6rpx 0 var(--color-shadow);
  font-family: Georgia, serif;
  font-size: 32rpx;
  font-weight: 700;
}

.speech-bubble text {
  display: block;
}

.speech-bubble text + text {
  margin-top: 6rpx;
  color: var(--color-ink-muted);
  font-family: inherit;
  font-size: 22rpx;
  font-weight: 400;
}

.audio-row,
.action-row {
  display: flex;
  gap: 16rpx;
}

.audio-row button,
.action-row button {
  flex: 1;
}

button {
  margin: 0;
}

.audio-row .active {
  background: var(--color-primary);
  color: var(--color-surface);
}

.start {
  margin-top: 24rpx;
}

.choices {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rpx;
  margin-top: 24rpx;
}

.choice {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16rpx 8rpx;
}

.choice image {
  width: 120rpx;
  height: 120rpx;
}

.choice-en {
  margin-top: 6rpx;
  color: var(--color-primary-dark);
  font-family: Georgia, serif;
  font-size: 30rpx;
  font-weight: 700;
}

.choice-zh {
  color: var(--color-ink-muted);
  font-size: 21rpx;
}

.choice.used {
  border-style: dashed;
  background: var(--color-surface-muted);
  opacity: 0.55;
}

.choice.locked {
  pointer-events: none;
}

.solved {
  display: flex;
  align-items: center;
  margin: 24rpx 0;
  padding: 20rpx;
  background: var(--color-wheat-soft);
}

.solved image {
  width: 80rpx;
  height: 90rpx;
  margin-right: 16rpx;
}

.solved-title,
.solved-copy {
  display: block;
}

.solved-title {
  color: var(--color-primary-dark);
  font-size: 26rpx;
  font-weight: 700;
}

.solved-copy {
  margin-top: 6rpx;
  color: var(--color-ink);
  font-size: 23rpx;
  line-height: 1.55;
}

.hint {
  display: block;
  padding: 24rpx 0;
  color: var(--color-ink-muted);
  font-size: 21rpx;
  text-align: center;
}
</style>
