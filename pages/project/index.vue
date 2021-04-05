 <template lang="">
  <div>
    <search  @sendKeyword="getKeyword"/>
    <ListProject :dataProjects="dataProjects"  @getListProjects="getData"/>
  </div>
</template>
<script>
import axios from "axios";
import Search from "@/components/common/Search";
import ListProject from "~/components/project/ListProject";
export default {
  components: {
    ListProject,
    Search,
  },
  data() {
    return {
      dataProjects: [],
      search: "",
    };
  },
  methods: {
    /**
     * get list blog
     */
    getData() {
      axios
        .get("http://127.0.0.1:8000/api/projects", {
          headers: {
            Authorization: `${$nuxt.$auth.getToken("local")}`,
          },
        })
        .then((res) => {
          this.dataProjects = res.data;
          // this.page = res.data
        });
    },
    getKeyword(value) {
      this.search = value;
      axios
        .get("http://localhost:8000/api/project?name=" + this.search, {
          headers: {
            Authorization: `${$nuxt.$auth.getToken("local")}`,
          },
        })
        .then((res) => {
          this.dataProjects = res.data;
          console.log(res.data);
          // this.page = res.data;
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style lang="">
</style>
