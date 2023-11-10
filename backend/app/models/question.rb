class Question < ApplicationRecord
    belongs_to :survey
    has_many :choices, dependent: :destroy
    accepts_nested_attributes_for :choices
end
