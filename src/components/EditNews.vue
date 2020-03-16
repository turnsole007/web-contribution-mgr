<template>
  <div class="app-container">
    <el-form ref="news" :model="news" label-width="120px">
      <el-form-item label="新闻标题">
        <el-input class="item" v-model="news.title" />
      </el-form-item>
      <el-form-item label="新闻来源">
        <el-input class="item" v-model="news.ref" />
        <el-button type="primary" class="submit-button" @click="handleNews">提交</el-button>
      </el-form-item>
      <el-form-item label="新闻导语">
        <textarea class="text-area" v-model="news.introduce" />
      </el-form-item>
      <el-form-item label="新闻内容"/>
    </el-form>

    <div class="editor-container">
      <markdown-editor v-model="content1" height="450px" />
    </div>

    <!-- <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="getHtml">
      Get HTML
    </el-button>
    <div v-html="html" /> -->

  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import axios from 'axios'
import { Message } from 'element-ui'

const content = `
**基于 tui-editor 实现的 markdown 编辑器**
### 开始编辑新闻内容
`
export default {
  name: 'EditNews',
  components: { MarkdownEditor },
  data () {
    return {
      content1: content,
      // html: '',
      languageTypeList: {
        'en': 'en_US',
        'zh': 'zh_CN',
        'es': 'es_ES'
      },
      news: {
        title: '',
        context: content,
        ref: '',
        introduce: ''
      }
    }
  },
  computed: {
    language () {
      return this.languageTypeList['zh']
    }
  },
  methods: {
    /* getHtml () {
      this.html = this.$refs.markdownEditor.getHtml()
      console.log(this.html)
    } */
    init () {
      this.content = `
        **基于 tui-editor 实现的 markdown 编辑器**
        ### 开始编辑新闻内容
        `
      this.news.title = ''
      this.news.ref = ''
      this.news.introduce = ''
    },
    handleNews () {
      if (this.news.title && this.news.context && this.news.ref && this.news.introduce) {
        axios.post('/mgr/api/news/', this.news)
          .then((response) => {
            window.console.log(response)
            if (response.data === 'insert news into db successfully.') {
              Message({
                message: '提交成功',
                type: 'success',
                duration: 5 * 1000
              })
              this.init()
            } else {
              Message({
                message: response.data,
                type: 'error',
                duration: 5 * 1000
              })
            }
          }).catch(error => console.log(error))
      } else {
        Message({
          message: '请完整输入新闻标题、来源、导语和内容',
          type: 'error',
          duration: 3 * 1000
        })
      }
    }
  }
}
</script>

<style scoped>
.editor-container{
  margin: 0px 20px;
}
.submit-button {
  margin-left: 10%;
}
.item {
  width: 60%;
}
.text-area {
  width: 80%;
  height: 80px;
}
</style>
