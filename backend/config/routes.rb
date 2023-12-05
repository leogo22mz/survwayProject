Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  }, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  
  # Rutas para el namespace API
  namespace :api do
    resources :surveys
    # Las rutas de login y signup ya están manejadas por Devise, por lo que no necesitas definirlas aquí nuevamente
    # Si necesitas rutas adicionales específicas para la API, puedes añadirlas aquí
  end
end
