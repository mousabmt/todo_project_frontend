<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
import { useInstructorCourses } from '@/composables/useInstructorCourses';
const { data, isError, error } = useInstructorCourses(props.id);
console.log(data);
if(isError){
  console.log(error?.message);

}
</script>
<template>
  <div>
    Test
  </div>
</template>
