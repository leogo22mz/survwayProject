class CreateSurveys < ActiveRecord::Migration[7.1]
  def change
    create_table :surveys do |t|
      t.string :title
      t.string :description
      t.integer :created_by

      t.timestamps
    end
  end
end
