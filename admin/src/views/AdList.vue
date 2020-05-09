<!--
 * @Description: 广告位列表
 * @Author: zmt
 * @LastEditTime: 2020-05-09 12:08:26
 -->

<template>
  <div class="about">
    <h1>广告位列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="广告位名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="$router.push(`/ads/edit/${scope.row._id}`)">编辑</el-button>
        <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/ads')
      this.items = res.data
    },

    remove (row) {
      this.$confirm(`是否删除广告位 "${row.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`rest/ads/${row._id}`)
        console.log('删除', res);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.fetch()
      })
    }
  },
}
</script>