<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useChatRoom } from '@/composables/useClassRoom'
import { useChatMessages } from '@/composables/useChatMessages'
import { useChatChannel } from '@/composables/useChatChannel'
import { authStore } from '@/stores/authStore'
import chatMembers from '@/componenets/chat/chatMembers.vue'
import messagesList from '@/componenets/chat/messagesList.vue'
import messageInput from '@/componenets/chat/messageInput.vue'
const route = useRoute()
const roomId = computed(() => route.params.room)
const auth = authStore()

const { data: room, isLoading: roomLoading } = useChatRoom(roomId)
const { data: messages, isLoading: messagesLoading, sendMessage, appendMessage } = useChatMessages(roomId)

const onlineCount = ref(0)
const livePresence = ref([])

useChatChannel(roomId, {
  onHere: (users) => {
    livePresence.value = users
    onlineCount.value = users.length
  },

  onLeaving: (user) => {
    livePresence.value = livePresence.value.filter((p) => p.id !== user.id)
    onlineCount.value = livePresence.value.length
  },
  onMessage: appendMessage,
})

const participants = computed(() => room.value?.users ?? [])

function handleSend(body) {
  sendMessage.mutate(body)
}
</script>

<template>
  <div v-if="roomLoading" class="text-muted">Loading room…</div>

  <div v-else class="row g-4">
    <div class="col-lg-4">
      <chatMembers :participants="participants" :online-count="onlineCount" />
    </div>

    <div class="col-lg-8">
      <div class="card shadow-sm">
        <div class="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Messages</h5>
          <small class="text-muted">{{ onlineCount }} online</small>
        </div>

        <messagesList :messages="messages" :current-user-id="auth.user.id" :loading="messagesLoading" />

        <div class="card-footer bg-white">
          <messageInput :sending="sendMessage.isPending.value" @send="handleSend" />
        </div>
      </div>
    </div>
  </div>
</template>
