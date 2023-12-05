class Users::SessionsController < Devise::SessionsController
  def create
    super do |resource|
      if resource.persisted?
        token = request.env['warden-jwt_auth.token']
        render json: { user: resource, token: token }, status: :created and return
      end
    end
  end
end
