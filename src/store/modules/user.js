import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userName: '',
    imageUrl: '',
    role: '',
    addressList: [],
    createTime: '',
    phone: 0,
    nickName: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, userName) => {
    state.userName = userName
  },
  SET_NICKNAME: (state, nickName) => {
    state.nickName = nickName
  },
  SET_AVATAR: (state, imageUrl) => {
    state.imageUrl = imageUrl
  },
  SET_ADDRESSLIST(state, addressList) {
    state.addressList = addressList
  },
  SET_ROLE(state, role) {
    state.role = role
  },
  SET_CREATETIME(state, createTime) {
    state.createTime = createTime
  },
  SET_PHONE(state, phone) {
    state.phone = phone
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), passWord: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          return reject('验证失败，请稍后再试')
        }
        if (data.role === '商家' || data.role === '仓库') {
          const { userName, imageUrl, addressList, role, createTime, nickName, phone } = data
          commit('SET_NAME', userName)
          commit('SET_AVATAR', imageUrl)
          commit('SET_ADDRESSLIST', addressList)
          commit('SET_ROLE', role)
          commit('SET_CREATETIME', createTime)
          commit('SET_NICKNAME', nickName)
          commit('SET_PHONE', phone)
          resolve(data)
        } else {
          removeToken() // must remove  token  first
          commit('RESET_STATE')
          return reject('无权限！')
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
      // }).catch(error => {
      // reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

