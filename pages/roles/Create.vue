<template>
  <div>
    <create-edit-role :title="title"/>
  </div>
</template>
<script>

import CreateEditRole from "@/components/roles/CreateEditRole.vue";
export default {
  name: 'new',
  components: {
    CreateEditRole
  },
  data() {
    return {
      title : "Add Role"
    }
  },

}
</script>
<style scoped>

</style>