// Backbone Model
// var blog = new Blog();
// blog.toJSON();
var Blog = Backbone.Model.extend({
	defaults: {
		author: '',
		title: '',
		url: '',
	}
});

// Backbone Collection
var Blogs = Backbone.Collection.extend({});

// Instantiate two Blogs
var blog1 = new Blog({
	author: 'Michael',
	title: 'Michael\'s Blog',
	url: 'http:/michaelsblog.com'
});

var blog2 = new Blog({
	author: 'John',
	title: 'John\'s Blog',
	url: 'http:/johnsblog.com'
});

var blogs = new Blogs([blog1, blog2]);

// Backbone Views for one blog
var BlogView = Backbone.View.extend({
	model: new Blog(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.blogs-list-template').html());
	},
	render: function() {
		this.$el.html(this.template({
			model: this.model.toJSON()
		}));
	}
});

// Backbone Views for all blogs
var BlogsView = Backbone.View.extend({
	model: blogs,
	el: $('.blogs-list'),
	initialize: function() {
		this.model.on('add', this.render(), this);
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(blog) {
			self.$el.append(new BlogView({model: blog}).render().$el);
		});
	}
});