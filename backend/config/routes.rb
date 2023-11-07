Rails.application.routes.draw do


  namespace :api do
    resources :surveys
  end
end
