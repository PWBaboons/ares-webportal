import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    gameApi: service(),
    flashMessages: service(),

    sceneTypes: computed(function() {
        return this.get('model.sceneTypes').map(p => p.get('name'));
    }),

    scenePrivacyValues: computed(function() {
        return [ 'Open', 'Private' ];
    }),

    actions: {
        plotChanged(new_plot) {
            this.set('model.scene.plot', new_plot);
        },
        typeChanged(new_type) {
            this.set('model.scene.scene_type', new_type);
        },
        participantsChanged(new_participants) {
            this.set('model.scene.participants', new_participants);
        },
        creaturesChanged(new_creatures) {
          this.set('model.scene.creatures', new_creatures);
        },
        portalsChanged(new_portals) {
          this.set('model.scene.portals', new_portals);
        },
        privacyChanged(newPrivacy) {
            this.set('model.scene.privacy', newPrivacy)
        },
        relatedChanged(new_related) {
            this.set('model.scene.related_scenes', new_related)
        },
        save() {
            let api = this.gameApi;
            let tags = this.get('model.scene.tags') || [];
            if (!Array.isArray(tags)) {
                tags = tags.split(/[\s,]/);
            }

            api.requestOne('editScene', { id: this.get('model.scene.id'),
               title: this.get('model.scene.title'),
               icdate: this.get('model.scene.icdate'),
               scene_type: this.get('model.scene.scene_type'),
               location: this.get('model.scene.location'),
               portals: (this.get('model.scene.portals') || []).map(portal => portal.id),
               creatures: (this.get('model.scene.creatures') || []).map(creature => creature.id),
               summary: this.get('model.scene.summary'),
               privacy: this.get('model.scene.privacy'),
               plot_id: this.get('model.scene.plot.id'),
               participants: (this.get('model.scene.participants') || []).map(p => p.name),
               related_scenes: (this.get('model.scene.related_scenes') || []).map(s => s.id),
               tags: tags,
               content_warning: this.get('model.scene.content_warning'),
               limit: this.get('model.scene.limit'),
               log: this.get('model.scene.log')}, null)
            .then( (response) => {
                if (response.error) {
                    return;
                }

                this.transitionToRoute('scene', this.get('model.scene.id'));
                this.flashMessages.success('Scene updated!');
            });
        }
    }
});
