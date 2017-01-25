class Public::UsersController < ApplicationController

  skip_before_filter :verify_authenticity_token, :only => [:login]

  def login
    begin
     #TO DO
    rescue
    
    end  

  end
end