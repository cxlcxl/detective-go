<script setup>
import DetectiveHeader from '../../components/DetectiveHeader.vue'

const missions = [
  { icon: 'A', title: '问问火车站长', hint: '开口说英语，听听新线索', path: '/pages/english/index', tone: 'english' },
  { icon: '2', title: '破解齿轮密码', hint: '看规律，找出宝箱密码', path: '/pages/math/index', tone: 'math' },
  { icon: '时', title: '沿时间河找证据', hint: '看看古人怎样留下记录', path: '/pages/history/index', tone: 'history' },
]

function openMission(path) {
  if (path === '/pages/history/index') {
    uni.switchTab({ url: path })
    return
  }
  uni.navigateTo({ url: path })
}
</script>

<template>
  <view class="page index-page">
    <DetectiveHeader />
    <scroll-view scroll-y class="content safe-area">
      <view class="case-kicker">
        <text>今日新案件</text>
        <text>案件 01</text>
      </view>
      <view class="screen-padding title-block">
        <text class="page-title">星星徽章去哪了？</text>
        <text class="subtitle">邮车马上出发，猫头鹰探长需要你的帮忙！</text>
      </view>

      <view class="map-scene">
        <image class="map-image" src="/static/assets/detective-world.svg" mode="aspectFill" />
        <view class="clue-counter">线索 <text>0</text> / 3</view>
        <view class="map-tag train-tag">英语线索</view>
        <view class="map-tag math-tag">数学机关</view>
        <view class="map-tag history-tag">历史河岸</view>
      </view>

      <view class="case-prompt screen-padding">
        <text class="case-stamp">侦</text>
        <view>
          <text class="prompt-title">选一个地点，开始调查！</text>
          <text class="prompt-hint">三个入口都能找到重要线索</text>
        </view>
      </view>

      <view class="mission-list screen-padding">
        <view
          v-for="mission in missions"
          :key="mission.title"
          class="mission card"
          :class="mission.tone"
          @tap="openMission(mission.path)"
        >
          <text class="mission-icon">{{ mission.icon }}</text>
          <view class="mission-copy">
            <text class="mission-title">{{ mission.title }}</text>
            <text class="mission-hint">{{ mission.hint }}</text>
          </view>
          <text class="mission-arrow">›</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped>
.index-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  flex: 1;
  min-height: 0;
}

.case-kicker {
  display: flex;
  justify-content: space-between;
  padding: 14rpx 40rpx 8rpx;
  color: var(--color-wheat);
  font-size: 21rpx;
  font-weight: 700;
}

.title-block {
  padding-top: 8rpx;
  padding-bottom: 22rpx;
}

.subtitle {
  display: block;
  margin-top: 10rpx;
  color: var(--color-ink-muted);
  font-size: 24rpx;
}

.map-scene {
  position: relative;
  height: 520rpx;
  overflow: hidden;
  background: var(--color-wheat-soft);
}

.map-image {
  width: 100%;
  height: 100%;
}

.clue-counter {
  position: absolute;
  top: 18rpx;
  right: 32rpx;
  padding: 10rpx 18rpx;
  border-radius: 28rpx;
  background: var(--color-surface);
  color: var(--color-ink-muted);
  font-size: 21rpx;
}

.clue-counter text {
  color: var(--color-primary);
  font-weight: 800;
}

.map-tag {
  position: absolute;
  padding: 10rpx 16rpx;
  border: 1rpx solid var(--color-border-soft);
  border-radius: 24rpx;
  background: var(--color-surface);
  color: var(--color-ink);
  font-size: 21rpx;
  font-weight: 700;
}

.train-tag { top: 202rpx; left: 48rpx; }
.math-tag { top: 285rpx; right: 30rpx; }
.history-tag { bottom: 20rpx; left: 58rpx; }

.case-prompt {
  display: flex;
  align-items: center;
  padding-top: 20rpx;
  padding-bottom: 12rpx;
}

.case-stamp {
  display: grid;
  width: 66rpx;
  height: 66rpx;
  margin-right: 18rpx;
  border: 3rpx solid var(--color-accent-line);
  border-radius: 18rpx;
  background: var(--color-wheat-soft);
  color: var(--color-accent);
  font-size: 34rpx;
  place-items: center;
  transform: rotate(-7deg);
}

.prompt-title,
.prompt-hint {
  display: block;
}

.prompt-title {
  font-size: 26rpx;
  font-weight: 700;
}

.prompt-hint {
  margin-top: 4rpx;
  color: var(--color-ink-muted);
  font-size: 21rpx;
}

.mission-list {
  padding-top: 0;
}

.mission {
  display: flex;
  align-items: center;
  min-height: 108rpx;
  margin-bottom: 14rpx;
  padding: 14rpx 20rpx;
}

.mission.english { background: var(--color-terracotta-soft); border-color: var(--color-border-soft); }
.mission.math { background: var(--color-wheat-soft); border-color: var(--color-wheat-line); }
.mission.history { background: var(--color-surface-muted); border-color: var(--color-line); }

.mission-icon {
  display: grid;
  width: 64rpx;
  height: 64rpx;
  margin-right: 18rpx;
  border: 2rpx solid var(--color-accent-line);
  border-radius: 18rpx;
  background: var(--color-terracotta-soft);
  color: var(--color-terracotta);
  font-size: 32rpx;
  font-weight: 800;
  place-items: center;
}

.math .mission-icon { background: var(--color-wheat-soft); border-color: var(--color-wheat-line); color: var(--color-wheat); }
.history .mission-icon { background: var(--color-primary-soft); border-color: var(--color-line); color: var(--color-primary-dark); font-size: 25rpx; }

.mission-copy {
  flex: 1;
}

.mission-title,
.mission-hint {
  display: block;
}

.mission-title {
  font-size: 26rpx;
  font-weight: 700;
}

.mission-hint {
  margin-top: 5rpx;
  color: var(--color-ink-muted);
  font-size: 21rpx;
}

.mission-arrow {
  color: var(--color-primary-dark);
  font-size: 42rpx;
}
</style>
