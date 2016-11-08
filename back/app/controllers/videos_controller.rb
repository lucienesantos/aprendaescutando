class VideosController < ApplicationController


  def index
    @videos = Video.all
    render json: @videos 
    
  end  

  def show
    @video = Video.find_by_id(params_video[:id])
    render json: @video
  end 


  private 

    def params_video
      params.permit(
        :id, 
        :id_youtuber, 
        :artiste, 
        :music, 
        :total_words, 
        :subtitle_text)
    end  
end