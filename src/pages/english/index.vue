<script setup>
import { ref } from 'vue'

const feedback = ref('探长陪你先说一小句，慢慢来就好。')
const feedbackTitle = ref('不用说得很完美。')

function listen() {
  feedbackTitle.value = '试着跟读一遍。'
  feedback.value = '短句是 Hello! A star? 可以先和家长一起读。'
}

function answer() {
  feedbackTitle.value = '你找到了一条线索！'
  feedback.value = '“我看到星星徽章往河边去了！”这里先演示反馈，不录音，也不判断发音。'
}

function openHistory() {
  uni.switchTab({ url: '/pages/history/index' })
}
</script>

<template>
  <view class="page lesson-page">
    <scroll-view scroll-y class="lesson-content safe-area">
      <view class="lesson-top screen-padding">
        <text class="step">英语口语 · 1 / 3</text>
      </view>
      <view class="screen-padding case-banner">
        <text class="case-label">案件 01 · 车站证词</text>
        <text class="page-title">问问火车站长</text>
        <text class="subtitle">听一句，跟着说，再换个词试试。</text>
      </view>

      <view class="station-scene">
        <image src="/static/assets/train-scene.svg" mode="aspectFill" />
        <view class="speech-bubble">
          <text>Did you see a star badge?</text>
          <text>你有看到星星徽章吗？</text>
        </view>
      </view>

      <view class="screen-padding">
        <view class="goal">
          <text class="goal-label">侦探任务</text>
          <text>跟站长打招呼，问问他有没有看到徽章。</text>
        </view>
        <view class="phrase card">
          <text>Hello! A star?</text>
          <text>先说“你好！星星？”也可以，试着问一问。</text>
        </view>
        <view class="action-row">
          <button class="secondary-button" @tap="listen">看示范短句</button>
          <button class="primary-button" @tap="answer">演示开口反馈</button>
        </view>
        <view class="evidence card">
          <image src="/static/assets/owl-detective.svg" mode="aspectFit" />
          <view>
            <text class="evidence-title">{{ feedbackTitle }}</text>
            <text class="evidence-copy">{{ feedback }}</text>
          </view>
        </view>
        <view class="next-link" @tap="openHistory">
          <text class="dot"></text>
          <text>把对话线索放进证据册　›</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped>
.lesson-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.lesson-content {
  flex: 1;
  min-height: 0;
}

.lesson-top {
  display: flex;
  justify-content: space-between;
  padding-top: 32rpx;
  padding-bottom: 10rpx;
}

.step {
  color: var(--color-ink-muted);
  font-size: 22rpx;
}

.case-banner {
  padding-top: 16rpx;
  padding-bottom: 24rpx;
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

.case-banner .page-title {
  display: block;
  margin-top: 18rpx;
}

.case-banner .subtitle {
  display: block;
  margin-top: 8rpx;
}

.station-scene {
  position: relative;
  height: 420rpx;
  overflow: hidden;
}

.station-scene image {
  width: 100%;
  height: 100%;
}

.speech-bubble {
  position: absolute;
  top: 20rpx;
  left: 32rpx;
  max-width: 74%;
  padding: 18rpx 20rpx;
  border: 1rpx solid var(--color-border-soft);
  border-radius: 22rpx 22rpx 0 22rpx;
  background: var(--color-surface);
  color: var(--color-primary-dark);
  box-shadow: 0 6rpx 0 var(--color-shadow);
  font-family: Georgia, serif;
  font-size: 29rpx;
  font-weight: 700;
}

.speech-bubble text {
  display: block;
}

.speech-bubble text + text {
  margin-top: 8rpx;
  color: var(--color-ink-muted);
  font-family: inherit;
  font-size: 21rpx;
  font-weight: 400;
}

.goal {
  padding: 20rpx 0 12rpx;
  color: var(--color-ink);
  font-size: 24rpx;
}

.goal-label {
  display: block;
  margin-bottom: 8rpx;
  color: var(--color-wheat);
  font-size: 21rpx;
  font-weight: 700;
}

.phrase {
  margin: 10rpx 0 20rpx;
  padding: 26rpx 16rpx;
  text-align: center;
}

.phrase text {
  display: block;
}

.phrase text:first-child {
  color: var(--color-primary-dark);
  font-family: Georgia, serif;
  font-size: 40rpx;
  font-weight: 700;
}

.phrase text + text {
  margin-top: 10rpx;
  color: var(--color-ink-muted);
  font-size: 21rpx;
}

.action-row {
  display: flex;
  gap: 16rpx;
}

.action-row button {
  flex: 1;
}

button {
  margin: 0;
}

.evidence {
  display: flex;
  align-items: center;
  margin-top: 22rpx;
  padding: 16rpx;
}

.evidence image {
  width: 72rpx;
  height: 80rpx;
  margin-right: 14rpx;
}

.evidence-title,
.evidence-copy {
  display: block;
}

.evidence-title {
  color: var(--color-primary-dark);
  font-size: 23rpx;
  font-weight: 700;
}

.evidence-copy {
  margin-top: 6rpx;
  color: var(--color-ink-muted);
  font-size: 21rpx;
  line-height: 1.55;
}

.next-link {
  display: flex;
  align-items: center;
  padding: 28rpx 0;
  color: var(--color-primary);
  font-size: 22rpx;
}

.dot {
  width: 12rpx;
  height: 12rpx;
  margin-right: 12rpx;
  border-radius: 50%;
  background: var(--color-focus);
}
</style>
