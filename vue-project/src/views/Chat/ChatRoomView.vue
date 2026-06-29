<script setup>
defineProps({
    room: { type: String, required: true }
});
</script>

<template>
    <div>
        Chat Room {{ room }}
    </div>
</template>
