<template lang="">
  <div>
      <div>
    <CCard>
      <CCardHeader >
        <h3>{{title}}</h3>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol sm="6">
           <!-- <p  v-for="(item, index) in data" :key="index">{{item.project.name}}</p> -->
            <label for="source">Project</label>
               <select id="id_project" v-model="form.id_project" class="form-control">

              <option
                v-for="(item, index) in dataTasks"
                :key="index"
                :value="item.id"
              >
                {{item.name }}
              </option>
            </select>
           <!-- <CSelect
              label="Project"
              :options="this.data.project"
              :value.sync="form.member_id"
            /> -->
          </CCol>
          <CCol sm="6">
            <CInput label="Name" placeholder="Name" v-model="form.subject">
            </CInput>
          </CCol>
        </CRow>

         <CRow>
          <CCol sm="12">
            <CInput label="Content" placeholder="Content" v-model="form.content">
            </CInput>
          </CCol>
        </CRow>

        <CRow class= "mb-2">
          <CCol sm="4">
            <label for="source">Assignee</label>
               <select id="id_project" v-model="form.member_id" class="form-control">

              <option
                v-for="(item, index) in dataUsers"
                :key="index"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </CCol>
          <CCol sm="4">
            <label for="source">Status</label>
               <select id="id_project" v-model="form.status" class="form-control">

              <option
                v-for="(item, index) in STATUS"
                :key="index"
                :value="index"
              >
                {{ item }}
              </option>
            </select>

          </CCol>
           <CCol sm="4">
             <label for="source">Priority</label>
               <select id="id_project" v-model="form.priority" class="form-control">

              <option
                v-for="(item, index) in PRIORITY"
                :key="index"
                :value="index"
              >
                {{ item }}
              </option>
            </select>
          </CCol>

        </CRow>
        <CRow>
          <CCol sm="3">
            <CInput
              label="Start Date"
              type="date"
              v-model="form.start_date"
            >
            </CInput>
          </CCol>
           <CCol sm="3">
            <CInput
              label="Due Date"
              type="date"
              v-model="form.due_date"
            >
            </CInput>
          </CCol>
           <CCol sm="3">
            <CInput
              label="Spent Time"
              type="text"
              placeholder="Hours"
              v-model="form.spent_time"
            >
            </CInput>
          </CCol>
           <CCol sm="3">
            <CInput
              label="Estimated Time"
              type="text"
              placeholder="Hours"
              v-model="form.estimated_time"
            >
            </CInput>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <CTextarea label="Note" rows="5" v-model="form.note">
            </CTextarea>
          </CCol>
        </CRow>
         <CRow>
          <ul v-if="errors.length > 0" class="alert alert-danger">
          <li v-for="error in errors" :key="error">{{ error }}</li>
         </ul>
        </CRow>
      </CCardBody>
      <CCardFooter>
        <CButton
        v-if="!this.$route.params.id"
         color="primary"  @click="createTask()"
        >
          Submit
        </CButton>
        <CButton v-else color="primary" class="btn-click" @click="updateTask(form.id)" >
          Update
        </CButton>

      </CCardFooter>
    </CCard>
  </div>
  </div>
</template>
<script>
import { DATA_PRIORITY } from "~/constant/constant";
import { DATA_STATUS } from "~/constant/constant";
import axios from "axios";
import swal from "sweetalert2";
export default {
  name: "CreateEditTask",
  data() {
    return {
      form: {
        id: "",
        subject: "",
        status: "",
        content: "",
        priority: "",
        spent_time: "",
        estimated_time: "",
        start_date: "",
        due_date: "",
        member_id: "",
        id_project: "",
        note: "",
      },
      errors: [],
      STATUS: DATA_STATUS,
      PRIORITY: DATA_PRIORITY,
      dataTasks: [],
      dataUsers: [],
    };
  },
  mounted() {
    if (this.$route.params.id != null) {
      this.getTaskByID(this.$route.params.id);
    }
    this.getData(), this.getDataUser();
  },
  props: {
    title: "",
  },
  methods: {
    /**
     * create task
     */
    createTask() {
        this.validate();
        if (this.errors.length > 0) {
          return this.errors;
        } else {
          axios
            .post("http://localhost:8000/api/task", this.form, {
              headers: {
                Authorization: `${$nuxt.$auth.getToken("local")}`,
              },
            }).catch((err)=>{
              console.log(err)
            })
            .then((res) => {
              console.log("OK");
              this.$router.push("/task");
              swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully Added",
                showConfirmButton: false,
                timer: 1500,
              });
            });
        }
    },
    /**
     * get blog by id
     */
    getTaskByID(id) {
      axios
        .get("http://localhost:8000/api/task/" + id, {
          headers: {
            Authorization: `${$nuxt.$auth.getToken("local")}`,
          },
        })
        .then((res) => (this.form = res.data));
    },

    /**
     * update blog
     */
    updateTask(id) {
      this.validate();
      if (this.errors.length > 0) {
        return this.errors;
      } else {
        axios
          .put("http://localhost:8000/api/task/" + id, this.form, {
            headers: {
              Authorization: `${$nuxt.$auth.getToken("local")}`,
            },
          })
          .then((res) => {
            this.$router.push("/task");
            swal.fire({
              position: "center",
              icon: "success",
              title: "Successfully Update",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    },
    /**
     * check validate
     */
    validate() {
      this.errors = [];
      if (this.form.subject == "") {
        this.errors.push("Name không được trống");
      }
      if (this.form.content == "") {
        this.errors.push("Content không được trống");
      }
      if (this.form.start_date == "") {
        this.errors.push("Start Date không được trống");
      }
    },

    getData() {
      axios
        .get("http://127.0.0.1:8000/api/projects", {
          headers: {
            Authorization: `${$nuxt.$auth.getToken("local")}`,
          },
        })
        .then((res) => {
          this.dataTasks = res.data;
        });
    },
    getDataUser() {
      axios
        .get("http://127.0.0.1:8000/api/all-user", {
          headers: {
            Authorization: `${$nuxt.$auth.getToken("local")}`,
          },
        })
        .then((res) => {
          this.dataUsers = res.data;
        });
    },
  },
};
</script>
<style lang="">
</style>
