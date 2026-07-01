import { computed, unref } from 'vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { chatApi } from '@/Api/chatApi'
export function useChatMessages(roomId) {
  const queryClient = useQueryClient()
  const queryKey = computed(() => ['chat', 'messages', unref(roomId)])

  const query = useQuery({
    queryKey,
    queryFn: () => chatApi.getMessages(unref(roomId)),
    enabled: computed(() => !!unref(roomId)),
  })

  function upsertMessage(message) {
    queryClient.setQueryData(queryKey.value, (old = []) =>
      old.some((m) => m.id === message.id) ? old : [...old, message],
    )
  }

  const sendMessage = useMutation({
    mutationFn: (body) => chatApi.sendMessage(unref(roomId), body),
    onSuccess: upsertMessage,
  })

  return { ...query, sendMessage, appendMessage: upsertMessage }
}
