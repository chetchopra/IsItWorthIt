class Item < ApplicationRecord
    belongs_to :user
    validates :name, presence: true
    validates :cost, presence: true
end
