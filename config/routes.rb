Rails.application.routes.draw do
  root 'home#index'
  get 'home/about'
end
