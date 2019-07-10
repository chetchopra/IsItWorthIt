class UsersController < ApplicationController
    # Runs get_user before the show and update method
    before_action :get_user, only: [:update]

    def show
        user = User.find_by(name: params[:name])
        render json: user.to_json(:include => :items)
    end

    def create 
        user = User.create(get_user_params)
        # Renders json for the newly created user
        render json: user
    end

    def update 
        @user.update(get_user_params)
        # Renders json for the updated user
        render json: @user
    end

    private 
    # Strong params for user
    def get_user_params
        return params.require(:user).permit(:name, :email, :bio, :img_url)
    end

    # Finds and returns a specific user
    def get_user
        @user = User.find_by_id(params[:id])
        if @user 
            return @user
        else 
            render json: {"message": {"type": "error", "content": "The user could not be found!"}}
        end
    end

end
