<template>
  <a
    class="member-card-link"
    :href="link ? link : 'javascript:void(0)'"
    :aria-disabled="!link"
    :tabindex="link ? 0 : -1"
  >
    <div class="member-card">
      <div class="member-card-top">
        <img class="member-avatar" :src="avatar" :alt="name">
        <div class="member-info">
          <div class="member-name">{{ name }}</div>
          <Badge v-for="badge in badges" :key="badge.text" :type="badge.type" :text="badge.text" />
          <div class="member-description">{{ description }}</div>
        </div>
      </div>
      <div class="member-sns">
        <a v-for="social in socials" :key="social.platform" :href="social.url">
          <img :src="social.icon" class="member-sns-logo" :alt="social.platform">
        </a>
      </div>
    </div>
  </a>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  badges: {
    type: Array,
    default: () => []
  },
  socials: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.member-card {
  background: #eff2f3;
  border-radius: 12px;
  box-shadow: 0 2px 12px #39c5bb33;
  padding: 20px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 120px;
  transform: scale(1);
}

.dark .member-card {
  background: #1c1d1d;
  box-shadow: 0 2px 12px #39c5bb55;
}

.member-card:hover {
  box-shadow: 0 8px 32px #E6188055;
  transform: scale(1.05);
}

.member-card-link {
  text-decoration: none !important;
  color: inherit !important;
  display: block;
}

.member-card-top {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 15px;
}

.member-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 8px #39c5bb88;
  flex-shrink: 0;
}

.member-info {
  flex: 1;
  text-align: left;
}

.member-info .member-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  line-height: 1.2;
}

.member-info .member-description {
  font-size: 14px;
  color: #666;
  margin-top: 8px;
}

.member-sns {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: auto;
}

.member-sns-logo {
  width: 32px;
  height: 32px;
  transition: transform 0.2s;
}

.member-sns-logo:hover {
  transform: scale(1.1);
}
</style>