class AddPlaysToVideo < ActiveRecord::Migration
  def change
    add_column :videos, :plays, :integer
  end
end
