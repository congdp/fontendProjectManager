<template>
  <div>
    <CCard>
      <CCardHeader>
        <h3>List User</h3>
      </CCardHeader>
      <CCardBody>
        <CButton color="primary" class="m-2 btn_add">
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
        <!-- <template #role_id="{item}">
            <td>
              {{getRoleName(item.role_id)}}
            </td>
        </template> -->
        </CDataTable>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import axios from "axios";
export default {
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
      dataRole: [],
      data: {}
    };
  },
  methods: {
    /**
     * get role in api
     */
    // getRole(){
    //   axios.get('http://localhost:8000/api/roles').then(res=>{
    //     console.log('123');
    //     this.dataRole = res.data
    //     // console.log(this.dataRole);
    //   });
    // },

    /**
     * get name of role 
     * @param Interger role_id of data user
     * @return String role name
     */
    // getRoleName(id){
    //  return this.dataRole.filter(role =>{return role.id==id}).map(role => {return role.name}).join(',');
    // }
  },
  mounted(){
    // this.getRole();
  }
};
</script>
<style scoped>
</style>

