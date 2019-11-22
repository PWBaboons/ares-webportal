import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  gameApi: service(),
  filter: 'All',
  page: 1,

  resetOnExit: function() {
    this.set('filter', 'All');
    this.set('page', 1);
  },

  updateScenesList: function() {
    let api = this.gameApi;
    api.requestOne('scenes', {
       filter: this.filter,
       page: this.page,
       char_id: this.get('char.id') })
    .then( (response) => {
        if (response.error) {
          return;
        }
        this.set('scenes', response);
    });
  },

  updateCompsList: function() {
    let api = this.gameApi;
    api.requestOne('comps', {
       filter: this.filter,
       page: this.page,
       char_id: this.get('char.id') })
    .then( (response) => {
        if (response.error) {
          return;
        }
        this.set('comps', response);
    });
  },

  actions: {
    filterChanged(newFilter) {
      this.set('filter', newFilter);
      this.set('page', 1);
      this.updateScenesList();
    },
    CompfilterChanged(newFilter) {
      this.set('filter', newFilter);
      this.set('page', 1);
      this.updateCompsList();
    },
    goToPage(newPage) {
      this.set('page', newPage);
      this.updateScenesList();
    },
    goToCompPage(newPage) {
      this.set('page', newPage);
      this.updateCompsList();
    }
  }
});
