class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create, :update]

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :profile_image_url])
    devise_parameter_sanitizer.permit(:account_update, keys: [:username, :profile_image_url])
  end
end
