class Question < ApplicationRecord
    belongs_to :survey
    has_many :choices, dependent: :destroy # Note que 'choice' ahora es 'choices'
end
