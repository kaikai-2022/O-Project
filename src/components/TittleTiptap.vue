<template>
  <div class="editor1" v-if="editor">
    <div class="editor1__container">
      <editor-content class="editor1__content1" :editor="editor" :doc="content"/>
      <!-- <el-input v-model="input" placeholder="请输入标题"></el-input> -->


      <div class="editor1__popover">
        <el-button type="primary" icon="el-icon-edit" @click="changelimit">修改权限</el-button>
        <el-button type="primary" @click="upload">提交标题<i class="el-icon-upload el-icon--right"></i></el-button>
        <el-button type="primary" icon="el-icon-edit" @click="download">下载文件</el-button>
        <el-popover
          placement="left"
          width="200"
          trigger="click"
          :content="popoverContent" style="float: right;">
          <el-button slot="reference" icon="el-icon-share">分享链接</el-button>
        </el-popover>
      </div>
    </div>
      
  </div>
 
  
  
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { HocuspocusProvider } from '@hocuspocus/provider'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import CharacterCount from '@tiptap/extension-character-count'
import { getToken, setToken } from '../utils/setToken.js'
import { getLimit } from '@/api/api';
//   import PlaceholderExtension from '@tiptap/extension-placeholder'


import * as Y from 'yjs'
import { IndexeddbPersistence } from 'y-indexeddb'
import { changeDocument } from '@/api/api';
import { getDcumentByID } from '@/api/api';

// import { variables } from '../../variables.js'


  const getRandomElement = list => {
    return list[Math.floor(Math.random() * list.length)]
  }

  // const getRandomRoom = () => {
  //   const roomNumbers = (variables.collabRooms || '').trim().split(',') || [10, 11, 12]
  
  //   return getRandomElement(roomNumbers.map(number => `rooms.${number}`))
  // }

export default {
  components: {
    EditorContent,
  //   EditorPlaceholder: Placeholder,
  },

  props:['documentid'],
// props: {
//   value: {
//     type: String,
//     default: '',
//   },
// },

  data() {
    return {
      input:'',
      currentUser: JSON.parse(localStorage.getItem('currentUser')) || {
        name: getToken('username'),
        color: this.getRandomColor(),
      },
      msg: {
              doc_name: '',
              doc_id: '',
              // editable_by_guests:'',
            },
      provider: null,
      editor: null,
      content: [],
      status: 'connecting',
      // room: getRandomRoom(),
      defaultDoc: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: '文档标题'
              }
            ]
          }
        ]
      },
    }
  },

  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)
      if (isSame) {
        return
      }
      this.editor.commands.setContent(value, false)
    },
  },

  computed: {
  popoverContent() {
    // 获取当前页面的 URL
    const currentUrl = window.location.href;
    // 返回生成的内容
    return `${currentUrl}`;
  },
  // isEmptyEditor() {
  //   // 判断编辑器是否为空
  //   return !this.editor || this.editor.getHTML() === '<p></p>'
  // },
},

  mounted() {
    const ydoc = new Y.Doc()

    // Store the Y document in the browser
    new IndexeddbPersistence(this.documentid, ydoc)
    
    const provider = new HocuspocusProvider({
      url: 'ws://23.94.102.135:8010',
      name: this.documentid,
      // name: this.room,
      document: ydoc,
    })

    // this.provider.on('status', event => {
    //   this.status = event.status
    // })
    
    this.editor = new Editor({
      // this.content = [this.defaultDoc],
      extensions: [
      // PlaceholderExtension.configure({
      //   placeholder: '请输入你的标题',
      // }),
        StarterKit.configure({
          history: false,
        }),
        Highlight,
        TaskList,
        TaskItem,
        Collaboration.configure({
          // document: provider.document,
          document: ydoc,
          field: 'title',
        }),
        // Register the collaboration cursor extension
        CollaborationCursor.configure({
          provider: provider,
          // user: {
          //   name: 'Cyndi Lauper',
          //   color: '#f783ac',
          // },
          user: this.currentUser,
        }),
        CharacterCount.configure({
          limit: 100,
        }),
      ],

      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML())

        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    })
    // this.editor.setEditable(true);
    // localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
  },

  created() {
    const name = getToken('username'); // 根据实际情况获取 token
    getLimit(this.documentid, name).then(res => {
      if (res.data.status === 'success') {
        this.editor.setEditable(true);
        this.editor.editable = true;
        setToken('editable',true)
      } else {
        this.editor.setEditable(false);
      }
    });
  },

  methods: {
    upload() {
      // 在这里编写上传的方法逻辑
      // 修改标题
      console.log(this.editor.getText());
      this.msg.doc_id = this.documentid;
      this.msg.doc_name = this.editor.getText();
      // this.msg.editable_by_guests = '';

      changeDocument(this.msg).then(res => {
                        console.log(res)
                        if (res.data.status === 'success') {
                            console.log("change title")
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            });
                        } else {      
                          console.log("fail change title")
                        }
                    }
            )
      
    },
    changelimit() {
      // 在这里编写上传的方法逻辑
      // 修改权限
      this.msg.doc_id = this.documentid;
      this.msg.doc_name = '';

      changeDocument(this.msg).then(res => {
                            console.log(this.msg)
                            console.log(res)
                            if (res.data.status === 'success') {
                                console.log("change limit")
                                getDcumentByID(this.documentid).then(res => {
                                  if (res.data.status === 'success') {
                                      console.log("get limit")
                                      console.log(res.data.data.editable_by_guests)
                                      if(res.data.data.editable_by_guests === true){
                                        this.$message({
                                                type: 'success',
                                                message: '修改游客权限为可编辑'
                                            });

                                      }else{
                                        this.$message({
                                                type: 'success',
                                                message: '修改游客权限为只读'
                                            });

                                      }

                        } else {      
                          console.log("fail get limit")
                        }
                    }
            )
                            

                        } else {      
                          console.log("fail change limit")
                        }
                    }
            )

      
      //先查询文档权限
      
      
      
    },
      setName() {
        const name = (window.prompt('Name') || '')
          .trim()
          .substring(0, 32)
  
        if (name) {
          return this.updateCurrentUser({
            name,
          })
        }
      },
  
      // updateCurrentUser(attributes) {
      //   this.currentUser = { ...this.currentUser, ...attributes }
      //   this.editor.chain().focus().updateUser(this.currentUser).run()
  
      //   localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      // },
  
      getRandomColor() {
        return getRandomElement([
          '#958DF1',
          '#F98181',
          '#FBBC88',
          '#FAF594',
          '#70CFF8',
          '#94FADB',
          '#B9F18D',
        ])
      },
  
      // getRandomName() {
      //   return getRandomElement([
      //     '张三', '李四', '吴浩宇', '梁坤', '王二', 'Joan Collins', 'Winona Ryder', 'Christina Applegate',  'Matthew Broderick',
      //   ])
      // },
    },
  
    beforeDestroy() {
      this.editor.destroy()
      this.provider.destroy()
    },
}

</script>


<style lang="scss">
.placeholder-text {
  color: #999;
  // font-style: italic;
  }
.editor-content{
  background-color: #FFF;
}
.editor1__container {
  display: flex;
  align-items: center; /* 垂直居中 */
}

.editor1__popover {
  margin-left: auto; /* 将 el-popover 推到右侧 */
}
.editor1 {
  background-color: #FFF;
  // border: 3px solid #444242;
  border-radius: 0.75rem;
  color: #0D0D0D;
  display: flex;
  // flex: 1; /* This sets the flex property to 1 */
  flex-direction: column;
  max-height: 26rem;
  // margin: 10px 10px; /* 设置上、左、右的间距 */
  // background-color: hsl(0, 0%, 96%); /* 设置背景色 */
  // background-color: #FFF;
  text-align: left;



  &__content1 {
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1.25rem 1rem;
    -webkit-overflow-scrolling: touch;

    font-size: 30px;
    font-weight: bold;

    position: relative; /* 使得内部元素可以定位 */
  }


  /* Some information about the status */
  &__status {
    align-items: center;
    border-radius: 5px;
    display: flex;

    &::before {
      background: rgba(#0D0D0D, 0.5);
      border-radius: 50%;
      content: ' ';
      display: inline-block;
      flex: 0 0 auto;
      height: 0.5rem;
      margin-right: 0.5rem;
      width: 0.5rem;
    }

    &--connecting::before {
      background: #616161;
    }

    &--connected::before {
      background: #B9F18D;
    }
  }

  &__name {
    button {
      background: none;
      border: none;
      border-radius: 0.4rem;
      color: #0D0D0D;
      font: inherit;
      font-size: 12px;
      font-weight: 600;
      padding: 0.25rem 0.5rem;

      &:hover {
        background-color: #0D0D0D;
        color: #FFF;
      }
    }
  }
}

/* Give a remote user a caret */
.collaboration-cursor__caret {
  border-left: 1px solid #0D0D0D;
  border-right: 1px solid #0D0D0D;
  margin-left: -1px;
  margin-right: -1px;
  pointer-events: none;
  position: relative;
  word-break: normal;
}

/* Render the username above the caret */
.collaboration-cursor__label {
  border-radius: 3px 3px 3px 0;
  color: #0D0D0D;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  left: -1px;
  line-height: normal;
  padding: 0.1rem 0.3rem;
  position: absolute;
  top: -1.4em;
  user-select: none;
  white-space: nowrap;
}

/* Basic editor styles */
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    border-radius: 0.5rem;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  mark {
    background-color: #FAF594;
  }

  img {
    height: auto;
    max-width: 100%;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    border-left: 2px solid rgba(#0D0D0D, 0.1);
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      align-items: center;
      display: flex;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }
}
</style>
