GoodShows.Views.CommentEventItem = Backbone.View.extend({
  template: JST['home/feed_comment_item'],
  render: function () {
    var content = this.template({
      activity: this.model,
      comment: this.model.comment(),
      review: this.model.comment().review(),
      reviewAuthor: this.model.comment().review().user(),
      show: this.model.comment().review().show(),
      user: this.model.user()
    });
  
    this.$el.html(content);

    this.$(".show-rating-stars").rating({
      showCaption: false,
      readonly: true,
      showClear: false,
      ratingClass: ' readonly'
    });
    this.addCommentsIndex();
    this.addShelvesButton();
  
    return this;
  },
  className: 'row feed-item',

  initialize: function (options) {
    if (options) {
      this.shelves = options.shelves;
    }
  },

  addCommentsIndex: function () {
    if(!this.commentsView) {
      this.commentsView = new GoodShows.Views.CommentsIndex({
        collection: this.model.comment().review().comments(),
        review: this.model.comment().review()
      });

    }
    this.$('.review-body').after(this.commentsView.render().$el);
  },

  addShelvesButton: function () {
    if(!this.shelvesButton) {
      this.shelvesButton = new GoodShows.Views.ShowShelfButton({
        collection: this.shelves,
        show: this.model.comment().review().show()
      });

    }
    this.$('.add-to-shelf').html(this.shelvesButton.render().$el);
  },
});