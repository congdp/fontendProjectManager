<template>
  <div>
    <CCard>
      <CCardHeader>
        <h3>List User</h3>
      </CCardHeader>
      <CCardBody>
        <CButton color="primary" class="m-2 btn_add" v-if="$nuxt.$auth.user.role_id == 1">
          <nuxt-link to="/user/add" class="text-white d-block">
            + Add</nuxt-link
          >
        </CButton>
        <CDataTable
          :items="dataUser"
          :fields="fields"
          hover
          items-per-page-select
          pagination
        >
          <template #role_id="{ item }">
            <td>
              {{ getRoleName(item.role_id) }}
            </td>
          </template>
          <template #show_details="{ item }" >
            <td>
              <CButton color="success">
                <nuxt-link :to="`/user/${item.id}`">
                  <CIcon :content="$options.freeSet.cilPencil" />
                </nuxt-link>
              </CButton>
              <CButton color="danger" @click="deleteTask(item.id)">
                <CIcon :content="$options.freeSet.cilTrash" />
              </CButton>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import { freeSet } from "@coreui/icons";
const user_task = [
  { key: "id", label: "Id" },
  { key: "subject", label: "Name" },
  { key: "id_project", label: "Project" },
  { key: "content", label: "Content" },
  { key: "member_id", label: "Assignee" },
  { key: "status", label: "Status" },
  { key: "start_date", label: "Start Date" },
  { key: "due_date", label: "Due Date" },
];
import axios from "axios";
export default {
  freeSet,
  name: "ListUser",
  props: {
    dataUser: {
      type: Array,
      default: () => [],
    },
    fields: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // dataUser: this.dataUser.map((item, id) => {
      //   return { item, id };
      // }),
      dataRole: [],
      listTasks: [],
      details: [],
      collapseDuration: 0,
      user_task: user_task,
    };
  },
  methods: {
    /**
     * get role in api
     */
    getRole() {
      axios
        .get("http://localhost:8000/api/roles", {
          headers: {
            Authorization: `${$nuxt.$auth.getToken("local")}`,
          },
        })
        .then((res) => {
          this.dataRole = res.data;
          console.log(this.dataRole);
        });
    },

    /**
     * get name of role
     * @param Interger role_id of data user
     * @return String role name
     */
    getRoleName(id) {
      return this.dataRole
        .filter((role) => {
          return role.id == id;
        })
        .map((role) => {
          return role.name;
        })
        .join(",");
    },

    deleteTask($id) {
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete("http://127.0.0.1:8000/api/user/" + id, {
                headers: {
                  Authorization: `${$nuxt.$auth.getToken("local")}`,
                },
              })
              .then((res) => {
                this.$emit("getListTasks", this.dataTasks);
              });
            swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
    },
  },
  mounted() {
    this.getRole();
  },
};
</script>
<style scoped>
</style>

