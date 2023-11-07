class Survey < ApplicationRecord
    has_many :question, dependent: :destroy
end
