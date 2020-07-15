/*
* adapt-game-frame
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Kristin Anthony (kristin@knanthony.com)
*/
define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

    var GameIframe = ComponentView.extend({
        events: {
            'inview':'inview'
        },

        postRender: function() {
            var that = this;
            this.$('.gameIframe-iframe').ready(function() {
                that.setReadyStatus();
                window.addEventListener('message', that.gameComplete.bind(that), false);
            });
        },

        gameComplete: function(e) {
          if (e.data === this.model.get('_id')) {
            this.setCompletionStatus();
          }
        }

    });

    return Adapt.register('game-frame', {
      model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
      view: GameIframe
    });

});
