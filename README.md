![Ruby version](https://img.shields.io/badge/RUBY-2.7.2-blue)

# Ruby On Rails: Friends List
Revisitting Ruby on Rails after a long time by making a friendlist application with some help of freeCodeCamp.org.  
  
[Official Guides](https://guides.rubyonrails.org/)

## Some CLI commands
We can make use from the CLI to generate a project or modules to make our life easyer. (Similar to what we can do in other frameworks like React, Angular, ...)

	rails new 
	rails s

## Application.html.erb
Here we keep the structure of our app seperate from the changing content represented by the **<%= yield %>**.

Everything that doesn't change from page to page in our application can be in here: 
- metadata
- styling
- partials 
- ...

## Partial
We can create other html blocks, or *partials*, by creating a new file under views using the pattern:  
*_<blockName>.html.erb*  
We can insert this block like this:

	<%= render '<pathToBlock>/<blockName>' %>

Notice the leading underscore is left out of the block we insert. 

## New pages
As usual a new page needs:
- **View**: <viewName>.html.erb in views folder
- **Controller**: <controllerName>_controller.rb in controllers folder
- **Routing**: routes.rb in config folder

We can do this manually, but this CLI command will do this for us: 

	rails controller home index 

## Application helper
Instead of using javascript to check which page is active we can move this logic to rails using **is_active** in *application_helper.rb*

	def is_active(action)       
    	params[:action] == action ? "active" : nil        
	end

In the list items in our header this logic can be applied like this:

	<li class="nav-item <%=is_active('index')%>">
    	<%= link_to 'Home', root_path, class:"nav-link" %>
	</li>


## Scaffold
We use the following CLI command to create a scaffold in *'db/migrate'*:

	rails g scaffold friends first_name:string last_name:string email:string phone:string twitter:string

To create the schema from this scaffold we use this command:

	rails db:migrate

This will not only create a database, but also fully functional CRUD pages to create , update or view entries in *'views/friends'*. This includes even an .scss we deleted in this case because we want to add our own stylign with bootstrap.

## Flash messages
Whenever something goes wrong with CRUD transactions rails will generate messages. To display these messages it needs some placeholders:

	<%= notice %>
    <%= alert %>

We can put these anywhere we might need them, so creating a partial we can render anywhere is a good practice.

## Devise
To add the gem go to [Ruby Gems](https://rubygems.org/) and look for devise. You can easily copy the gemfile code with 'copy to clipboard' and pasting it in the project Gemfile.  
In the console we use the following command to have the gem installed:

	bundle install

We can find the devise [README](https://github.com/heartcombo/devise) for more information on how to use it.

We will find that we also need to enter the following command in the console:

	rails generate devise:install

Notice that the console will output more instructions:
- To configure an Action Mailer, to send people a password when they lost it and similar funtionality.  

In *'config/evironments/development.rb'* and *'config/evironments/production.rb'*:

	config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }

- Make sure we have a root page
- Make sure we have flash messages like 'notice' and 'alert'.
- Create devise views.

To create Devise views enter the following in the console:

	rails g devise:views

Devise will also need a *'scaffold'* (or database model) for users, which we can generate with:

	rails generate devise user

To create the schema from this scaffold we use the same command as before:

	rails db:migrate

We can use the following handle to only display certain html code when the user is logged in by using *'if'* statements:

	user_signed_in?

## Associations
[Official Guide: Associations](https://guides.rubyonrails.org/association_basics.html)
  
In the *models* folder we make these associations:
- **friend.rb**: belongs_to :user
- **user.rb**: has_many :friends

We also want to add a user id to our friends table so our schema keeps track of who the 'friends' belong to. For this we enter the following in our console:

	rails g migration add_user_id_to_friends user_id:integer:index

And after a migration we use the same command as before again:

	rails db:migrate

We also need to add *:user_id* to the list of trusted parameters in *friends_controller.rb* and add a hidden field to *_form.html.erb*:

	<div class="field">
		<%= form.number_field :user_id, id: :friend_user_id , class:"form-control", value:current_user.id, type: :hidden %>
	</div>

We can prevent usage of the api by adding the following line to the top of *friends_controller.rb*:

	before_action :authenticate_user!

Likewise we want to prevent users from editing friend records of other users:

	before_action :correct_user, only: [:edit, :update, :destroy]

We define *'correct user'* like this:

	def correct_user
	    @friend = current_user.friends.find_by(id: params[:id])
	    redirect_to friends_path, notice: "Not authorized to edit this entry" if @friend.nil?
	end

We want to update the *new* and *create* methods too:

	def new
	  @friend = current_user.friends.build
	end

	def create
	  @friend = current_user.friends.build(friend_params)
	  respond_to do |format|
	    if @friend.save
	      format.html { redirect_to @friend, notice: 'Friend was successfully created.' }
	      format.json { render :show, status: :created, location: @friend }
	    else
	      format.html { render :new }
	      format.json { render json: @friend.errors, status: :unprocessable_entity }
	    end
	  end
	end

And finally we need to update the querry to only show friends with the right user id if we don't want other people to see the friends from other users.

	def index
    	@friends = Friend.where(:user_id => current_user.id)
	end

