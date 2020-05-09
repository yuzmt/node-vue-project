<!--
 * @Description: 新建文章
 * @Author: zmt
 * @LastEditTime: 2020-05-09 11:11:59
 -->
<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新建' }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple placeholder="请选择">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor 
          v-model="model.body"
          id="editor" 
          useCustomImageHandler 
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor"

export default {
  props: {
    id: {},
  },
  components: {
    VueEditor,
  },
  data () {
    return {
      model: {},
      categories: [],
    }
  },
  created() {
    this.fetchCategories()
    this.id && this.fetch()
  },
  methods: {
    // 富文本中图片上传
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader()
    },

    async save () {
      let res
      if(this.id) { // 编辑分类
        res = await this.$http.put(`rest/articles/${this.id}`, this.model)
        console.log('put', res);
      } else { // 新建分类
        res = await this.$http.post('rest/articles', this.model)
        console.log('post', res);
      }
      this.$router.push('/articles/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },

    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`)
      console.log('ressss', res);
      this.model = res.data
    },

    // 获取 select 列表中的数据
    async fetchCategories() {
      const res = await this.$http.get('rest/categories')
      this.categories = res.data
    }
  },
}
</script>