import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    LoggedIn: false,
    IsManager: false,
    AddingNewManager: false,
    ManagerHasChanged: true,
    AddingNewModel: false,
    ModelHasChanged: true,
    AddingNewJob: false,
    JobHasChanged: true,
    AddModelToJob: false,
  },
  mutations: {
    login(state) {
      state.LoggedIn = true;
    },
    logout(state) {
      state.LoggedIn = false;
    },
    ToggleAddManager(state) {
      if (state.AddingNewManager) {
        state.AddingNewManager = false;
      } else {
        state.AddingNewManager = true;
      }
    },
    ToggleAddModel(state) {
      if (state.AddingNewModel) {
        state.AddingNewModel = false;
      } else {
        state.AddingNewModel = true;
      }
    },
    ToggleAddJob(state) {
      if (state.AddingNewJob) {
        state.AddingNewJob = false;
      } else {
        state.AddingNewJob = true;
      }
    },
    ToggleAddModelToJob(state) {
      if (state.AddModelToJob) {
        state.AddModelToJob = false;
      } else {
        state.AddModelToJob = true;
      }
    },

    ManagerHasChangedTrue(state) {
      state.ManagerHasChanged = true;
    },
    ManagerHasChangedFalse(state) {
      state.ManagerHasChanged = false;
    },
    ModelHasChangedTrue(state) {
      state.ModelHasChanged = true;
    },
    ModelHasChangedFalse(state) {
      state.ModelHasChanged = false;
    },
    
    JobHasChangedTrue(state) {
      state.JobHasChanged = true;
    },
    JobHasChangedFalse(state) {
      state.JobHasChanged = false;
    },
  }
})

export default store;