require "webpush"
Rails.application.routes.draw do
  mount ActionCable.server => "/cable"

  put "api/v1/lists/:id/getTicket", to: "api/v1/lists#getTicket"
  put "api/v1/lists/:id/increaseNumber", to: "api/v1/lists#increaseNumber"
  put "api/v1/lists/:id/decreaseNumber", to: "api/v1/lists#decreaseNumber"

  get "api/v1/current_user", to: "api/v1/users/current_user#index"
  get 'webpush/vapid_public_key', to: 'webpush#vapid_public_key'
  post '/notifications', to: 'notifications#create'
  post '/push', to: 'notifications#push'
  post '/send_notification', to: 'notifications#send_notification'
  post '/send_command_to_rails_console', to: 'console_commands#send_to_rails_console'
  resources :notifications do
    collection do
      get :send_test_notification
    end
  end
  devise_for :users, path: "", path_names: {
                       sign_in: "api/v1/login",
                       sign_out: "api/v1/login",
                       registration: "api/v1/signup",
                     },
                     controllers: {
                       sessions: "api/v1/users/sessions",
                       registrations: "api/v1/users/registrations",
                     }

  namespace :api do
    resources :surveys do
      delete 'questions/:question_id', to: 'surveys#destroy_question', on: :member
    end
    namespace :v1 do
      resources :lists
      namespace :users do
        resources :users, only: [:index]
      end
    end
  end
end
