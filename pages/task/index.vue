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
       search:""
    };

  },
  methods: {
    /**
     * get list task
     */
    getData() {
      axios.get("http://127.0.0.1:8000/api/task").then((res) => {
        this.dataTasks = res.data;
        console.log(this.dataTasks);
        // this.page = res.data
      });
    },
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
