class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :players do |t|
      t.integer :team_id
      t.string :name
      t.string :position

      t.timestamps
    end
    add_index :players, :team_id
  end
end
