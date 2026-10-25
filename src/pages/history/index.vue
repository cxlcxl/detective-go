<script setup>
const eras = [
  { date: '约公元前 1300 年', china: '甲骨上刻下文字', world: '纸草上写下记录', chinaTag: '中国 · 商朝', worldTag: '古埃及 · 新王国', chinaSymbol: '卜', worldSymbol: '≋' },
  { date: '公元 105 年前后', china: '蔡伦改进造纸术', world: '石头上也有文字', chinaTag: '中国 · 东汉', worldTag: '罗马帝国时期', chinaSymbol: '文', worldSymbol: 'A' },
]

function openParent() {
  uni.switchTab({ url: '/pages/parent/index' })
}
</script>

<template>
  <view class="page history-page">
    <scroll-view scroll-y class="history-content safe-area">
      <view class="lesson-top screen-padding">
        <text class="step">历史探索 · 古代</text>
      </view>
      <view class="screen-padding intro">
        <text class="case-label">案件 01 · 旧日密码</text>
        <text class="page-title">沿时间河找证据</text>
        <text class="subtitle">人们很久以前就想把事情记下来。</text>
      </view>
      <view class="river-title">
        <text>中国</text>
        <text class="river-note">同一时期，看看两岸</text>
        <text>世界</text>
      </view>
      <view class="timeline screen-padding">
        <view class="river"></view>
        <view v-for="era in eras" :key="era.date" class="era">
          <text class="date">{{ era.date }}</text>
          <view class="era-row">
            <view class="event-card">
              <text class="object">{{ era.chinaSymbol }}</text>
              <text class="event-tag">{{ era.chinaTag }}</text>
              <text class="event-title">{{ era.china }}</text>
            </view>
            <view class="event-card">
              <text class="object world-object">{{ era.worldSymbol }}</text>
              <text class="event-tag">{{ era.worldTag }}</text>
              <text class="event-title">{{ era.world }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="screen-padding">
        <view class="question card">
          <text class="question-mark">?</text>
          <view>
            <text class="question-title">你的发现是什么？</text>
            <text class="question-copy">他们用的材料不同，都想把事情留下来。</text>
          </view>
        </view>
        <view class="primary-button" @tap="openParent">把发现装进证据册　→</view>
        <text class="source-note">布局示例 · 节点间距不代表实际时长 · 史料待教材校对</text>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped>
.history-page { min-height: 100vh; }
.history-content { min-height: 100vh; }
.lesson-top { display: flex; justify-content: space-between; padding-top: 32rpx; padding-bottom: 10rpx; }
.step { color: var(--color-ink-muted); font-size: 22rpx; }
.intro { padding-top: 16rpx; padding-bottom: 22rpx; }
.case-label { display: inline-block; padding: 8rpx 14rpx; border: 1rpx solid var(--color-line); border-radius: 10rpx; background: var(--color-primary-soft); color: var(--color-primary-dark); font-size: 21rpx; font-weight: 700; }
.intro .page-title, .intro .subtitle { display: block; }
.intro .page-title { margin-top: 18rpx; }
.intro .subtitle { margin-top: 8rpx; }
.river-title { display: flex; align-items: center; justify-content: space-between; margin: 0 32rpx; padding: 18rpx 28rpx; border-radius: 22rpx; background: var(--color-primary-soft); color: var(--color-primary-dark); font-size: 23rpx; font-weight: 700; }
.river-note { color: var(--color-ink-muted); font-size: 19rpx; font-weight: 500; }
.timeline { position: relative; padding-top: 24rpx; padding-bottom: 6rpx; }
.river { position: absolute; top: 0; bottom: 0; left: 50%; width: 92rpx; border-radius: 50%; background: var(--color-aqua-soft); transform: translateX(-50%) rotate(9deg); }
.era { position: relative; z-index: 1; }
.date { display: block; width: max-content; margin: 0 auto 20rpx; padding: 10rpx 20rpx; border: 2rpx solid var(--color-line); border-radius: 26rpx; background: var(--color-surface); color: var(--color-primary); font-size: 19rpx; }
.era + .era { margin-top: 34rpx; }
.era-row { display: flex; gap: 24rpx; }
.event-card { flex: 1; min-height: 184rpx; padding: 18rpx 12rpx; border: 2rpx solid var(--color-border-soft); border-bottom-width: 6rpx; border-radius: 22rpx; background: var(--color-surface); text-align: center; }
.object { display: grid; width: 66rpx; height: 66rpx; margin: 0 auto 10rpx; border: 3rpx solid var(--color-accent-line); border-radius: 12rpx; background: var(--color-accent-soft); color: var(--color-accent); font-family: Georgia, serif; font-size: 32rpx; font-weight: 800; place-items: center; transform: rotate(-7deg); }
.world-object { border-color: var(--color-line); background: var(--color-surface-muted); color: var(--color-primary-dark); transform: rotate(5deg); }
.event-tag, .event-title { display: block; }
.event-tag { color: var(--color-ink-muted); font-size: 18rpx; }
.event-title { margin-top: 10rpx; color: var(--color-ink); font-size: 23rpx; font-weight: 700; line-height: 1.35; }
.question { display: flex; align-items: center; gap: 14rpx; padding: 20rpx; background: var(--color-wheat-soft); border-color: var(--color-wheat-line); }
.question-mark { display: grid; width: 58rpx; height: 58rpx; border: 2rpx solid var(--color-accent-line); border-radius: 50%; background: var(--color-accent-soft); color: var(--color-accent); font-family: Georgia, serif; font-size: 34rpx; place-items: center; }
.question-title, .question-copy { display: block; }
.question-title { font-size: 23rpx; font-weight: 700; }
.question-copy { margin-top: 5rpx; color: var(--color-ink-muted); font-size: 20rpx; }
.primary-button { margin-top: 18rpx; }
.source-note { display: block; margin: 16rpx 0 8rpx; color: var(--color-ink-muted); font-size: 18rpx; line-height: 1.5; text-align: center; }
</style>
