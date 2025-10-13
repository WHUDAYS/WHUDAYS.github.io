<template>
  <div class="ChatMessage" :style="messageStyle">
    <img :src="avatar" alt="Avatar" :style="avatarStyle">
    <div :style="contentStyle">
      <div :style="nicknameStyle">{{ nickname }}</div>
      <div class="message-bubble" :style="bubbleStyle" v-html="message"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const props = defineProps({
  avatar: String,
  nickname: String,
  message: String,
  position: {
    type: String,
    default: 'left'
  }
})

const { isDark } = useData()

const flexDirection = computed(() => props.position === 'right' ? 'row-reverse' : 'row')
const avatarMargin = computed(() => props.position === 'right' ? 'margin-left: 10px' : 'margin-right: 10px')
const messageAlign = computed(() => props.position === 'right' ? 'margin-left: auto; max-width: 70%' : 'margin-right: auto; max-width: 70%')
const nicknameAlign = computed(() => props.position === 'right' ? 'text-align: right' : '')

const bubbleBg = computed(() => isDark.value ? '#333' : '#f0f0f0')
const textColor = computed(() => isDark.value ? '#fff' : '#000')

const messageStyle = computed(() => ({
  display: 'flex',
  alignItems: 'center',
  margin: '10px 0',
  flexDirection: flexDirection.value
}))

const avatarStyle = computed(() => ({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  margin: avatarMargin.value
}))

const contentStyle = computed(() => {
  const styles = messageAlign.value.split(';').filter(s => s.trim())
  const obj = {}
  styles.forEach(style => {
    const [key, value] = style.split(':')
    if (key && value) obj[key.trim()] = value.trim()
  })
  return obj
})

const nicknameStyle = computed(() => ({
  fontWeight: 'bold',
  marginBottom: '5px',
  textAlign: nicknameAlign.value || 'left'
}))

const bubbleStyle = computed(() => ({
  backgroundColor: bubbleBg.value,
  color: textColor.value,
  padding: '8px 12px',
  borderRadius: '10px'
}))
</script>