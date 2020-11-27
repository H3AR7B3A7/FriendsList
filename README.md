![Ruby version](https://img.shields.io/badge/RUBY-2.7.2-blue)

# Friends List
Revisitting Ruby on Rails after a long time by making a friendlist application with some help of freeCodeCamp.org. 

## Some CLI commands
We can make use from the CLI to generate a project or modules to make our life easyer. (Similar to what we can do in other frameworks like React, Angular, ...)

	rails new 
	rails s

## Application.html.erb
Here we keep the structure of our app seperate from the changing content represented by the **<%= yield %>**.

Everything that doesn't change from page to page in our application can be in here: 
- metadata
- styling
- other code blocks 
- ...

We can create other code blocks by creating a new file under views using the pattern:  
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

To create a schema from this scaffold we use this command:

	rails db:migrate

This will not only create a database, but also fully functional CRUD pages to create , update or view entries in *'views/friends'*. This includes even an .scss we deleted in this case because we want to add our own stylign with bootstrap.

