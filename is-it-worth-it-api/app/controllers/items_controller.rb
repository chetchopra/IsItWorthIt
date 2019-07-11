class ItemsController < ApplicationController
    # Runs get_item before the show and update method
    before_action :get_item, only: [:show, :update, :destroy]

    def index
        items = Item.all
        render json: items
    end

    def show
        render json: @item
    end

    def create 
        # byebug
        newItem = Item.create(get_item_params)
        # Renders json for the newly created item
        render json: newItem
    end

    def update
        @item.update(get_item_params)
        # Renders json for the updated item
        render json: @item
    end

    def destroy
        @item.destroy
        render json: {"message": {"type": "success", "content": "The item was removed successfully!"}}
    end

    private
    # Strong params for items 
    def get_item_params
        return params.require(:item).permit(:name, :cost, :user_id, :img_url, :purchase_link, :description)
    end

    # Finds and returns a specific item
    def get_item
        @item = Item.find_by_id(params[:id])
        if @item
            return @item
        else 
            render json: {"message": {"type": "error", "content": "The item could not be found!"}}
        end
    end

end
