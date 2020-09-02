import Vue from 'vue'
import Vuex from 'vuex'
import bcrypt from 'bcryptjs'

Vue.use(Vuex)

const Image = {
  namespace: true,
  state: {
    imageData: ''
  },
  mutations: {
    updateImageData (state, data) {
      state.imageData = data
    }
  }
}

const Header = {
  namespace: true,
  state: {
    title: 'productManagement'
  },
  mutations: {
    updateHeaderTitle (state, data) {
      state.title = data
    }
  }
}

const Search = {
  namespace: true,
  state: {
    search: ''
  },
  mutations: {
    updateSearchValue (state, data) {
      state.search = data
    },
    setValueForSearch (state, data) {
      state.search = data
    }
  }
}

const Login = {
  namespace: true,
  state: {
    isLogin: bcrypt.compareSync('isLogin', (localStorage.getItem('login') ? localStorage.getItem('login') : '')),
    user: localStorage.getItem('user') ? localStorage.getItem('user') : ''
  },
  mutations: {
    updateLogin (state, data) {
      state.isLogin = data
    },
    updateUser (state, data) {
      state.user = data
    }
  }
}

const Account = {
  namespace: true,
  state: {
    type: {
      'SAVING': 'Tiết kiệm',
      'PAYMENT': 'Thanh toán'
    }
  }
}

export const store = new Vuex.Store({
  modules: {
    'image': Image,
    'header': Header,
    'login': Login,
    'account': Account,
    'search': Search
  }
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  // modules: {
  // }
})
