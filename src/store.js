import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		svgs: null,
		folder: null
	},
	mutations: {
		setSvgs(state,data) {
			state.svgs = data
		},
		setFolder(state,data) {
			state.folder = data
		},
	},
	actions: {
		updateSvgs: function(context, data) {
			this.commit('setSvgs', data)
		},
		updateFolder: function(context, data) {
			this.commit('setFolder', data)
		},
	}
})
