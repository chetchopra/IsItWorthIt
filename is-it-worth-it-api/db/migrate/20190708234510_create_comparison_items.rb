class CreateComparisonItems < ActiveRecord::Migration[5.2]
  def change
    create_table :comparison_items do |t|
      t.string :name
      t.float :cost
      t.string :description
      t.string :img_url

      t.timestamps
    end
  end
end
