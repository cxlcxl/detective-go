<script setup>
import { ref } from 'vue'

const feedback = ref('找到它，轻轻点一下。')
const found = ref('')

function choose(item) {
  found.value = item
  feedback.value = item === '星星' ? '找到星星啦！Star，和探长说一说。' : `这是${item}，再看看尖尖角的星星在哪里？`
}
</script>

<template>
  <view class="page sister-page">
    <scroll-view scroll-y class="sister-content safe-area">
      <view class="header screen-padding">
        <text class="brand">小侦探奇遇记</text>
        <view class="profile"><text class="avatar">妹</text><text>妹妹 · 4岁　⌄</text></view>
      </view>
      <view class="screen-padding sister-title">
        <view class="case-kicker"><text>妹妹的奇遇</text><text>一起找一找</text></view>
        <text class="page-title">谁藏起了星星贴纸？</text>
        <text class="subtitle">猫头鹰探长说，它就藏在冒险岛上！</text>
      </view>
      <view class="sister-map">
        <image src="/static/assets/detective-world.svg" mode="aspectFill" />
        <image class="owl" src="/static/assets/owl-detective.svg" mode="aspectFit" />
      </view>
      <view class="prompt screen-padding" @tap="feedback = '请家长读口令：找一找星星。'">
        <text class="sound-dot">▶</text>
        <text>家长读口令：找一找星星！</text>
      </view>
      <view class="object-row screen-padding">
        <button v-for="item in ['月亮', '星星', '云朵']" :key="item" class="object-button" :class="{ found: found === item }" @tap="choose(item)">
          <text v-if="item === '月亮'" class="moon">◐</text>
          <text v-else-if="item === '星星'" class="star">★</text>
          <text v-else class="cloud">●</text>
        </button>
      </view>
      <text class="sister-feedback">{{ feedback }}</text>
      <view class="reward"><image src="/static/assets/owl-detective.svg" mode="aspectFit" /><text>探长陪你慢慢找，不着急。</text></view>
    </scroll-view>
  </view>
</template>

<style scoped>
.sister-page { min-height: 100vh; }
.sister-content { min-height: 100vh; }
.header { display: flex; align-items: center; justify-content: space-between; padding-top: 24rpx; padding-bottom: 18rpx; }
.brand { color: var(--color-primary-dark); font-size: 36rpx; font-weight: 800; }
.profile { display: flex; align-items: center; gap: 8rpx; min-height: 72rpx; padding: 0 14rpx 0 8rpx; border: 1rpx solid var(--color-line); border-radius: 40rpx; background: var(--color-surface); color: var(--color-ink); font-size: 23rpx; font-weight: 600; }
.avatar { display: grid; width: 52rpx; height: 52rpx; border-radius: 50%; background: var(--color-primary-soft); color: var(--color-primary-dark); place-items: center; }
.sister-title { padding-top: 12rpx; padding-bottom: 24rpx; }
.case-kicker { display: flex; justify-content: space-between; margin-bottom: 12rpx; color: var(--color-wheat); font-size: 21rpx; font-weight: 700; }
.subtitle { display: block; margin-top: 8rpx; color: var(--color-ink-muted); font-size: 24rpx; }
.sister-map { position: relative; height: 520rpx; overflow: hidden; margin: 0 32rpx; border-radius: 28rpx; }
.sister-map > image:first-child { width: 100%; height: 100%; }
.sister-map .owl { position: absolute; right: 10rpx; bottom: 6rpx; width: 190rpx; height: 215rpx; }
.prompt { display: flex; align-items: center; gap: 14rpx; margin: 20rpx 32rpx; padding: 18rpx 22rpx; border: 2rpx solid var(--color-line); border-bottom-width: 6rpx; border-radius: 24rpx; background: var(--color-primary-soft); color: var(--color-primary-dark); font-size: 26rpx; font-weight: 700; }
.prompt.screen-padding { padding: 18rpx 22rpx; }
.sound-dot { display: grid; width: 58rpx; height: 58rpx; border-radius: 50%; background: var(--color-focus); color: var(--color-surface); font-size: 22rpx; place-items: center; }
.object-row { display: flex; gap: 18rpx; padding-top: 2rpx; }
.object-button { display: grid; flex: 1; height: 140rpx; padding: 0; border: 3rpx solid var(--color-border-soft); border-bottom-width: 7rpx; border-radius: 26rpx; background: var(--color-surface); place-items: center; }
.object-button.found { border-color: var(--color-primary); background: var(--color-primary-soft); }
.moon { color: var(--color-aqua-ink); font-size: 84rpx; line-height: 1; }
.star { color: var(--color-wheat); font-size: 82rpx; line-height: 1; }
.cloud { color: var(--color-aqua-ink); font-size: 72rpx; line-height: 1; }
.sister-feedback { display: block; min-height: 36rpx; margin: 18rpx 32rpx 12rpx; color: var(--color-ink-muted); font-size: 24rpx; text-align: center; }
.reward { display: flex; align-items: center; justify-content: center; gap: 12rpx; padding: 12rpx 32rpx 30rpx; color: var(--color-ink-muted); font-size: 21rpx; }
.reward image { width: 62rpx; height: 70rpx; }
</style>
