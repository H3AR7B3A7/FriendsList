Rails.application.routes.draw do
  devise_for :users
  resources :friends
  root 'home#home'
  get 'home/about'
end
