import { computed, unref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { chatApi } from '@/Api/chatApi'
export function useChatRoom(roomId) {
  return useQuery({
    queryKey: computed(() => ['chat', 'room', unref(roomId)]),
    queryFn: () => chatApi.getRoom(unref(roomId)),
    enabled: computed(() => !!unref(roomId)),
  })
}
