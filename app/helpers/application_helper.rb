module ApplicationHelper  

  def is_active(action)       
    params[:action] == action ? "active" : nil        
  end

end
