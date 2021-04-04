 <template lang="">
  <div>
     <search  @sendKeyword="getKeyword"/>
    <ListTask :dataTasks="dataTasks"  @getListTasks="getData"/>
  </div>
</template>
<script>
import axios from "axios";
import Search from "@/components/common/Search"
import ListTask from "~/components/task/ListTask";
export default {
  components: {
    ListTask,
    Search
  },
  data() {
    return {
      dataTasks: [],
       search:"",
         condition: {},
    };

  },
  methods: {
    /**
     * get list task
     */
    getData() {
      // const url = this.search ? "http://127.0.0.1:8000/api/tasks?subject="+this.search : "http://127.0.0.1:8000/api/task";
      axios.get("http://127.0.0.1:8000/api/task?").then((res) => {
        console.log(res.data.task);
        this.dataTasks = res.data;
        console.log(this.dataTasks[0].id);
      });
    },

    //  getDataById() {
    //   // const url = this.search ? "http://127.0.0.1:8000/api/tasks?subject="+this.search : "http://127.0.0.1:8000/api/task";
    //   axios.get("http://127.0.0.1:8000/api/task?parent_id=" + this.id).then((res) => {
    //     console.log(res.data.task);
    //     this.dataTasks = res.data;
    //     console.log(this.dataTasks);
    //   });
    // },
     getKeyword(value){
      this.search = value;
      axios.get("http://localhost:8000/api/tasks?subject="+this.search).then(res => {
        this.dataTasks = res.data;
        console.log(this.dataTasks)
  
      });
    }
  },
  mounted() {
    this.getData();
  },
};
</script>
<style lang="">
</style>
