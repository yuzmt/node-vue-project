<!--
 * @Description: 新建广告位
 * @Author: zmt
 * @LastEditTime: 2020-05-14 13:56:36
 -->
<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新建' }}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告位</el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col v-for="(item, index) in model.items" :key="index" :md="24">
            <el-form-item label="跳转链接(URL)">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图标" style="marginTop: 22px">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)">
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="danger" @click="model.items.splice(index,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data () {
    return {
      model: {
        items: [],
      },
    }
  },
  created() {
    this.id && this.fetch()
  },
  methods: {
    async save () {
      let res
      if(this.id) { // 编辑广告位
        res = await this.$http.put(`rest/ads/${this.id}`, this.model)
        console.log('put', res);
      } else { // 新建广告位
        res = await this.$http.post('rest/ads', this.model)
        console.log('post', res);
      }
      this.$router.push('/ads/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },

    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`)
      console.log('ressss', res);
      this.model = res.data
    },
  },
}
</script>