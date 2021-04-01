<template>
  <div>
    <create-edit-role :title="title" />
  </div>
</template>
<script>
import axios from 'axios';
import CreateEditRole from "@/components/roles/CreateEditRole.vue";
export default {
  name: 'new',
  components: {
    CreateEditRole
  },
  data() {
    return {
      title : "Edit Role"
    }
  },

}
</script>
<style scoped>

</style>