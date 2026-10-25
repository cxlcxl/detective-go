<script setup>
import { computed, ref } from 'vue'

const selected = ref('')
const revealed = ref(false)
const feedback = computed(() => {
  if (!revealed.value) return '每次多了几个？先找出这个规律。'
  return selected.value === '15'
    ? '宝箱打开了！每次多 2、3、4、5 个。'
    : '再观察每一队之间多了几个齿轮。'
})

function reveal() {
  revealed.value = true
}
</script>

<template>
  <view class="page lesson-page">
    <scroll-view scroll-y class="lesson-content safe-area">
      <view class="lesson-top screen-padding">
        <text class="step">思维挑战 · 1 / 2</text>
      </view>
      <view class="screen-padding case-banner">
        <text class="case-label">案件 01 · 机关小屋</text>
        <text class="page-title">会长大的齿轮队</text>
        <text class="subtitle">每多一排，就离宝箱近一步。</text>
      </view>

      <view class="chest-scene" aria-hidden="true">
        <view class="glow"></view>
        <view class="chest"><view class="chest-lid"></view><text>{{ revealed && selected === '15' ? '✓' : '?' }}</text></view>
        <text class="sparkle sparkle-one">✦</text>
        <text class="sparkle sparkle-two">✧</text>
      </view>

      <view class="gear-row screen-padding">
        <view v-for="(count, index) in [1, 3, 6, 10]" :key="count" class="gear-tile">
          <view class="gear-picture" aria-hidden="true">
            <view v-for="gear in count" :key="gear" class="gear-icon" />
          </view>
          <text class="gear-count">{{ count }}</text>
          <text class="gear-label">第 {{ index + 1 }} 队</text>
        </view>
        <view class="gear-tile missing">
          <text class="gear-picture">✧</text>
          <text class="gear-count">?</text>
          <text class="gear-label">第 5 队</text>
        </view>
      </view>

      <view class="screen-padding puzzle-body">
        <text class="question">下一队会有几个齿轮？</text>
        <text class="instruction">可以画出来，也可以用积木摆一摆。</text>
        <view class="answer-row">
          <button
            v-for="answer in ['12', '15', '14']"
            :key="answer"
            class="answer"
            :class="{ chosen: selected === answer }"
            @tap="selected = answer"
          >{{ answer }}</button>
        </view>
        <text class="feedback">{{ feedback }}</text>
        <button class="primary-button" @tap="reveal">试着打开宝箱　→</button>
        <text v-if="revealed && selected === '15'" class="helper">说说你是怎么发现的。</text>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped>
.lesson-page { min-height: 100vh; }
.lesson-content { min-height: 100vh; }
.lesson-top { display: flex; justify-content: space-between; padding-top: 32rpx; padding-bottom: 10rpx; }
.step { color: var(--color-ink-muted); font-size: 22rpx; }
.case-banner { padding-top: 16rpx; padding-bottom: 14rpx; }
.case-label { display: inline-block; padding: 8rpx 14rpx; border: 1rpx solid var(--color-wheat-line); border-radius: 10rpx; background: var(--color-wheat-soft); color: var(--color-wheat); font-size: 21rpx; font-weight: 700; }
.case-banner .page-title, .case-banner .subtitle { display: block; }
.case-banner .page-title { margin-top: 18rpx; }
.case-banner .subtitle { margin-top: 8rpx; }
.chest-scene { position: relative; height: 250rpx; overflow: hidden; background: var(--color-paper); }
.glow { position: absolute; top: 0; left: 50%; width: 270rpx; height: 270rpx; border-radius: 50%; background: var(--color-wheat-soft); opacity: .55; transform: translateX(-50%); }
.chest { position: absolute; top: 92rpx; left: 50%; width: 220rpx; height: 116rpx; border: 5rpx solid var(--color-wood-edge); border-radius: 16rpx 16rpx 24rpx 24rpx; background: var(--color-wood); box-shadow: 0 12rpx 0 var(--color-shadow); color: var(--color-wheat); text-align: center; transform: translateX(-50%) rotate(-3deg); }
.chest-lid { position: absolute; top: -44rpx; left: -5rpx; width: 220rpx; height: 64rpx; border: 5rpx solid var(--color-wood-edge); border-radius: 48rpx 48rpx 6rpx 6rpx; background: var(--color-wood-light); }
.chest text { position: relative; z-index: 1; display: inline-block; width: 54rpx; height: 58rpx; margin-top: 28rpx; border: 3rpx solid var(--color-wood-edge); border-radius: 10rpx; background: var(--color-wheat-soft); color: var(--color-primary-dark); font-size: 38rpx; font-weight: 800; line-height: 54rpx; }
.sparkle { position: absolute; color: var(--color-wheat); font-size: 38rpx; }
.sparkle-one { top: 68rpx; left: 18%; }
.sparkle-two { top: 138rpx; right: 18%; }
.gear-row { display: flex; gap: 10rpx; padding-top: 8rpx; padding-bottom: 8rpx; }
.gear-tile { display: flex; flex: 1; min-width: 0; flex-direction: column; align-items: center; justify-content: flex-end; min-height: 166rpx; padding: 10rpx 2rpx; border: 2rpx solid var(--color-wheat-line); border-bottom-width: 6rpx; border-radius: 20rpx; background: var(--color-wheat-soft); color: var(--color-wheat); }
.gear-picture { display: grid; width: 76rpx; min-height: 64rpx; grid-template-columns: repeat(4, 16rpx); align-content: end; align-items: center; justify-content: center; gap: 5rpx; }
.gear-icon { position: relative; width: 13rpx; height: 13rpx; border-radius: 5rpx; background: var(--color-accent); box-shadow: 0 -4rpx 0 -1rpx var(--color-accent), 0 4rpx 0 -1rpx var(--color-accent), 4rpx 0 0 -1rpx var(--color-accent), -4rpx 0 0 -1rpx var(--color-accent); }
.gear-icon::after { position: absolute; top: 4rpx; left: 4rpx; width: 5rpx; height: 5rpx; border-radius: 50%; background: var(--color-wheat-soft); content: ''; }
.gear-count { margin-top: 3rpx; color: var(--color-ink); font-family: Georgia, serif; font-size: 37rpx; font-weight: 800; }
.gear-label { margin-top: 2rpx; color: var(--color-ink-muted); font-size: 17rpx; white-space: nowrap; }
.gear-tile.missing { border: 2rpx dashed var(--color-primary); background: var(--color-primary-soft); }
.gear-tile.missing .gear-picture { color: var(--color-primary); font-size: 36rpx; }
.puzzle-body { padding-top: 18rpx; }
.question { display: block; font-size: 34rpx; font-weight: 800; }
.instruction { display: block; margin-top: 8rpx; color: var(--color-ink-muted); font-size: 23rpx; }
.answer-row { display: flex; gap: 14rpx; margin-top: 22rpx; }
.answer { flex: 1; min-height: 94rpx; padding: 0; border: 3rpx solid var(--color-border-soft); border-bottom-width: 6rpx; border-radius: 20rpx; background: var(--color-surface); color: var(--color-ink); font-family: Georgia, serif; font-size: 36rpx; font-weight: 700; line-height: 84rpx; }
.answer.chosen { border-color: var(--color-primary); background: var(--color-primary-soft); color: var(--color-primary-dark); }
.feedback { display: block; min-height: 54rpx; margin-top: 12rpx; color: var(--color-ink-muted); font-size: 22rpx; line-height: 1.5; }
.primary-button { margin-top: 6rpx; }
.helper { display: block; margin-top: 10rpx; color: var(--color-ink-muted); font-size: 21rpx; text-align: center; }
</style>
