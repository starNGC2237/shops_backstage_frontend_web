import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 主页面重定向至/dashboard
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表盘', icon: 'dashboard' }
    }]
  },
  {
    path: '/usersManage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'usersManage',
        component: () => import('@/views/usersManage'),
        meta: { title: '用户管理', icon: 'el-icon-user-solid' }
      }
    ]
  },
  {
    path: '/backstageUsersManage',
    component: Layout,
    name: 'backstageUsersManage',
    meta: { title: '后台用户管理', icon: 'el-icon-s-shop' },
    children: [
      {
        path: 'index',
        name: 'backstageUsersManageIndex',
        component: () => import('@/views/backstageUsersManage'),
        meta: { title: '后台用户管理', icon: 'table' }
      },
      {
        path: 'info',
        name: 'backstageUserInfo',
        component: () => import('@/views/backstageUsersManage/info'),
        meta: { title: '后台用户信息', icon: 'el-icon-s-cooperation' }
      }
    ]
  },
  {
    path: '/push',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'pushManage',
        component: () => import('@/views/pushManage'),
        meta: { title: '推送管理', icon: 'el-icon-s-promotion' }
      }
    ]
  },
  {
    path: '/goodManage',
    component: Layout,
    redirect: '/goodManage/goods',
    name: 'goodManage',
    meta: { title: '商品管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'goods',
        name: 'goods',
        component: () => import('@/views/goodManage/goodManage'),
        meta: { title: '商品管理', icon: 'table' }
      },
      {
        path: 'goodTable',
        name: 'goodTable',
        component: () => import('@/views/goodManage/goodInfo'),
        meta: { title: '商品信息', icon: 'table' }
      },
      {
        path: 'goodDistribution',
        name: 'goodDistribution',
        component: () => import('@/views/Distribution/goodDistribution'),
        meta: { title: '商品分布', icon: 'table' }
      },
      {
        path: 'goodAddDistribution',
        name: 'goodAddDistribution',
        component: () => import('@/views/Distribution/goodAddDistribution'),
        meta: { title: '添加商品分布', icon: 'table' }
      },
      {
        path: 'categoryTree',
        name: 'categoryTree',
        component: () => import('@/views/categorys/categoryTree/index'),
        meta: { title: '商品类别管理', icon: 'tree' }
      },
      {
        path: 'categoryRecommends',
        name: 'categoryRecommends',
        component: () => import('@/views/categorys/categoryRecommends/index'),
        meta: { title: '商品类别推荐管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/feedback',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'feedBackManage',
        component: () => import('@/views/feedBackManage'),
        meta: { title: '工单管理', icon: 'el-icon-s-comment' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'orderManage',
        component: () => import('@/views/orderManage'),
        meta: { title: '订单管理', icon: 'el-icon-s-claim' }
      }
    ]
  },
  /*
  * {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },
  * */

  // 错误跳转至404 页面
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
