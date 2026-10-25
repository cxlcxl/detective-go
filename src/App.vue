<script setup>
const themeVars = {
  colorTheme: '#397553',
}
</script>

<script>
export default {
  onLaunch() {},
}
</script>

<template>
  <wd-config-provider :theme-vars="themeVars">
    <slot />
  </wd-config-provider>
</template>

<style>
@import "./styles/theme.css";

page {
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  font-size: 28rpx;
  line-height: 1.5;
}

view,
text,
button,
image,
navigator {
  box-sizing: border-box;
}

button::after {
  border: 0;
}
</style>
