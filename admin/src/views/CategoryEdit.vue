<!--
 * @Description: 新建分类
 * @Author: zmt
 * @LastEditTime: 2020-05-13 10:30:35
 -->
<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新建' }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
    <el-form-item label="上级分类">
      <el-select v-model="model.parent" placeholder="请选择">
      <el-option
        v-for="item in parents"
        :key="item._id"
        :label="item.name"
        :value="item._id">
      </el-option>
    </el-select>
    </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data () {
    return {
      model: {},
      parents: [],
    }
  },
  created() {
    this.fetchParents()
    this.id && this.fetch()
  },
  methods: {
    async save () {
      let res
      if(this.id) { // 编辑分类
        res = await this.$http.put(`rest/categories/${this.id}`, this.model)
        console.log('put', res);
      } else { // 新建分类
        res = await this.$http.post('rest/categories', this.model)
        console.log('post', res);
      }
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },

    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`)
      console.log('ressss', res);
      this.model = res.data
    },

    // 获取 select 列表中的数据
    async fetchParents() {
      const res = await this.$http.get('rest/categories')
      this.parents = res.data
    }
  },
}
</script>