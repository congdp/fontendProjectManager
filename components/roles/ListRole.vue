<template>
  <div>
    <CCard>
      <CCardHeader>
        <h3>List Role</h3>
      </CCardHeader>
      <CCardBody>
        <CButton color="primary" class="m-2 btn_add">
          <nuxt-link to="/roles/Create" class="text-white d-block">
            + Add</nuxt-link
          >
        </CButton>
        <CDataTable
          :items="listRoles"
          :fields="fields"
          items-per-page-select
          :items-per-page="5"
          hover
          pagination
        >
          <template #method="{ item }">
            <td class="py-2">
              <CButton color="success">
                <nuxt-link :to="`/roles/${item.id}`">
                  <CIcon :content="$options.freeSet.cilPencil" />
                </nuxt-link>
              </CButton>
              <CButton color="danger" @click="deleteRole(item.id)">
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
import axios from "axios";
import { freeSet } from "@coreui/icons";
import swal from "sweetalert2";
const fields = [
  { key: "id", label: "ID", _style: "min-width:50px" },
  { key: "name", label: "RoleName", _style: "min-width:150px" },
  { key: "created_at", _style: "min-width:50px;" },
  { key: "updated_at", _style: "min-width:50px;" },
  { key: "method", label: "Method", _style: "min-width:100px;" },
];
export default {
  name: "ListRole",
  freeSet,
  props: {
    listRoles: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      fields: fields,
      keySearch: "",
    };
  },
  methods: {
    deleteRole(id) {
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
              .delete("http://127.0.0.1:8000/api/roles/" + id, {
                headers: {
                  Authorization: `${$nuxt.$auth.getToken("local")}`,
                },
              })
              .then((res) => {});
            swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
    },
    searchRole(value) {
      this.keySearch = value;
      console.log(this.keySearch);
      axios
        .get("http://localhost:8000/api/roles/search?name=" + this.keySearch)
        .then((res) => {
          this.dataUser = res.data;
        });
    },
  },
};
</script>

<style>
</style>