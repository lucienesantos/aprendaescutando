class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.string :id_youtuber
      t.string :artiste

      t.timestamps null: false
    end
  end
end
