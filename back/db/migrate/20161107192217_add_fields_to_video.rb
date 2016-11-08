class AddFieldsToVideo < ActiveRecord::Migration
  def change
        add_column :videos, :music, :string
        add_column :videos, :total_words, :integer
        add_column :videos, :subtitle_text, :text
  end
end
