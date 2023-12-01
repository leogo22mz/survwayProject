Rails.application.routes.draw do
  devise_for :users
  namespace :api do
    resources :surveys
    post '/signup', to: 'users#create'
    post '/login', to: 'authentication#create'
  end
end