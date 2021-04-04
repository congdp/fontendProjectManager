<template>
  <div>
    <CCard>
      <CCardHeader>
        <h3>List Task</h3>
      </CCardHeader>
      <CCardBody>
        <CButton color="primary" class="m-2 btn_add">
          <nuxt-link to="/task/add" class="text-white d-block w-100">
            + Add</nuxt-link
          >
        </CButton>
        <CDataTable
          :items="dataTasks"
          :fields="fields"
          items-per-page-select
          :items-per-page="5"
          pagination
        >
          <template #member_id="{ item }">
            <td>
              {{ item.member.name }}
            </td>
          </template>
          <template #id_project="{ item }">
            <td>
              {{ item.project.name }}
            </td>
          </template>
          <template #status="{ item }">
            <td>
              {{ filter(item.status, STATUS) }}
            </td>
          </template>
          <template #priority="{ item }">
            <td>
              {{ filter(item.priority, PRIORITY) }}
            </td>
          </template>
          <template #method="{ item }">
            <td class="py-2">
              <CButton color="success">
                <nuxt-link :to="`/task/${item.id}`">
                  <CIcon :content="$options.freeSet.cilPencil" />
                </nuxt-link>
              </CButton>
              <CButton color="danger" @click="deleteTask(item.id)">
                <CIcon :content="$options.freeSet.cilTrash" />
              </CButton>
           
            </td>
          </template>
          <!-- ============================================================================================================== -->
          <template #show_details="{ item, index }">
            <td class="py-2">
              <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
                @click="toggleDetails(item, index)"
              >
                {{ Boolean(item._toggled) ? "Hide" : "Show" }}
              </CButton>
            </td>
          </template>

          <template #details="{ item }">
            <CCollapse
              :show="Boolean(item._toggled)"
              :duration="collapseDuration"
            >
              <!-- <CCardBody> -->
                   <CButton color="primary" class="mb-2">
                <nuxt-link to="/task/add" class="text-white d-block w-100 ">
                  Add</nuxt-link
                >
              </CButton>
              <CDataTable
                :items="details"
                :fields="fields1"
                :items-per-page="5"
                pagination
                :header="false"
                dark
              >
                <template #member_id="{ item }">
                  <td>
                    {{ item.member.name }}
                  </td>
                </template>
                <template #id_project="{ item }">
                  <td>
                    {{ item.project.name }}
                  </td>
                </template>
                <template #status="{ item }">
                  <td>
                    {{ filter(item.status, STATUS) }}
                  </td>
                </template>
                <template #priority="{ item }">
                  <td>
                    {{ filter(item.priority, PRIORITY) }}
                  </td>
                </template>
                <template #method="{ item }">
                  <td class="py-2">
                    <CButton color="success">
                      <nuxt-link :to="`/task/${item.id}`">
                        <CIcon :content="$options.freeSet.cilPencil" />
                      </nuxt-link>
                    </CButton>
                    <CButton color="danger" @click="deleteTask(item.id)">
                      <CIcon :content="$options.freeSet.cilTrash" />
                    </CButton>
                  </td>
                </template>
                <!-- <CMedia :aside-image-props="{ height: 102 }">
                  <h4>
                  </h4>
                  <p class="text-muted">User since: {</p>
                  <CButton size="sm" color="info" class="">
                    User Settings
                  </CButton>
                  <CButton size="sm" color="danger" class="ml-1">
                    Delete
                  </CButton>
                </CMedia> -->
              </CDataTable>
              <!-- </CCardBody> -->
            </CCollapse>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import axios from "axios";
import { freeSet } from "@coreui/icons";
import { DATA_STATUS } from "@/constant/constant";
import { DATA_PRIORITY } from "@/constant/constant";

import swal from "sweetalert2";
const fields1 = [
  "id",
  "subject",
  "id_project",
  "content",
  "member_id",
  "priority",
  "status",
  "start_date",
  "due_date",
  "method",
];
const fields = [
  { key: "id", label: "Id" },
  { key: "subject", label: "Name" },
  { key: "id_project", label: "Project" },
  { key: "content", label: "Content" },
  { key: "member_id", label: "Assignee" },
  { key: "priority", label: "Priority" },
  { key: "status", label: "Status" },
  { key: "start_date", label: "Start Date" },
  { key: "due_date", label: "Due Date" },
  { key: "method", label: "Method" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];

export default {
  name: "ListTask",
  freeSet,
  props: {
    dataTasks: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      fields: fields,
      fields1: fields1,

      STATUS: DATA_STATUS,
      PRIORITY: DATA_PRIORITY,

      details: [],
      collapseDuration: 0,
      dataTasks: this.dataTasks.map((item, id) => {
        return { item, id };
      }),
    };
  },
  methods: {
    toggleDetails(item, index) {
      console.log(item.id);
      // i = index;
      // for( i=0; i < 10 ; i++){
      //   this.$set(this.dataTasks[i], "_toggled", item._toggled);
      // }
      // this.$set(this.dataTasks[0], "_toggled", item._toggled);
      this.$set(this.dataTasks[index], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
      this.collapseDuration = 0;
      this.getDataById(item.id);
      });
    },
    /**
     * delete task
     */
    deleteTask(id) {
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
            axios.delete("http://localhost:8000/api/task/" + id).then((res) => {
              this.$emit("getListTasks", this.dataTasks);
            });
            swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
    },

    /**
     * get name status , priority
     */
    filter(id, array) {
      return array.find((value, index) => {
        if (index === id) {
          return value;
        }
      });
    },

    getDataById(id) {
      // const url = this.search ? "http://127.0.0.1:8000/api/tasks?subject="+this.search : "http://127.0.0.1:8000/api/task";
      axios
        .get("http://127.0.0.1:8000/api/task?parent_id=" + id)
        .then((res) => {
          console.log(res.data.task);
          this.details = res.data;
          console.log(this.details);
        });
    },
  },
};
</script>
<style>
.btn_add {
  width: 100px;
  position: absolute;
  top: 20px;
}
.card-body {
  position: relative;
}
</style>
