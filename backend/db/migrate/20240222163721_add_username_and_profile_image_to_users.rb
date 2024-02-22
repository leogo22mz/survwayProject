class AddUsernameAndProfileImageToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :username, :string
    add_column :users, :profile_image_url, :string
  end
end
