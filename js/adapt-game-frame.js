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
    var visited = false;

    var GameIframe = ComponentView.extend({
        events: {
            'inview':'inview'
        },

        postRender: function() {
            var that = this;
            this.$('.gameIframe-iframe').ready(function() {
                that.setReadyStatus();
            });
        },

        gameComplete: function(e) {
          console.log(e.data)
          console.log(this.model)
          if (e.data === this.model.get('_id')) {
            this.setCompletionStatus();
          }
        },

        inview: function(event, visible) {
            if (visible && !visited) {
              visited = true;
              window.addEventListener('message', this.gameComplete.bind(this), false);
            }
        }

    });

    return Adapt.register('game-frame', {
      model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
      view: GameIframe
    });

});
