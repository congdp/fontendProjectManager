<template lang="">
  <div>
    <CCard>
      <CCardHeader >
        <h3>{{title}}</h3>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol sm="12">
            <CInput
              label="Name"
              placeholder="Enter project name"
              v-model="form.name"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <CInput label="Description" placeholder="Description"  v-model="form.desc">
            </CInput>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <CInput
              label="Start Date"
              type="date"
              v-model="form.start_date"
            >
            </CInput>
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
         color="primary"  @click="createProject()"
        >
          Submit
        </CButton>
        <CButton v-else color="primary" class="btn-click" @click="updateProject(form.id)" >
          Update
        </CButton>

      </CCardFooter>
    </CCard>
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert2";
export default {
  name: "CreateEditProject",
  data() {
    return {
      form: {
        id: "",
        name: "",
        desc: "",
        start_date: "",
      },
      errors: [],
    };
  },
  props: {
    title: "",
  },
  mounted() {
    if (this.$route.params.id != null) {
      this.getProjectByID(this.$route.params.id);
    }
  },
  methods: {
    /**
     * create blog
     */
    createProject() {
      this.validate();
      if (this.errors.length > 0) {
        return this.errors;
      } else {
        axios
          .post("http://localhost:8000/api/projects", this.form, {
            headers: {
              Authorization: `${$nuxt.$auth.getToken("local")}`,
            },
          })
          .then((res) => {
            this.$router.push("/project");
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
    getProjectByID(id) {
      axios
        .get("http://localhost:8000/api/projects/" + id, {
          headers: {
            Authorization: `${$nuxt.$auth.getToken("local")}`,
          },
        })
        .then((res) => (this.form = res.data));
    },
    /**
     * update blog
     */
    updateProject(id) {
      this.validate();
      if (this.errors.length > 0) {
        return this.errors;
      } else {
        axios
          .put("http://localhost:8000/api/projects/" + id, this.form,{
            headers: {
              Authorization: `${$nuxt.$auth.getToken('local')}`,
            },
          })
          .then((res) => {
            this.$router.push("/project");
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
      if (this.form.name == "") {
        this.errors.push("Name không được trống");
      }
      if (this.form.desc == "") {
        this.errors.push("Description không được trống");
      }
      if (this.form.start_date == "") {
        this.errors.push("Start Date không được trống");
      }
    },
  },
};
</script>
<style lang="">
</style>
