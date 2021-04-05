<template>
  <div>
    <CCard>
      <CCardHeader>
        {{ title }}
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol sm="12">
            <CInput
              label="Name"
              v-model="dataRole.name"
              placeholder="Enter your name"
            />
            <div
              class="form-check"
              v-for="(permission, index) in listPermission"
              :key="index"
            >
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  v-model="permission.id"
                  :value="permission.id"
                />
                {{ permission.desc }}
              </label>
            </div>
          </CCol>
        </CRow>
      </CCardBody>
      <CCardFooter>
        <CButton
          v-if="!this.$route.params.id"
          color="primary"
          @click="addRole()"
        >
          Submit
        </CButton>
        <CButton
          v-else
          color="primary"
          class="btn-click"
          @click="editRole(dataRole.id)"
        >
          Update
        </CButton>
      </CCardFooter>
    </CCard>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "new",
  components: {},
  data() {
    return {
      dataRole: {
        id: "",
        name: "",
      },
      listPermission: [],
      listAddPermission: [],
      checkPermission: false,
    };
  },
  props: {
    title: "",
  },
  methods: {
    addRole() {
      axios
        .post(
          "http://127.0.0.1:8000/api/roles/",
          this.dataRole,
          this.listPermission,
          {
            headers: {
              Authorization: `${$nuxt.$auth.getToken("local")}`,
            },
          }
        )
        .then((res) => {
          this.$router.push("/roles");
          swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully Added",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    getRoleByID(id) {
      axios
        .get("http://127.0.0.1:8000/api/roles/" + id, {
          headers: {
            Authorization: `${$nuxt.$auth.getToken("local")}`,
          },
        })
        .then((res) => (this.dataRole = res.data));
    },
    editRole(id) {
      axios
        .put("http://127.0.0.1:8000/api/roles/" + id, this.dataRole, {
          headers: {
            Authorization: `${$nuxt.$auth.getToken("local")}`,
          },
        })
        .then((res) => {
          this.$router.push("/roles");
          swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully Added",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },

    getPermission() {
      axios
        .get("http://127.0.0.1:8000/api/permission", {
          headers: {
            Authorization: `${$nuxt.$auth.getToken("local")}`,
          },
        })
        .then((res) => {
          this.listPermission = res.data;
        });
    },
  },
  mounted() {
    this.getPermission();
    if (this.$route.params.id != null) {
      this.getRoleByID(this.$route.params.id);
    }
  },
};
</script>
<style scoped>
</style>