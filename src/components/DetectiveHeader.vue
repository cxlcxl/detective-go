<script setup>
defineProps({
  child: {
    type: String,
    default: '哥哥 · 8岁',
  },
})
</script>

<template>
  <view class="header">
    <text class="brand">小侦探奇遇记</text>
    <view class="profile">
      <text class="avatar">{{ child.slice(0, 1) }}</text>
      <text>{{ child }}</text>
      <text class="chevron">⌄</text>
    </view>
  </view>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 32rpx 18rpx;
}

.brand {
  color: var(--color-primary-dark);
  font-size: 36rpx;
  font-weight: 800;
}

.profile {
  display: flex;
  align-items: center;
  gap: 8rpx;
  min-height: 72rpx;
  padding: 0 14rpx 0 8rpx;
  border: 1rpx solid var(--color-line);
  border-radius: 40rpx;
  background: var(--color-surface);
  color: var(--color-ink);
  font-size: 23rpx;
  font-weight: 600;
}

.avatar {
  display: grid;
  width: 52rpx;
  height: 52rpx;
  border-radius: 50%;
  background: var(--color-wheat-soft);
  color: var(--color-wheat);
  font-size: 24rpx;
  font-weight: 800;
  place-items: center;
}

.chevron {
  color: var(--color-ink-muted);
  font-size: 26rpx;
}
</style>
