class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :name
      t.float :cost
      t.string :img_url
      t.string :purchase_link
      t.string :description
      t.integer :user_id

      t.timestamps
    end
  end
end
