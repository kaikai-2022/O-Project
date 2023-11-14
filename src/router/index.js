import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home.vue'
import control from '../components/control-team.vue'
import MainView from '../views/MainView.vue'
import create from '../components/create-team.vue'
import Teamintroduce from '../components/team-introduce.vue'
import me from '../components/me-introduce.vue'

import Login from '../views/Login.vue'
import Regist from '../views/Regist.vue'
import Message from "../views/Message.vue"
import Team from '../views/team(use-copy)'

import WorkSpace from '../views/WorkSpace.vue'
import ProjectList from '../views/ProjectList.vue'
import ProjectListcp from '../views/ProjectList-copy.vue'
import TeamList from '../views/TeamList.vue'
import ProjectPage from '../components/ProjectPage.vue'
import Project from '../views/Project.vue'
import Design from '../views/Design.vue'
import Setting from '../views/ProjectSetting.vue'
import Document from '../views/Document.vue'
import DocumentList from '../views/DocumentList.vue'
import Designlist from '../views/Designlist.vue'
import ProjectListBin from '../views/RecycleBin.vue'
import TiptapEditor from '../views/Editor.vue'
import DesignlistBin from '../views/DesignlistBin.vue'
import Demo from '../views/Demo.vue'
import PreviewPage from '../views/PreviewPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    redirect: '/login',
    children: [
      { path: '/main', component: MainView },
      { path: '/message', component: Message },
      { path: '/workspace', component: WorkSpace },
      { path: '/projectlist', component: ProjectList },
      { path: '/teamlist', component: TeamList },
      { path: '/teamspace', component: Team },
      { path: '/control-team', component: control },
      { path: '/team-introduce', component: Teamintroduce },
      { path: '/me-introduce', component: me },
      { path: '/ProjectList-copy', component: ProjectListcp },
      { path: '/ProjectList-Bin', component: ProjectListBin },
      { path: '/create', component: create },
      {
        path: '/edit/:documentid', component: TiptapEditor, props: true
      },

      {
        path: '/project', component: ProjectPage,
        children: [
          { path: '/project', component: Project },
          { path: '/project/setting', component: Setting },
          { path: '/project/document', component: Document },
          { path: '/project/documentlist', component: DocumentList },
          
          { path: '/project/designlist', component: Designlist },
          { path: '/project/designlistbin', component: DesignlistBin },
        ]
      },
      // {
      //   path: '/projectlist/recyclebin', component: RecycleBin
      // },
      { path: '/project/design', component: Design },
      {
        path: '/demo', component: Demo
      },
    ]
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/regist',
    component: Regist,
  },
  {
    path: '/previewpage/:projectid',
    component: PreviewPage,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
