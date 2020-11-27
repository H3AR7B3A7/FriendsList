Rails.application.routes.draw do
  resources :friends
  root 'home#home'
  get 'home/about'
end
