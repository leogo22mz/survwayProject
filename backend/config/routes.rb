Rails.application.routes.draw do
  namespace :api do
    resources :surveys
    post '/signup', to: 'users#create'
    post '/login', to: 'authentication#create'
  end
end