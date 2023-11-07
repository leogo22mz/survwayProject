Rails.application.routes.draw do


  namespace :api do
    get "surveys" => "surveys#index"
  end
end
