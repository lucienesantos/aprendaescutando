class VideosController < ApplicationController
  skip_before_filter :verify_authenticity_token


  def index
    @videos = Video.all
    render json: @videos 
    
  end  

  def show
    @video = Video.find_by_id(params_video[:id])
    render json: @video
  end 

  def update
    @video = Video.find_by_id(params_video[:id])
    puts params_video[:plays]
    if @video.update(params_video)
      render json: {message: "Sucesso"}
    else
      render json: {message: "Erro"}, status: 500
    end  
  end
    
  private 

    def params_video
      params.permit(
        :id, 
        :id_youtuber, 
        :artiste, 
        :music, 
        :total_words, 
        :subtitle_text,
        :plays)
    end  
end