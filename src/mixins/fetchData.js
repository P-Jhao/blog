//公共的远程获取代码
//具体的组件中提供一个远程数据获取的方法 fetchData
export default function (defaultData = null) {
  return {
    data() {
      return {
        data: defaultData,
        isLoading: true, //是否正在加载数据
      };
    },
    async created() {
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  };
}
