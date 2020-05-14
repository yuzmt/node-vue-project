<!--
 * @Description: 新建英雄/编辑英雄
 * @Author: zmt
 * @LastEditTime: 2020-05-14 13:56:52
 -->
<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新建' }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card">
        <el-tab-pane label="基础信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="afterUpload">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select multiple v-model="model.categories" placeholder="请选择">
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate style="marginTop: 0.6rem" :max="9" v-model="model.scores.difficult" show-score></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="marginTop: 0.6rem" :max="9" v-model="model.scores.skills" show-score></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="marginTop: 0.6rem" :max="9" v-model="model.scores.attack" show-score></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="marginTop: 0.6rem" :max="9" v-model="model.scores.survive" show-score></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select multiple v-model="model.items1" placeholder="请选择">
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select multiple v-model="model.items2" placeholder="请选择">
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col v-for="(item, index) in model.skills" :key="index" :md="12">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :on-success="res => $set(item, 'icon', res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" native-type="submit" style="marginTop: 1rem">保存</el-button>
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
        scores: {},
        skills: [],
      },
      categories: [], // 英雄分类
      items: [], // 英雄装备
    }
  },
  created() {
    this.fetchItems()
    this.fetchCategories()
    this.id && this.fetch()
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model, 'avatar', res.url) // 显示赋值
    },
    async save () {
      let res
      if(this.id) { // 编辑英雄
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model)
        console.log('put', res);
      } else { // 新建英雄
        res = await this.$http.post('rest/heroes', this.model)
        console.log('post', res);
      }
      this.$router.push('/heroes/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },

    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`)
      this.model = Object.assign({}, this.model, res.data)
    },
    // 获取英雄类型
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },

    // 获取英雄出装
    async fetchItems() {
      const res = await this.$http.get(`rest/items`)
      this.items = res.data
    },

    // // 获取 select 列表中的数据
    // async fetchParents() {
    //   const res = await this.$http.get('rest/heroes')
    //   this.parents = res.data
    // }
  },
}
</script>