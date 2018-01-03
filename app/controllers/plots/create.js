import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    flashMessages: service(),
    ajax: service(),
    
    title: '',
    summary: '',
    description: '',
    
    resetForm: function() {
        this.set('title', '');
        this.set('summary', '');
        this.set('description', '');
    },
    
    actions: {
        save: function() {
            let aj = this.get('ajax');
            aj.queryOne('createPlot', { 
               title: this.get('title'), 
               summary: this.get('summary'),
               description: this.get('description')})
            .then( (response) => {
                if (response.error) {
                    return;
                }
                this.transitionToRoute('plots.plot',                          
                          response.id);
                this.get('flashMessages').success('Plot created!');
            })
            .catch((response) => {
                this.get('flashMessages').danger(response.message);
            });
        }
    }
});