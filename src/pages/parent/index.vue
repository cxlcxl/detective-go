<script setup>
const records = [
  { title: '英语 · 问问火车站长', date: '今天', text: '愿意跟着说问句，还主动换成了“星星徽章”。', tone: 'warm' },
  { title: '数学 · 齿轮密码', date: '昨天', text: '发现齿轮每次多一排，试着用积木摆出下一队。', tone: 'wheat' },
  { title: '历史 · 沿时间河找证据', date: '周日', text: '发现不同地方的人都曾用文字留下记录。', tone: 'green' },
]
</script>

<template>
  <view class="page parent-page">
    <scroll-view scroll-y class="parent-content safe-area">
      <view class="screen-padding parent-head">
        <text class="page-title">家庭证据册</text>
        <text class="subtitle">看看孩子正在好奇什么、怎样找到答案。</text>
      </view>
      <view class="child-switch screen-padding">
        <view class="child-chip active">哥哥 · 8岁</view>
        <view class="child-chip">妹妹 · 4岁</view>
      </view>
      <view class="screen-padding">
        <text class="section-title">哥哥的探索记录</text>
        <view v-for="record in records" :key="record.title" class="record" :class="record.tone">
          <view class="record-top"><text>{{ record.title }}</text><text class="date">{{ record.date }}</text></view>
          <text class="record-copy">{{ record.text }}</text>
        </view>
        <view class="parent-tip">
          <text class="tip-title">今天可以这样聊</text>
          <text>“你从哪儿发现这个线索的？”先听孩子讲完，再一起把发现收进探险本。</text>
        </view>
        <text class="section-title settings-title">家庭设置</text>
        <view class="settings card">
          <text class="setting-icon">家</text>
          <view><text class="setting-title">孩子档案与内容偏好</text><text class="setting-copy">年龄、年级、每日时长</text></view>
          <text class="setting-arrow">›</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped>
.parent-page { min-height: 100vh; }
.parent-content { min-height: 100vh; }
.parent-head { padding-top: 44rpx; padding-bottom: 24rpx; }
.parent-head .page-title, .parent-head .subtitle { display: block; }
.parent-head .subtitle { margin-top: 10rpx; }
.child-switch { display: flex; padding-top: 8rpx; padding-bottom: 8rpx; border-radius: 28rpx; background: var(--color-surface-muted); }
.child-chip { flex: 1; padding: 18rpx 12rpx; border-radius: 20rpx; color: var(--color-ink); font-size: 23rpx; text-align: center; }
.child-chip.active { border: 1rpx solid var(--color-line); background: var(--color-surface); color: var(--color-primary-dark); font-weight: 700; box-shadow: 0 4rpx 8rpx var(--color-shadow); }
.section-title { display: block; margin: 24rpx 0 14rpx; font-size: 29rpx; font-weight: 800; }
.record { margin: 14rpx 0; padding: 22rpx 20rpx; border: 1rpx solid var(--color-border-soft); border-left: 8rpx solid var(--color-accent-line); border-radius: 22rpx; background: var(--color-surface); }
.record.wheat { border-left-color: var(--color-wheat-line); }
.record.green { border-left-color: var(--color-primary-soft); }
.record-top { display: flex; justify-content: space-between; gap: 12rpx; font-size: 24rpx; font-weight: 700; }
.record-top .date { color: var(--color-ink-muted); font-size: 19rpx; font-weight: 400; white-space: nowrap; }
.record-copy { display: block; margin-top: 10rpx; color: var(--color-ink-muted); font-size: 22rpx; line-height: 1.55; }
.parent-tip { margin-top: 22rpx; padding: 22rpx; border-radius: 22rpx; background: var(--color-primary-soft); color: var(--color-primary-dark); font-size: 22rpx; line-height: 1.6; }
.tip-title { display: block; margin-bottom: 6rpx; font-size: 24rpx; font-weight: 700; }
.settings-title { margin-top: 30rpx; }
.settings { display: flex; align-items: center; padding: 18rpx; }
.setting-icon { display: grid; width: 58rpx; height: 58rpx; margin-right: 16rpx; border-radius: 12rpx; background: var(--color-aqua-soft); color: var(--color-aqua-ink); font-size: 24rpx; place-items: center; }
.setting-title, .setting-copy { display: block; }
.setting-title { font-size: 23rpx; font-weight: 700; }
.setting-copy { margin-top: 4rpx; color: var(--color-ink-muted); font-size: 19rpx; }
.setting-arrow { margin-left: auto; color: var(--color-ink-muted); font-size: 36rpx; }
</style>
