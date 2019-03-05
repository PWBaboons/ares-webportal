import Controller from '@ember/controller';

export default Controller.extend({
    spells: function() {
        let model = this.get('model.spell_list');
        let spells = {1: [], 2:[], 3: [], 4: [], 5:[], 6: [], 7: [], 8:[]};
        model.forEach(function(spell) {
            if (spell.school != 'Air') {
               return;
            }
            spells[spell.level].push(spell);
        });
        console.log(spells)
        return spells;
    }.property('model')
});
