import { onScopeDispose, unref, watch } from "vue";
import { getEcho } from "@/Api/echo";

export function useChatChannel(roomId, callbacks = {}) {
  let activeChannelName = null;

  function leaveChannel() {
    if (!activeChannelName) return;

    getEcho().leave(activeChannelName);
    activeChannelName = null;
  }

  watch(
    () => unref(roomId),
    (currentRoomId) => {
      leaveChannel();

      if (!currentRoomId) return;

      activeChannelName = `chat.${currentRoomId}`;

      getEcho()
        .join(activeChannelName)
        .here((users) => callbacks.onHere?.(users))
        .leaving((user) => callbacks.onLeaving?.(user))
        .listen(".message.sent", (event) => {
          callbacks.onMessage?.(event.message ?? event);
        });
    },
    { immediate: true },
  );

  onScopeDispose(() => {
    leaveChannel();
  });
}
